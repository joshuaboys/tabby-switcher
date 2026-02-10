# tmux Integration

| ID | Owner | Status |
|----|-------|--------|
| TMUX | @joshuaboys | In Progress |

## Purpose

Add tmux-aware navigation to tabby-switcher. Users can fuzzy-search and jump to any tmux session, window, or pane without memorising prefix combos. Also supports rename, kill, and create actions.

## Success Criteria

- [ ] Selector lists all tmux sessions/windows/panes with process info
- [ ] Switching sends the correct `tmux switch-client`/`select-window`/`select-pane`
- [ ] Rename works for sessions and windows
- [ ] Kill works for sessions, windows, and panes
- [ ] New session/window creation via selector
- [ ] Graceful no-op when tmux is not running

## Tasks

### TMUX-001: TmuxService with session/window/pane listing

- **Intent:** Query tmux state and present it in the selector
- **Expected Outcome:** Hotkey opens a grouped selector showing all tmux sessions > windows > panes with running command
- **Validation:** `pnpm build` succeeds; selector shows tmux hierarchy when tmux is running

### TMUX-002: Switch to selected tmux target

- **Intent:** Jump to the selected session/window/pane
- **Expected Outcome:** Selecting an item sends the correct tmux switch command
- **Validation:** Manually test switching between sessions/windows/panes

### TMUX-003: Rename tmux session or window

- **Intent:** Rename via selector + prompt modal
- **Expected Outcome:** Runs `tmux rename-session` or `tmux rename-window`
- **Validation:** tmux status bar reflects new name

### TMUX-004: Kill tmux session/window/pane

- **Intent:** Kill a target from the selector
- **Expected Outcome:** Runs `tmux kill-session`, `kill-window`, or `kill-pane`
- **Validation:** Target disappears from tmux

### TMUX-005: Create new tmux session or window

- **Intent:** Quick-create from a prompt
- **Expected Outcome:** New session or window created and switched to
- **Validation:** New target appears in tmux
