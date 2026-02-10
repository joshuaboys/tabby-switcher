import { Injectable } from '@angular/core'
import { ConfigProvider } from 'tabby-core'

@Injectable()
export class SwitcherConfigProvider extends ConfigProvider {
    defaults = {
        hotkeys: {
            'switcher-show': [
                'Ctrl-Shift-T',
            ],
        },
    }

    platformDefaults = {
        linux: {
            hotkeys: {
                'switcher-show': [
                    'Ctrl-Shift-T',
                ],
            },
        },
        darwin: {
            hotkeys: {
                'switcher-show': [
                    'Cmd-Shift-T',
                ],
            },
        },
        win32: {
            hotkeys: {
                'switcher-show': [
                    'Ctrl-Shift-T',
                ],
            },
        },
    }
}
