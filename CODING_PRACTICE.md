# Coding Practices — TypeScript + Vite + React

Reference guide for this repo. Apply to all new code. Refactor existing code toward these rules when touched.

## 1. TypeScript Config

### Strictness (non-negotiable)
```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Vite-aligned options
```jsonc
{
  "target": "ES2022",
  "module": "ESNext",
  "moduleResolution": "bundler",
  "allowImportingTsExtensions": true,
  "isolatedModules": true,
  "verbatimModuleSyntax": true,
  "noEmit": true,
  "jsx": "react-jsx",
  "resolveJsonModule": true,
  "skipLibCheck": true
}
```

### Split configs
- `tsconfig.json` — base / references.
- `tsconfig.app.json` — app source (DOM lib).
- `tsconfig.node.json` — `vite.config.ts`, scripts.
- `tsconfig.test.json` — Vitest (if used).

### Path aliases
- Define `@/*` → `src/*` in `tsconfig` **and** `vite.config.ts` (`resolve.alias`).
- Easiest: `vite-tsconfig-paths` plugin — single source of truth.
- No relative paths deeper than `../`.

### CI check
Run `tsc --noEmit` in CI. Vite does **not** type-check at build — esbuild only transpiles.

## 2. Project Structure

```
src/
  assets/       static files, images, data JSON
  components/   reusable UI
  pages/        route-level components
  hooks/        custom hooks
  services/     API clients
  lib/          third-party wrappers
  types/        shared types
  utils/        pure helpers
```

- Feature-folder colocation when a component grows: `Foo/Foo.tsx`, `Foo/Foo.test.tsx`, `Foo/Foo.module.css`, `Foo/index.ts`.
- One component per file. Filename matches export.
- No barrel `index.ts` re-exports that span unrelated modules — hurts tree-shaking.

## 3. Vite Config

- Use `defineConfig` (typed).
- Explicit `server.host`, `server.port`.
- `build.target: 'es2022'`, `build.sourcemap: true`.
- Env vars: only `import.meta.env.VITE_*` reach the client. **Never put secrets behind `VITE_`**.
- Parse env at startup with Zod/valibot — fail fast.

## 4. Performance

### Code splitting
- Route-level: `const Page = React.lazy(() => import('./Page'))` + `<Suspense>`.
- Dynamic `import()` for rare paths (modals, admin, heavy libs).

### Manual vendor chunks
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        router: ['react-router-dom'],
      },
    },
  },
}
```

### Bundle audit
- `rollup-plugin-visualizer` — run before merging perf-sensitive PRs.
- Pre-bundle heavy deps via `optimizeDeps.include`.
- CSS code splitting stays on (default).

### React
- Memo expensive lists (`useMemo`, `React.memo`).
- Virtualize lists > ~200 items (`react-window`).
- Stable keys (no array index for dynamic lists).

## 5. Code Quality

### Lint / format
- ESLint **flat config**: `@typescript-eslint/recommended-type-checked`, `eslint-plugin-react-hooks`, `eslint-plugin-import`.
- Prettier handles formatting. Do **not** duplicate formatting rules in ESLint.
- Pre-commit hook (lint-staged) — lint + format only changed files.

### Types
- Prefer `type` for unions, function signatures, mapped types.
- Prefer `interface` for public, extensible object shapes.
- **No `any`.** Use `unknown` + narrow. Cast only at proven boundaries.
- `as const` for literal tuples / readonly configs.
- Branded types for IDs when mix-ups are possible.

### Errors
- `useUnknownInCatchVariables` on → narrow `catch (e: unknown)`.
- Validate external input (API, URL params, localStorage) with Zod/valibot.
- Throw `Error` subclasses, not strings.

## 6. Testing

- **Vitest** for unit + component (`@testing-library/react`).
- **Playwright** for e2e.
- Colocate `*.test.ts(x)` next to source.
- Test behavior, not implementation. No snapshot-only tests for logic.

## 7. React Patterns

- Functional components only.
- Props typed inline for small components, extracted `type Props` for reused.
- Lift state only when shared. Prefer local state.
- Server state via React Query / SWR — don't reinvent caching in `useEffect`.
- `useEffect` is for sync with external systems, **not** for derived state.

## 8. Commits & Git

- Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `refactor`, `chore`, `docs`.
- One logical change per commit.
- Push to `origin/develop` at end of work session (repo rule).

## 9. Repo-specific notes

- Data files live in `src/assets/<faction>/` (JSON + matching MD).
- Keep JSON indexes (`index.json`) in sync when adding entries.
- When a fetch/lookup fails, log the gap in `TODO.md` at repo root.
