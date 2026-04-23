# Personal Website

Minimal, typography-first personal site built with [Astro](https://astro.build).
Content is Markdown; the site rebuilds automatically on every push to `main`.

## Sections

- **Home** (`/`) — intro paragraph + links to the four sections. Edit `src/pages/index.astro`.
- **About me** (`/about-me`) — bio page. Edit `src/pages/about-me.astro`.
- **Projects** (`/projects`) — one Markdown file per project in `src/content/projects/`.
- **Rubricas** (`/rubricas`) — diary-style themes. Each rubrica is a folder in `src/content/rubricas/`.
- **Writings** (`/writings`) — poetries and diary pages, organized by sub-category folder in `src/content/writings/`.

Contact info (email, LinkedIn, GitHub) is pinned in the bottom-right of every page, rendered by `src/layouts/BaseLayout.astro` — there is no standalone `/contact` page.

## Local development

You need Node.js 20+ (get it from <https://nodejs.org> or via `brew install node`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs static site to dist/
npm run preview      # preview the built site
```

## Add a new writing

Writings are organized by sub-category folder inside `src/content/writings/` (e.g. `poetries/`, `diaries-pages/`). To add a new entry, drop a Markdown file inside one of those folders:

```md
---
title: "My poem"
date: 2026-04-22
---

Write it here in Markdown.
```

It appears at `/writings/<category>` automatically. To create a new category, add a folder with an `_index.md` file (same pattern as Rubricas below).

## Add a new project

Same thing in `src/content/projects/`:

```md
---
title: "My project"
date: 2026-04-22
summary: "What it is"
url: "https://example.com"   # optional
---

Describe the project.
```

## Add a new rubrica

1. Create a folder under `src/content/rubricas/`, e.g. `books-that-stayed`.
2. Add `_index.md` inside it:

   ```md
   ---
   title: "Books that stayed"
   summary: "Books I keep returning to."
   isIndex: true
   ---

   Intro paragraph describing the rubrica.
   ```

3. Add entries as `.md` files in the same folder:

   ```md
   ---
   title: "Stoner — John Williams"
   date: 2026-04-22
   ---

   Notes on the book.
   ```

The new rubrica shows up on `/rubricas` automatically.

## Deploy to GitHub Pages

1. On GitHub, create a repo named **`FrauBlucher.github.io`** (this makes the site
   live at `https://FrauBlucher.github.io` with no base path). Push this folder
   to `main`.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
   site and publishes it. The first deploy takes ~1 minute.

If you prefer a different repo name, edit `astro.config.mjs`:

```js
site: 'https://FrauBlucher.github.io',
base: '/your-repo-name/',
```

## Customize

- **Name** — `src/layouts/BaseLayout.astro` (`siteName` constant).
- **Homepage intro / section descriptions** — `src/pages/index.astro`.
- **About me bio** — `src/pages/about-me.astro`.
- **Contact links** (email, LinkedIn, GitHub) — `src/layouts/BaseLayout.astro` (inside the `<aside class="site-contact">` block).
- **Look & feel** — `src/styles/global.css`.
