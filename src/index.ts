import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import TabbyCoreModule, { ConfigProvider, HotkeyProvider, HotkeysService } from 'tabby-core'

import { SwitcherConfigProvider } from './configProvider'
import { SwitcherHotkeyProvider } from './hotkeyProvider'
import { SwitcherService } from './switcherService'

@NgModule({
    imports: [
        CommonModule,
        TabbyCoreModule,
    ],
    providers: [
        { provide: ConfigProvider, useClass: SwitcherConfigProvider, multi: true },
        { provide: HotkeyProvider, useClass: SwitcherHotkeyProvider, multi: true },
    ],
})
export default class SwitcherModule {
    constructor (
        hotkeys: HotkeysService,
        switcher: SwitcherService,
    ) {
        hotkeys.hotkey$.subscribe(hotkeyId => {
            switch (hotkeyId) {
                case 'switcher-show':
                    switcher.show()
                    break
                case 'switcher-rename':
                    switcher.showRename()
                    break
                case 'switcher-close':
                    switcher.showClose()
                    break
                case 'switcher-duplicate':
                    switcher.showDuplicate()
                    break
            }
        })
    }
}
