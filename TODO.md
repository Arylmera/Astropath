# TODO — Missing Data

Entries that could not be fetched. Revisit with alternate sources (Lexicanum, official codex, newer wiki page).

## Space Marines — Lexicanum enrichment

- **wh40k-fr.lexicanum.com** — Access blocked; could not fetch French Lexicanum pages for any Space Marine faction. Re-probe before retrying: `curl -s -o /dev/null -w "%{http_code}" https://wh40k-fr.lexicanum.com/wiki/Ultramarines` (last checked 2026-07-18: 403). Alternate approach: English Lexicanum, training knowledge, or a mirror. Target fields: `homeworld`, `fortressMonastery`, `colors`, `battleCry`, `specialty`.

## CI

- **`.github/workflows/publish-image.yml`** — GitHub Actions logged a deprecation warning on the last run (2026-07-18): Node.js 20 is deprecated and the pinned actions are being forced onto Node 24. Latest releases available (checked 2026-07-18): `actions/checkout` v4→v7.0.0, `docker/setup-buildx-action` v3→v4.2.0, `docker/login-action` v3→v4.4.0, `docker/metadata-action` v5→v6.2.0, `docker/build-push-action` v6→v7.3.0. All are major bumps — read each changelog before bumping.

