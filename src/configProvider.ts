import { Injectable } from '@angular/core'
import { ConfigProvider } from 'tabby-core'

@Injectable()
export class SwitcherConfigProvider extends ConfigProvider {
    defaults = {
        hotkeys: {
            'switcher-show': ['Ctrl-Shift-T'],
            'switcher-rename': ['Ctrl-Shift-R'],
            'switcher-close': ['Ctrl-Shift-W'],
            'switcher-duplicate': ['Ctrl-Shift-D'],
            'tmux-switch': ['Alt-Shift-T'],
            'tmux-rename': ['Alt-Shift-R'],
            'tmux-kill': ['Alt-Shift-W'],
            'tmux-new-session': ['Alt-Shift-N'],
            'tmux-new-window': ['Alt-Shift-L'],
        },
    }

    platformDefaults = {
        linux: {
            hotkeys: {
                'switcher-show': ['Ctrl-Shift-T'],
                'switcher-rename': ['Ctrl-Shift-R'],
                'switcher-close': ['Ctrl-Shift-W'],
                'switcher-duplicate': ['Ctrl-Shift-D'],
                'tmux-switch': ['Alt-Shift-T'],
                'tmux-rename': ['Alt-Shift-R'],
                'tmux-kill': ['Alt-Shift-W'],
                'tmux-new-session': ['Alt-Shift-N'],
                'tmux-new-window': ['Alt-Shift-L'],
            },
        },
        darwin: {
            hotkeys: {
                'switcher-show': ['Cmd-Shift-T'],
                'switcher-rename': ['Cmd-Shift-R'],
                'switcher-close': ['Cmd-Shift-W'],
                'switcher-duplicate': ['Cmd-Shift-D'],
                'tmux-switch': ['Cmd-Alt-T'],
                'tmux-rename': ['Cmd-Alt-R'],
                'tmux-kill': ['Cmd-Alt-W'],
                'tmux-new-session': ['Cmd-Alt-N'],
                'tmux-new-window': ['Cmd-Alt-L'],
            },
        },
        win32: {
            hotkeys: {
                'switcher-show': ['Ctrl-Shift-T'],
                'switcher-rename': ['Ctrl-Shift-R'],
                'switcher-close': ['Ctrl-Shift-W'],
                'switcher-duplicate': ['Ctrl-Shift-D'],
                'tmux-switch': ['Alt-Shift-T'],
                'tmux-rename': ['Alt-Shift-R'],
                'tmux-kill': ['Alt-Shift-W'],
                'tmux-new-session': ['Alt-Shift-N'],
                'tmux-new-window': ['Alt-Shift-L'],
            },
        },
    }
}
