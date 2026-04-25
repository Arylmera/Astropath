# astropath — Claude instructions

## Coding practices
Always read and follow [CODING_PRACTICE.md](./CODING_PRACTICE.md) when writing or reviewing code in this repo. It covers TypeScript config, Vite setup, project structure, performance, testing, and React patterns.

## Refactoring
After every code change, run a refactoring pass: remove duplication, simplify abstractions, improve naming, and ensure consistency with the surrounding code. Use the `simplify` skill when available.

## Dev server
Local dev server runs at http://192.168.1.101:5137/

## Repo conventions
- Data files: `src/assets/<faction>/` (JSON + MD pairs, plus `index.json`).
- When a fetch/lookup fails, append the gap to `TODO.md` at repo root.
- Push to `origin/develop` at end of each session.

## Hot file map
Consult these summaries before re-reading large hub files. Open the source only when editing or when the summary is insufficient. Update this map in the same commit if the underlying shape changes.

### src/index.css (~613 lines)
Theme tokens + CSS variables. Four themes via `html[data-theme]`: void (default `:root`), archive, cathedral, codex.
Token families: `--bg*`, `--text`, `--accent`, `--mech-*` (Mechanicus), `--forge-*` (Forge).

### src/data/astropath.ts (9 lines)
Aggregator. Default export `DATA: AstropathData = { primarchs, legions, mechanicus, mechCategories, sororitas }`. Re-exports from `./primarchs`, `./legions`, `./mechanicus`, `./sororitas`. Single data entry point.

### src/App.tsx (~466 lines)
Root component: nav state, theme switching, view routing.
- State: `nav {view, id}`, `theme` (void|archive|cathedral|codex), `mechTab`.
- LocalStorage keys: `astropath.nav`, `astropath.theme`, `astropath.mechTab`.
- Views → screens: `galaxy`→PrimarchsScreen; `primarch`→Lexicon; `lore`→LoreView; `legion`→LegionView; `mechanicus|forge|forge-lore|mech-entry|mech-lore`→AdeptusMechanicusScreen; `sororitas|order`→AdeptaSororitasScreen.
- Helpers: `archiveOf(view)` maps view→archive section; `MECH_CHIP_FIELDS` lists Mechanicus entry chips.
