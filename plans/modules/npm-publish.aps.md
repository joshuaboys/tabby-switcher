# npm Publish

| ID | Owner | Status |
|----|-------|--------|
| NPUB | @joshuaboys | Draft |

## Purpose

Publish tabby-switcher to npm so it's installable from Tabby's plugin marketplace (Settings > Plugins) and via `npm install tabby-switcher`.

## Success Criteria

- [ ] Package published to npm registry
- [ ] Searchable in Tabby's plugin settings by name
- [ ] GitHub release workflow triggers on tag push

## Tasks

### NPUB-001: Verify npm name availability

- **Intent:** Confirm `tabby-switcher` is not taken on npm
- **Expected Outcome:** Name is available or alternative is chosen
- **Validation:** `npm view tabby-switcher` returns 404

### NPUB-002: Add npm metadata to package.json

- **Intent:** Ensure package.json has all fields npm and Tabby require
- **Expected Outcome:** `repository`, `homepage`, `bugs` fields added; `keywords` includes `tabby-plugin`
- **Validation:** `pnpm pack --dry-run` shows correct files

### NPUB-003: First publish

- **Intent:** Publish v0.1.0 to npm
- **Expected Outcome:** Package live on npmjs.com
- **Validation:** `npm view tabby-switcher` returns package info

### NPUB-004: Tag and release

- **Intent:** Create a git tag and GitHub release
- **Expected Outcome:** GitHub Actions release workflow runs, creates GH release
- **Validation:** `gh release list` shows v0.1.0
