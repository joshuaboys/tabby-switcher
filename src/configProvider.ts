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
        },
    }

    platformDefaults = {
        linux: {
            hotkeys: {
                'switcher-show': ['Ctrl-Shift-T'],
                'switcher-rename': ['Ctrl-Shift-R'],
                'switcher-close': ['Ctrl-Shift-W'],
                'switcher-duplicate': ['Ctrl-Shift-D'],
            },
        },
        darwin: {
            hotkeys: {
                'switcher-show': ['Cmd-Shift-T'],
                'switcher-rename': ['Cmd-Shift-R'],
                'switcher-close': ['Cmd-Shift-W'],
                'switcher-duplicate': ['Cmd-Shift-D'],
            },
        },
        win32: {
            hotkeys: {
                'switcher-show': ['Ctrl-Shift-T'],
                'switcher-rename': ['Ctrl-Shift-R'],
                'switcher-close': ['Ctrl-Shift-W'],
                'switcher-duplicate': ['Ctrl-Shift-D'],
            },
        },
    }
}
