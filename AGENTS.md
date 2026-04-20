# astropath — Codex instructions

## Coding practices
Always read and follow [CODING_PRACTICE.md](./CODING_PRACTICE.md) when writing or reviewing code in this repo. It covers TypeScript config, Vite setup, project structure, performance, testing, and React patterns.

## Refactoring
After every code change, run a refactoring pass: remove duplication, simplify abstractions, improve naming, and ensure consistency with the surrounding code. Use the `simplify` skill when available.

## Repo conventions
- Data files: `src/assets/<faction>/` (JSON + MD pairs, plus `index.json`).
- When a fetch/lookup fails, append the gap to `TODO.md` at repo root.
- Push to `origin/develop` at end of each session.
