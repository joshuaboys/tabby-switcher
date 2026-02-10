import { Injectable } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AppService, NotificationsService, PromptModalComponent, SelectorOption, SelectorService, SplitTabComponent } from 'tabby-core'

export interface TabEntry {
    tab: any
    title: string
    index: number
    color?: string
}

@Injectable({ providedIn: 'root' })
export class SwitcherService {
    constructor (
        private app: AppService,
        private selector: SelectorService,
        private ngbModal: NgbModal,
        private notifications: NotificationsService,
    ) {}

    /** Collect every visible tab, including children inside split panes. */
    collectTabs (): TabEntry[] {
        const entries: TabEntry[] = []
        for (let i = 0; i < this.app.tabs.length; i++) {
            const tab = this.app.tabs[i]
            if (tab instanceof SplitTabComponent) {
                const children = tab.getAllTabs()
                for (const child of children) {
                    entries.push({
                        tab: child,
                        title: child.customTitle || child.title,
                        index: i + 1,
                        color: child.color ?? undefined,
                    })
                }
                if (children.length === 0) {
                    entries.push({
                        tab,
                        title: tab.customTitle || tab.title,
                        index: i + 1,
                        color: tab.color ?? undefined,
                    })
                }
            } else {
                entries.push({
                    tab,
                    title: tab.customTitle || tab.title,
                    index: i + 1,
                    color: tab.color ?? undefined,
                })
            }
        }
        return entries
    }

    private buildOptions (icon?: string): SelectorOption<TabEntry>[] {
        return this.collectTabs().map(entry => ({
            name: entry.title || `Tab ${entry.index}`,
            description: `Tab #${entry.index}`,
            color: entry.color,
            icon,
            result: entry,
        }))
    }

    /** Show the quick-switch selector modal and focus the chosen tab. */
    async show (): Promise<void> {
        const options = this.buildOptions()
        if (options.length === 0) {
            return
        }

        try {
            const selected = await this.selector.show<TabEntry>('Switch to tab', options)
            if (selected) {
                if (selected.tab.parent && selected.tab.parent !== selected.tab) {
                    this.app.selectTab(selected.tab.parent)
                    setTimeout(() => selected.tab.emitFocused(), 50)
                } else {
                    this.app.selectTab(selected.tab)
                }
            }
        } catch {
            // User dismissed the selector
        }
    }

    /** Show the tab selector, then open a rename prompt for the chosen tab. */
    async showRename (): Promise<void> {
        const options = this.buildOptions('fas fa-pen')
        if (options.length === 0) {
            return
        }

        try {
            const selected = await this.selector.show<TabEntry>('Rename tab', options)
            if (!selected) {
                return
            }

            const modal = this.ngbModal.open(PromptModalComponent)
            modal.componentInstance.value = selected.tab.customTitle || selected.tab.title
            modal.componentInstance.showRememberCheckbox = false

            const result = await modal.result
            if (result?.value != null) {
                const newTitle = result.value.trim()
                if (newTitle.length > 0) {
                    selected.tab.setTitle(newTitle)
                    selected.tab.customTitle = newTitle
                    this.notifications.info(`Tab renamed to "${newTitle}"`)
                }
            }
        } catch {
            // User dismissed the selector or prompt
        }
    }

    /** Show the tab selector, then close the chosen tab. */
    async showClose (): Promise<void> {
        const options = this.buildOptions('fas fa-times')
        if (options.length === 0) {
            return
        }

        try {
            const selected = await this.selector.show<TabEntry>('Close tab', options)
            if (selected) {
                await this.app.closeTab(selected.tab, true)
            }
        } catch {
            // User dismissed the selector
        }
    }

    /** Show the tab selector, then duplicate the chosen tab. */
    async showDuplicate (): Promise<void> {
        const options = this.buildOptions('fas fa-copy')
        if (options.length === 0) {
            return
        }

        try {
            const selected = await this.selector.show<TabEntry>('Duplicate tab', options)
            if (selected) {
                const newTab = await this.app.duplicateTab(selected.tab)
                if (newTab) {
                    this.notifications.info('Tab duplicated')
                }
            }
        } catch {
            // User dismissed the selector
        }
    }
}
