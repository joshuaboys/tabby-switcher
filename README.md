# tabby-switcher

A [Tabby](https://tabby.sh/) plugin that gives you a quick-switch selector for all your open tabs. Hit a hotkey, fuzzy-search by tab title, and jump straight to it.

## Why

If you run lots of terminal windows with lots of tabs, finding the right one is painful. This plugin hooks into Tabby's built-in selector modal to list every open tab (including panes inside split views) and let you switch with a keystroke.

## Install

1. Open Tabby **Settings > Plugins**
2. Search for `tabby-switcher`
3. Click **Install**

Or install manually:

```bash
git clone https://github.com/joshuaboys/tabby-switcher.git
cd tabby-switcher
pnpm install
pnpm build

# launch Tabby with the plugin loaded
TABBY_PLUGINS=$(pwd) tabby --debug
```

## Usage

| Action         | Linux / Win        | macOS              |
|----------------|--------------------|--------------------|
| Switch to tab  | `Ctrl+Shift+T`    | `Cmd+Shift+T`     |
| Rename tab     | `Ctrl+Shift+R`    | `Cmd+Shift+R`     |
| Close tab      | `Ctrl+Shift+W`    | `Cmd+Shift+W`     |
| Duplicate tab  | `Ctrl+Shift+D`    | `Cmd+Shift+D`     |

Press a hotkey to open the selector. Start typing to filter tabs by title, then press Enter to pick one.

All hotkeys are configurable in **Settings > Hotkeys**.

## Features

- Lists all open tabs across the window, including child panes in split views
- Uses Tabby's native selector modal with built-in fuzzy search
- Shows tab colors in the list
- Correctly focuses child panes inside split layouts
- **Rename any tab** — pick a tab, type the new name, done
- **Quick close** — pick a tab to close it (respects unsaved-state prompts)
- **Duplicate** — pick a tab to clone it

## Development

```bash
pnpm install
pnpm watch   # rebuilds on file change
```

In another terminal, launch Tabby pointing at your build:

```bash
TABBY_PLUGINS=/path/to/tabby-switcher tabby --debug
```

## License

MIT
