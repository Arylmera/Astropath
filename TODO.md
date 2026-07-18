# TODO

No open gaps. When a fetch or lookup fails, append it here.

## Notes

**Fetching lore sources.** Lexicanum and Fandom reject requests with no `User-Agent` — a bare `curl` gets **403 from every one of them**, which reads like the site is blocking us when it is not. Always send a browser UA:

```sh
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36" <url>
```

With that header, `wh40k-fr.lexicanum.com`, `wh40k.lexicanum.com` and `warhammer40k.fandom.com` all return 200 (verified 2026-07-18).

**Validating CI changes.** `publish-image.yml` builds with `push: false` on pull requests, so a PR to `main` exercises the full build without publishing to GHCR.
