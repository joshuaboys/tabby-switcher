# tabby-switcher

| Field | Value |
|-------|-------|
| Status | Active |
| Owner | @joshuaboys |
| Created | 2026-02-10 |

## Problem

Tabby has no built-in quick tab switcher. Managing many terminals with tabs and split panes is cumbersome. This plugin provides hotkey-driven tab management (switch, rename, close, duplicate) via a fuzzy-search selector.

## Success Criteria

- [x] Plugin builds and loads in Tabby
- [x] Switch, rename, close, duplicate actions work via hotkeys
- [ ] Published to npm as `tabby-switcher`
- [ ] Discoverable in Tabby's plugin marketplace (Settings > Plugins)

## Constraints

- Must use Tabby's public API only (tabby-core exports)
- Angular version must be compatible with Tabby's runtime
- All heavy dependencies (Angular, ng-bootstrap, tabby-*) are externals at build time

## Modules

| Module | Purpose | Status | Dependencies |
|--------|---------|--------|--------------|
| [npm-publish](./modules/npm-publish.aps.md) | Publish to npm registry | Draft | — |
| [enhancements](./modules/enhancements.aps.md) | Future feature ideas | Draft | npm-publish |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tabby API breaking changes | Plugin stops working | Pin tabby-core devDep, test against nightly |
| Hotkey conflicts with user bindings | Poor UX | All hotkeys configurable in Settings > Hotkeys |
| npm name squatting | Can't publish as `tabby-switcher` | Check availability before attempting |

## Open Questions

- [ ] Is `tabby-switcher` available on npm?
- [ ] Should we add a `repository` field to package.json for npm?

## Decisions

- **D-001:** Use `PromptModalComponent` over `RenameTabModalComponent` — *resolved* (RenameTabModal is not publicly exported)
- **D-002:** Separate hotkeys per action vs action modes in one selector — *resolved* (separate hotkeys, idiomatic Tabby pattern)
