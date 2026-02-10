# tabby-switcher

A [Tabby](https://tabby.sh/) plugin for quick tab switching and tmux navigation. Fuzzy-search and jump to any open tab or tmux session/window/pane with a hotkey.

## Why

If you run lots of terminal windows with lots of tabs — especially with tmux — finding the right one is painful. This plugin hooks into Tabby's built-in selector modal to list every open tab and tmux target, letting you switch, rename, close, or duplicate with a keystroke.

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

### Tab actions

| Action         | Linux / Win        | macOS              |
|----------------|--------------------|--------------------|
| Switch to tab  | `Ctrl+Shift+T`    | `Cmd+Shift+T`     |
| Rename tab     | `Ctrl+Shift+R`    | `Cmd+Shift+R`     |
| Close tab      | `Ctrl+Shift+W`    | `Cmd+Shift+W`     |
| Duplicate tab  | `Ctrl+Shift+D`    | `Cmd+Shift+D`     |

### tmux actions

| Action              | Linux / Win        | macOS              |
|---------------------|--------------------|--------------------|
| Switch tmux target  | `Alt+Shift+T`     | `Cmd+Alt+T`       |
| Rename tmux target  | `Alt+Shift+R`     | `Cmd+Alt+R`       |
| Kill tmux target    | `Alt+Shift+W`     | `Cmd+Alt+W`       |
| New tmux session    | `Alt+Shift+N`     | `Cmd+Alt+N`       |

Press a hotkey to open the selector. Start typing to filter, then press Enter to pick.

All hotkeys are configurable in **Settings > Hotkeys**.

## Features

### Tabs
- Lists all open tabs across the window, including child panes in split views
- Uses Tabby's native selector modal with built-in fuzzy search
- Shows tab colors in the list
- Correctly focuses child panes inside split layouts
- **Rename any tab** — pick a tab, type the new name, done
- **Quick close** — pick a tab to close it (respects unsaved-state prompts)
- **Duplicate** — pick a tab to clone it

### tmux
- **Switch** to any tmux session, window, or pane — grouped by session with running command shown
- **Rename** tmux sessions and windows via a prompt modal
- **Kill** sessions, windows, or panes from the selector
- **Create** new tmux sessions with an optional name
- Graceful no-op when tmux is not running

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
