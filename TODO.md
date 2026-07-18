# TODO

Open gaps and unverified work. When a fetch or lookup fails, append the gap here.

## Fetching lore sources

Lexicanum and Fandom reject requests with no `User-Agent` — a bare `curl` gets **403 from every one of them**, which reads like the site is blocking us when it is not. Always send a browser UA:

```sh
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36" <url>
```

With that header, `wh40k-fr.lexicanum.com`, `wh40k.lexicanum.com` and `warhammer40k.fandom.com` all return 200 (verified 2026-07-18).

## CI

- **`.github/workflows/publish-image.yml`** — actions bumped to their Node-24 majors on 2026-07-18, but **not yet exercised**: the workflow only runs on push/PR to `main` or manual dispatch, so the bump is unverified until the next run there. Confirm the deprecation warning is gone and the image still builds.
