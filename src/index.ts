import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import TabbyCoreModule, { ConfigProvider, HotkeyProvider, HotkeysService } from 'tabby-core'

import { SwitcherConfigProvider } from './configProvider'
import { SwitcherHotkeyProvider } from './hotkeyProvider'
import { SwitcherService } from './switcherService'
import { TmuxService } from './tmuxService'

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
        tmux: TmuxService,
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
                case 'tmux-switch':
                    tmux.showSwitch()
                    break
                case 'tmux-rename':
                    tmux.showRename()
                    break
                case 'tmux-kill':
                    tmux.showKill()
                    break
                case 'tmux-new-session':
                    tmux.showNewSession()
                    break
                case 'tmux-new-window':
                    tmux.showNewWindow()
                    break
            }
        })
    }
}
