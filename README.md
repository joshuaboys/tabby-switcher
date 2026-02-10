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

| Platform      | Default Hotkey        |
|---------------|-----------------------|
| Linux / Win   | `Ctrl+Shift+T`       |
| macOS         | `Cmd+Shift+T`        |

Press the hotkey to open the switcher. Start typing to filter tabs by title, then press Enter to jump to your selection.

The hotkey is fully configurable in **Settings > Hotkeys** under "Show the tab switcher".

## Features

- Lists all open tabs across the window, including child panes in split views
- Uses Tabby's native selector modal with built-in fuzzy search
- Shows tab colors in the list
- Correctly focuses child panes inside split layouts
- Single hotkey, zero configuration required

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
