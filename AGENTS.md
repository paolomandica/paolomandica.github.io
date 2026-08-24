# Repository Guidelines

Personal site for Paolo Mandica, deployed on GitHub Pages. Stay intentionally minimal: plain HTML, CSS, and vanilla JS only — no frameworks, build tools, or dependencies.

## Project Structure

- Root-level pages: `index.html`, `publications.html`, `notes.html`, `updates.html`, `bare-habits.html`, `bare-habits-privacy.html`, `404.html`
- Shared site assets: `style.css`, `site.js`, `theme.js`
- `assets/fonts/` — self-hosted WOFF2 fonts with OFL license files
- `assets/paper-figures/` — paper thumbnails (PNG originals + AVIF/JPG derivatives)
- `assets/bare-habits/` — Bare Habits screenshots and app icons
- Metadata: `site.webmanifest`, `feed.xml`, `sitemap.xml`, `robots.txt`

## Commands

There is no build, test, or lint step — the site is static and served as-is.

When changing pages, keep `sitemap.xml` lastmod dates and per-page `canonical`/`og:url` values in sync — there is no build step to automate it.

- Serve locally: `python3 -m http.server`
- Generate paper thumbnails (see below)

## Coding Style

- Two-space indentation in HTML, CSS, and JS.
- Lowercase, hyphenated file names (`bare-habits.html`, `frame-1.avif`).
- Keep source readable; never minify. There is no build step to restore readability.
- The header, navigation, and footer are duplicated across pages — update every page when changing them.
- Self-host fonts under `assets/fonts/` and keep the OFL license file alongside.

## Paper Thumbnails

This workflow applies only to `assets/paper-figures/`.

- Keep the original full-resolution file intact; never overwrite or delete it.
- Store optimized derivatives (AVIF + JPG, 640px wide) next to the original:
  `ffmpeg -i original.png -vf scale=640:-2 -q:v 28 name.jpg`
  `ffmpeg -i original.png -vf scale=640:-2 -pix_fmt yuv420p -c:v libsvtav1 -crf 35 name.avif`
- Reference them via a `<picture>` element: AVIF `<source>` first, JPG fallback in `<img>`.

## Commits

Single maintainer: push directly to `main`; no pull requests or review process.

- Short, imperative, capitalized messages: "Add ...", "Fix ...", "Update ...", "Redesign ...".
- No conventional-commit prefixes.
- One logical change per commit; name the page, paper, or feature touched (e.g., "Add GPart paper", "Consolidate Now page into Updates").
