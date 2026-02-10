# Future Enhancements

| ID | Owner | Status |
|----|-------|--------|
| ENHC | @joshuaboys | Draft |

## Purpose

Track potential improvements and new features after initial npm publish.

## Ideas

### ENHC-001: Tab color picker

- **Intent:** Let users set a tab's color from the switcher
- **Expected Outcome:** New hotkey opens selector, pick a tab, pick a color — tab header updates
- **Notes:** `BaseTabComponent.color` is a settable CSS color string

### ENHC-002: Move tab left/right

- **Intent:** Reorder tabs from the switcher without dragging
- **Expected Outcome:** New hotkey opens selector, pick a tab, it moves one position left or right
- **Notes:** `AppService.swapTabs(a, b)` is available

### ENHC-003: Pin/star frequently used tabs

- **Intent:** Mark tabs as favorites so they sort to the top of the selector
- **Expected Outcome:** Pinned tabs appear in a "Pinned" group in the selector
- **Notes:** Would need persistent config via `ConfigService`

### ENHC-004: Tab preview on hover

- **Intent:** Show a preview of the tab content while navigating the selector
- **Expected Outcome:** Selected tab becomes briefly visible before confirming
- **Notes:** Would require a custom selector component — higher complexity

### ENHC-005: Fuzzy match by process name

- **Intent:** Search tabs by the running process (e.g. "vim", "ssh")
- **Expected Outcome:** Typing a process name matches tabs running that process
- **Notes:** `BaseTabComponent.getCurrentProcess()` returns `{ name: string }` — could add process name to the selector description
