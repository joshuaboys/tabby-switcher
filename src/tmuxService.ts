import { Injectable } from '@angular/core'
import { execSync } from 'child_process'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NotificationsService, PromptModalComponent, SelectorOption, SelectorService } from 'tabby-core'

export interface TmuxSession {
    name: string
    windows: number
    attached: boolean
}

export interface TmuxWindow {
    session: string
    index: number
    name: string
    active: boolean
    panes: number
}

export interface TmuxPane {
    session: string
    windowIndex: number
    windowName: string
    paneIndex: number
    command: string
    active: boolean
}

export type TmuxTarget = {
    type: 'session'
    session: string
} | {
    type: 'window'
    session: string
    windowIndex: number
} | {
    type: 'pane'
    session: string
    windowIndex: number
    paneIndex: number
}

@Injectable({ providedIn: 'root' })
export class TmuxService {
    constructor (
        private selector: SelectorService,
        private ngbModal: NgbModal,
        private notifications: NotificationsService,
    ) {}

    /** Check if tmux is available and a server is running. */
    isAvailable (): boolean {
        try {
            execSync('tmux list-sessions', { stdio: 'pipe' })
            return true
        } catch {
            return false
        }
    }

    private exec (cmd: string): string {
        try {
            return execSync(cmd, { stdio: 'pipe', encoding: 'utf8' }).trim()
        } catch {
            return ''
        }
    }

    listSessions (): TmuxSession[] {
        const output = this.exec('tmux list-sessions -F "#{session_name}\t#{session_windows}\t#{session_attached}"')
        if (!output) {
            return []
        }
        return output.split('\n').map(line => {
            const [name, windows, attached] = line.split('\t')
            return { name, windows: parseInt(windows, 10), attached: attached === '1' }
        })
    }

    listWindows (): TmuxWindow[] {
        const output = this.exec('tmux list-windows -a -F "#{session_name}\t#{window_index}\t#{window_name}\t#{window_active}\t#{window_panes}"')
        if (!output) {
            return []
        }
        return output.split('\n').map(line => {
            const [session, index, name, active, panes] = line.split('\t')
            return {
                session,
                index: parseInt(index, 10),
                name,
                active: active === '1',
                panes: parseInt(panes, 10),
            }
        })
    }

    listPanes (): TmuxPane[] {
        const output = this.exec('tmux list-panes -a -F "#{session_name}\t#{window_index}\t#{window_name}\t#{pane_index}\t#{pane_current_command}\t#{pane_active}"')
        if (!output) {
            return []
        }
        return output.split('\n').map(line => {
            const [session, windowIndex, windowName, paneIndex, command, active] = line.split('\t')
            return {
                session,
                windowIndex: parseInt(windowIndex, 10),
                windowName,
                paneIndex: parseInt(paneIndex, 10),
                command,
                active: active === '1',
            }
        })
    }

    private buildTarget (pane: TmuxPane): TmuxTarget {
        return {
            type: 'pane',
            session: pane.session,
            windowIndex: pane.windowIndex,
            paneIndex: pane.paneIndex,
        }
    }

    private targetString (target: TmuxTarget): string {
        switch (target.type) {
            case 'session':
                return target.session
            case 'window':
                return `${target.session}:${target.windowIndex}`
            case 'pane':
                return `${target.session}:${target.windowIndex}.${target.paneIndex}`
        }
    }

    private buildPaneOptions (icon?: string): SelectorOption<TmuxTarget>[] {
        const panes = this.listPanes()
        return panes.map(pane => {
            const target = this.buildTarget(pane)
            const activeMarker = pane.active ? ' *' : ''
            return {
                name: `${pane.windowName}:${pane.paneIndex} — ${pane.command}${activeMarker}`,
                description: `${pane.session} → window ${pane.windowIndex}`,
                group: pane.session,
                icon,
                result: target,
            }
        })
    }

    /** Show tmux pane selector and switch to the chosen target. */
    async showSwitch (): Promise<void> {
        if (!this.isAvailable()) {
            this.notifications.error('tmux is not running')
            return
        }

        const options = this.buildPaneOptions()
        if (options.length === 0) {
            return
        }

        try {
            const target = await this.selector.show<TmuxTarget>('Switch to tmux pane', options)
            if (target) {
                const t = this.targetString(target)
                if (target.type === 'pane') {
                    this.exec(`tmux select-window -t "${target.session}:${target.windowIndex}" && tmux select-pane -t "${t}"`)
                } else if (target.type === 'window') {
                    this.exec(`tmux select-window -t "${t}"`)
                } else {
                    this.exec(`tmux switch-client -t "${t}"`)
                }
            }
        } catch {
            // User dismissed
        }
    }

    /** Show tmux window selector and rename the chosen window or session. */
    async showRename (): Promise<void> {
        if (!this.isAvailable()) {
            this.notifications.error('tmux is not running')
            return
        }

        // Show sessions and windows as rename targets
        const sessions = this.listSessions()
        const windows = this.listWindows()

        const options: SelectorOption<TmuxTarget>[] = [
            ...sessions.map(s => ({
                name: s.name,
                description: `Session — ${s.windows} window${s.windows !== 1 ? 's' : ''}`,
                group: 'Sessions',
                icon: 'fas fa-pen',
                result: { type: 'session' as const, session: s.name },
            })),
            ...windows.map(w => ({
                name: `${w.index}: ${w.name}`,
                description: w.session,
                group: 'Windows',
                icon: 'fas fa-pen',
                result: { type: 'window' as const, session: w.session, windowIndex: w.index },
            })),
        ]

        if (options.length === 0) {
            return
        }

        try {
            const target = await this.selector.show<TmuxTarget>('Rename tmux target', options)
            if (!target) {
                return
            }

            const currentName = target.type === 'session'
                ? target.session
                : windows.find(w => w.session === target.session && w.index === (target as any).windowIndex)?.name ?? ''

            const modal = this.ngbModal.open(PromptModalComponent)
            modal.componentInstance.value = currentName
            modal.componentInstance.showRememberCheckbox = false

            const result = await modal.result
            if (result?.value != null) {
                const newName = result.value.trim()
                if (newName.length > 0) {
                    if (target.type === 'session') {
                        this.exec(`tmux rename-session -t "${target.session}" "${newName}"`)
                    } else {
                        this.exec(`tmux rename-window -t "${this.targetString(target)}" "${newName}"`)
                    }
                    this.notifications.info(`Renamed to "${newName}"`)
                }
            }
        } catch {
            // User dismissed
        }
    }

    /** Show tmux selector and kill the chosen session, window, or pane. */
    async showKill (): Promise<void> {
        if (!this.isAvailable()) {
            this.notifications.error('tmux is not running')
            return
        }

        const sessions = this.listSessions()
        const panes = this.listPanes()

        const options: SelectorOption<TmuxTarget>[] = [
            ...sessions.map(s => ({
                name: s.name,
                description: `Session — ${s.windows} window${s.windows !== 1 ? 's' : ''}`,
                group: 'Sessions',
                icon: 'fas fa-times',
                result: { type: 'session' as const, session: s.name },
            })),
            ...panes.map(pane => ({
                name: `${pane.windowName}:${pane.paneIndex} — ${pane.command}`,
                description: `${pane.session} → window ${pane.windowIndex}`,
                group: `${pane.session} windows/panes`,
                icon: 'fas fa-times',
                result: this.buildTarget(pane),
            })),
        ]

        if (options.length === 0) {
            return
        }

        try {
            const target = await this.selector.show<TmuxTarget>('Kill tmux target', options)
            if (target) {
                const t = this.targetString(target)
                switch (target.type) {
                    case 'session':
                        this.exec(`tmux kill-session -t "${t}"`)
                        this.notifications.info(`Killed session "${target.session}"`)
                        break
                    case 'window':
                        this.exec(`tmux kill-window -t "${t}"`)
                        this.notifications.info('Window killed')
                        break
                    case 'pane':
                        this.exec(`tmux kill-pane -t "${t}"`)
                        this.notifications.info('Pane killed')
                        break
                }
            }
        } catch {
            // User dismissed
        }
    }

    /** Prompt for a name and create a new tmux session. */
    async showNewSession (): Promise<void> {
        try {
            const modal = this.ngbModal.open(PromptModalComponent)
            modal.componentInstance.value = ''
            modal.componentInstance.showRememberCheckbox = false

            const result = await modal.result
            if (result?.value != null) {
                const name = result.value.trim()
                if (name.length > 0) {
                    this.exec(`tmux new-session -d -s "${name}"`)
                    this.notifications.info(`Session "${name}" created`)
                } else {
                    this.exec('tmux new-session -d')
                    this.notifications.info('New session created')
                }
            }
        } catch {
            // User dismissed
        }
    }
}
