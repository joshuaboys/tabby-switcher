import { Injectable } from '@angular/core'
import { AppService, SelectorOption, SelectorService, SplitTabComponent } from 'tabby-core'

export interface TabEntry {
    tab: any
    title: string
    index: number
    icon?: string
    color?: string
}

@Injectable({ providedIn: 'root' })
export class SwitcherService {
    constructor (
        private app: AppService,
        private selector: SelectorService,
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
                        icon: child.icon ?? undefined,
                        color: child.color ?? undefined,
                    })
                }
                if (children.length === 0) {
                    entries.push({
                        tab,
                        title: tab.customTitle || tab.title,
                        index: i + 1,
                        icon: tab.icon ?? undefined,
                        color: tab.color ?? undefined,
                    })
                }
            } else {
                entries.push({
                    tab,
                    title: tab.customTitle || tab.title,
                    index: i + 1,
                    icon: tab.icon ?? undefined,
                    color: tab.color ?? undefined,
                })
            }
        }
        return entries
    }

    /** Show the quick-switch selector modal and focus the chosen tab. */
    async show (): Promise<void> {
        const entries = this.collectTabs()
        if (entries.length === 0) {
            return
        }

        const options: SelectorOption<TabEntry>[] = entries.map(entry => ({
            name: entry.title || `Tab ${entry.index}`,
            description: `Tab #${entry.index}`,
            icon: entry.icon,
            color: entry.color,
            result: entry,
        }))

        try {
            const selected = await this.selector.show<TabEntry>('Switch to tab', options)
            if (selected) {
                // If the selected tab lives inside a SplitTabComponent, focus the
                // parent first, then focus the child pane.
                if (selected.tab.parent && selected.tab.parent !== selected.tab) {
                    this.app.selectTab(selected.tab.parent)
                    // Give the parent a tick to render, then focus the child
                    setTimeout(() => selected.tab.emitFocused(), 50)
                } else {
                    this.app.selectTab(selected.tab)
                }
            }
        } catch {
            // User dismissed the selector — nothing to do
        }
    }
}
