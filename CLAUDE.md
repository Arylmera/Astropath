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
Before reading these files, pick the section from the index below and use `Read offset/limit` (e.g. `Read offset:220 limit:80`). Open the full file only when editing across regions. Update this map in the same commit if line numbers shift materially.

### src/index.css (~613 lines)
Theme tokens + CSS variables. Four themes via `html[data-theme]`: void (default `:root`), archive, cathedral, codex.
Token families: `--bg*`, `--text`, `--accent`, `--mech-*` (Mechanicus), `--forge-*` (Forge).

Section index (line → banner / block):
- `1` — header comment + `:root` token block (void defaults)
- `44` — `html[data-theme="archive"]` tokens
- `77` — `html[data-theme="cathedral"]` tokens
- `110` — `html[data-theme="codex"]` tokens
- `143` — Base
- `169` — Chrome
- `213` — View container
- `220` — Galaxy map
- `293` — Lexicon
- `335` — Legion
- `378` — Tweaks
- `408` — Misc
- `439` — Lore record view
- `496` — Mechanicus Archive
- `540` — Sororitas Archive
- `604` — Forge + Order lexicon portraits

### src/data/astropath.ts (9 lines)
Aggregator. Default export `DATA: AstropathData = { primarchs, legions, mechanicus, mechCategories, sororitas }`. Re-exports from `./primarchs`, `./legions`, `./mechanicus`, `./sororitas`. Single data entry point.

### src/App.tsx (~466 lines)
Root component: nav state, theme switching, view routing.
- State: `nav {view, id}`, `theme` (void|archive|cathedral|codex), `mechTab`.
- LocalStorage keys: `astropath.nav`, `astropath.theme`, `astropath.mechTab`.
- Views → screens: `galaxy`→PrimarchsScreen; `primarch`→Lexicon; `lore`→LoreView; `legion`→LegionView; `mechanicus|forge|forge-lore|mech-entry|mech-lore`→AdeptusMechanicusScreen; `sororitas|order`→AdeptaSororitasScreen.
- Helpers: `archiveOf(view)` maps view→archive section; `MECH_CHIP_FIELDS` lists Mechanicus entry chips.

Section index:
- `1–17` — imports
- `19–22` — localStorage keys (`NAV_KEY`, `THEME_KEY`, `MECH_TAB_KEY`) + `sororitasDataset`
- `24–33` — `MECH_PORTRAIT` constant + `mechPortraitFor(image?)`
- `34–49` — `MechStringField` type + `MECH_CHIP_FIELDS` table
- `51–67` — `loadNav` / `loadTheme` / `loadMechTab`
- `68–73` — `archiveOf(view)`
- `74–end` — `export default function App()` body: state, effects, view switch, theme + tab handlers
