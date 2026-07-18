# TODO — Missing Data

Entries that could not be fetched. Revisit with alternate sources (Lexicanum, official codex, newer wiki page).

## Space Marines — Lexicanum enrichment

- **wh40k-fr.lexicanum.com** — Access blocked; could not fetch French Lexicanum pages for any Space Marine faction. Re-probe before retrying: `curl -s -o /dev/null -w "%{http_code}" https://wh40k-fr.lexicanum.com/wiki/Ultramarines` (last checked 2026-07-18: 403). Alternate approach: English Lexicanum, training knowledge, or a mirror. Target fields: `homeworld`, `fortressMonastery`, `colors`, `battleCry`, `specialty`.

## CI

- **`.github/workflows/publish-image.yml`** — actions bumped to their Node-24 majors on 2026-07-18, but **not yet exercised**: the workflow only runs on push/PR to `main` or manual dispatch, so the bump is unverified until the next run there. Confirm the deprecation warning is gone and the image still builds.

