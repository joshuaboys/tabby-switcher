import { Injectable } from '@angular/core'
import { HotkeyDescription, HotkeyProvider } from 'tabby-core'

@Injectable()
export class SwitcherHotkeyProvider extends HotkeyProvider {
    async provide (): Promise<HotkeyDescription[]> {
        return [
            {
                id: 'switcher-show',
                name: 'Show the tab switcher',
            },
            {
                id: 'switcher-rename',
                name: 'Rename a tab (via switcher)',
            },
            {
                id: 'switcher-close',
                name: 'Close a tab (via switcher)',
            },
            {
                id: 'switcher-duplicate',
                name: 'Duplicate a tab (via switcher)',
            },
            {
                id: 'tmux-switch',
                name: 'Switch tmux session/window/pane',
            },
            {
                id: 'tmux-rename',
                name: 'Rename tmux session or window',
            },
            {
                id: 'tmux-kill',
                name: 'Kill tmux session/window/pane',
            },
            {
                id: 'tmux-new-session',
                name: 'Create new tmux session',
            },
            {
                id: 'tmux-new-window',
                name: 'Create new tmux window',
            },
        ]
    }
}
