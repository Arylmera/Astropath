# TODO — Missing Data

Entries that could not be fetched. Revisit with alternate sources (Lexicanum, official codex, newer wiki page).

## Space Marines — Lexicanum enrichment

- **wh40k-fr.lexicanum.com** — Returns HTTP 402 (access blocked). Could not fetch French Lexicanum pages for any Space Marine faction. Alternate approach: use training knowledge or try a proxy/mirror. Target fields: `homeworld`, `fortressMonastery`, `colors`, `battleCry`, `specialty`.

## Code quality

- **App.tsx:51-68** — `useEffect` calling `setState` synchronously (flagged by `react-hooks/set-state-in-effect`). Refactor lore loading to derived state or event handler per CODING_PRACTICE.md §7.
- **Bundle size** — faction chunks exceed 500 kB (up to 615 kB for dark-angels). Investigate: likely large JSON/MD data bundled in. Consider lazy-loading per-faction data via `fetch` instead of `import`.

## Adeptus Mechanicus — missing entry background images

Each entry in `src/assets/admech/*.json` accepts an optional `"image"` URL rendered as: left portrait on the lexicon landing card, right faded background on the lore page. Falls back to the cog SVG when absent. Ryza is the reference (`GraxRyza2.jpg`).

Still needing an `image`:

### Forge Worlds
- [ ] mars
- [ ] metalica
- [ ] graia
- [ ] lucius
- [ ] stygies-viii
- [ ] agripinaa

### Organisation
- [ ] adeptus-mechanicus
- [ ] mechanicum
- [ ] cult-mechanicus
- [ ] collegia-titanica
- [ ] legio-cybernetica

### Theology
- [ ] omnissiah
- [ ] machine-god
- [ ] machine-spirit

### Rank
- [ ] fabricator-general
- [ ] archmagos
- [ ] magos
- [ ] tech-priest

### Character
- [ ] belisarius-cawl
- [ ] kelbor-hal

### Military
- [ ] skitarii
- [ ] kataphron
- [ ] electro-priest
- [ ] sicarian
- [ ] ironstrider
- [ ] kastelan-robot
- [ ] titan
- [ ] imperial-knights

### Technology
- [ ] standard-template-construct

### History
- [ ] dark-age-of-technology
- [ ] schism-of-mars
