# astropath

An interactive lexicon of the Warhammer 40,000 universe — Primarchs, Space Marine Legions, Forge Worlds of the Adeptus Mechanicus, and Orders Militant of the Adepta Sororitas — presented as an in-universe archive terminal.

> Fan project. Warhammer 40,000 and all related names, marks, and imagery are © Games Workshop Ltd.

## Features

- **Galaxy Map** — browse the 20 Primarchs and the Emperor; each opens a full archive record.
- **Legiones Astartes** — Legion files cross-linked with their Primarch.
- **Adeptus Mechanicus** — Forge Worlds plus seven sub-categories (Titan Legions, Knight Houses, Cults, etc.).
- **Adepta Sororitas** — Orders Militant rendered as stained-glass panels.
- **Lore view** — long-form archive records per entry (JSON + Markdown pairs).
- **Theme switcher** — multiple color themes persisted to `localStorage`.
- **Stateful navigation** — selected view, tab, and theme survive reloads.

## Stack

- React 19 + TypeScript (strict)
- Vite 8
- No router — `localStorage`-backed view state
- Data lives in `src/assets/<faction>/` as JSON + MD pairs with an `index.json`

## Getting started

```bash
npm install
npm run dev         # http://localhost:5137 (also exposed on LAN)
npm run build       # tsc -b && vite build
npm run typecheck
npm run lint
npm run preview
```

## Project layout

```
src/
  assets/           JSON + MD data per faction (+ index.json)
    admech/
    primarchs/
    sororitas/
    space-marines/
  components/       Reusable UI (Chrome, Lexicon, Tweaks, ...)
  screens/          Top-level views per faction
  data/             Types + aggregated dataset
  lib/              Helpers (datasets, lexicon formatting)
  App.tsx           View dispatcher (switch over Nav.view)
  main.tsx
```

Views are dispatched from `App.tsx` via a `Nav = { view, id }` state object; archive categories are derived from the current view.

## Adding content

1. Drop a JSON entry and matching MD file into `src/assets/<faction>/`.
2. Register it in that faction's `index.json`.
3. For Adepta Sororitas, also add the glass case in `components/adeptaSororitas/StainedGlass.tsx`.
4. If a fetch/lookup fails while gathering data, log the gap in `TODO.md`.

See [CODING_PRACTICE.md](./CODING_PRACTICE.md) for TypeScript, Vite, and React conventions used throughout the repo.

## Contributing

- Conventional Commits (`feat(scope): ...`, `fix(scope): ...`).
- One logical change per commit.
- Push to `origin/develop`.

## License

Code: MIT (update if different).
Warhammer 40,000 lore and imagery remain property of Games Workshop Ltd. Unofficial, not endorsed by Games Workshop.
