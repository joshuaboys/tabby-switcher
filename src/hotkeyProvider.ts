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
        ]
    }
}
