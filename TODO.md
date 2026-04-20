# TODO — Missing Data

Entries that could not be fetched. Revisit with alternate sources (Lexicanum, official codex, newer wiki page).

## Adepta Sororitas

- **Morvenn Vahl** — Abbess Sanctorum of the Adepta Sororitas (introduced in 9th ed codex). No page on warhammer40k.fandom.com under `Morvenn_Vahl`, `Morvenn_Vahl,_Abbess_Sanctorum`, or `Abbess_Sanctorum`. Try Lexicanum or GW codex sources.
- **Battle Sister** — Generic trooper profile. No standalone page on warhammer40k.fandom.com (`Battle_Sister`, `Battle_Sisters` both missing). Content likely folded into the main Adepta Sororitas page; may need manual extraction.

## Space Marines — Lexicanum enrichment

- **wh40k-fr.lexicanum.com** — Returns HTTP 402 (access blocked). Could not fetch French Lexicanum pages for any Space Marine faction. Alternate approach: use training knowledge or try a proxy/mirror. Target fields: `homeworld`, `fortressMonastery`, `colors`, `battleCry`, `specialty`.

## Code quality

- **App.tsx:51-68** — `useEffect` calling `setState` synchronously (flagged by `react-hooks/set-state-in-effect`). Refactor lore loading to derived state or event handler per CODING_PRACTICE.md §7.
- **Bundle size** — faction chunks exceed 500 kB (up to 615 kB for dark-angels). Investigate: likely large JSON/MD data bundled in. Consider lazy-loading per-faction data via `fetch` instead of `import`.
