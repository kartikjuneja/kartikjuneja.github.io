# Architecture

Static website engine for Kartik Juneja’s public workspace. Adding products and knowledge should mostly mean adding content files—not rewriting UI.

## Goals

- Fully static output (GitHub Pages compatible)
- Content-driven rendering
- TypeScript models
- Module Rail Grid presentation
- No CMS / backend in this repository

## High-level flow

```
content/*  →  typed loaders  →  page modules  →  components  →  DOM
                 ↓
           search index (command palette + Knowledge search)
```

## Folder conventions

```
archive/previous-site/   Historical site (inactive)
content/                 Source of truth (v2 tree)
public/                  Static assets (robots, favicon, og, sitemap)
scripts/                 Build helpers (404 fallback)
src/
  components/            Presentational UI builders
  content/               Loaders + markdown/frontmatter parsing
  pages/                 Route modules
  router/                History API router + legacy redirects
  search/                Search corpus + query APIs
  scripts/               SEO, theme helpers
  styles/                Tokens, themes, base, components
  types/                 Shared interfaces
```

## Routing

Primary routes: `/`, `/products`, `/products/:slug`, `/knowledge`, `/knowledge/:slug`, `/about`, `/contact`.

Legacy paths redirect (e.g. `/writing` → `/knowledge`, `/resume` → `/about#resume`).

### GitHub Pages deep links

`npm run build` writes `dist/404.html` as a copy of `dist/index.html`. When Pages cannot find a path, it serves `404.html`; the app reads `pathname` and renders the route.

## Content model (v2)

```
content/
  home/homepage.json
  products/           # independent + research
  case-studies/       # professional only
  knowledge/          # articles, notes, architecture, decisions, reviews
  about/              # story, philosophy, experience, resume, focus, uses
  site/               # settings, navigation, social
```

Professional case studies require employer context and must never be listed as independent products.

## Search

`src/search` builds a static corpus for the command palette. Knowledge also exposes `queryKnowledge` (title → summary → tags/topics → body).

## Themes

Dark-first with a light theme toggle. Tokens live under `src/styles/`. Preference stored in `localStorage`.

## Extension guidance

- New product → Markdown under `products/` or `case-studies/`
- New knowledge entry → Markdown under `knowledge/**` using the section template
- Do not add top-level navigation beyond the frozen five items
- Do not add a CMS or admin app to this repository
