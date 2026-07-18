# TODO — Missing Data

Entries that could not be fetched. Revisit with alternate sources (Lexicanum, official codex, newer wiki page).

## Space Marines — Lexicanum enrichment

- **wh40k-fr.lexicanum.com** — Returns HTTP 402 (access blocked). Could not fetch French Lexicanum pages for any Space Marine faction. Alternate approach: use training knowledge or try a proxy/mirror. Target fields: `homeworld`, `fortressMonastery`, `colors`, `battleCry`, `specialty`.

## CI

- **`.github/workflows/publish-image.yml`** — GitHub Actions logged a deprecation warning on the last run (2026-07-18): Node.js 20 is deprecated and the pinned actions (`actions/checkout@v4`, `docker/build-push-action@v6`, `docker/login-action@v3`, `docker/metadata-action@v5`, `docker/setup-buildx-action@v3`) are being forced onto Node 24. Bump the action versions to their Node-24-native releases to silence it.

## Code quality

- **App.tsx:51-68** — `useEffect` calling `setState` synchronously (flagged by `react-hooks/set-state-in-effect`). Refactor lore loading to derived state or event handler per CODING_PRACTICE.md §7.
- **Bundle size** — faction chunks exceed 500 kB (up to 615 kB for dark-angels). Investigate: likely large JSON/MD data bundled in. Consider lazy-loading per-faction data via `fetch` instead of `import`.
