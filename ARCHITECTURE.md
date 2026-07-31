# Architecture

This repository is a **static website engine** for a personal product site. Adding products, articles, and pages should mostly mean adding content files—not rewriting UI.

## Goals

- Fully static output (GitHub Pages compatible)
- Content-driven rendering
- Strong TypeScript models
- Reusable presentation components
- Premium visual quality over feature count
- Maintainable extension path for search, themes, and case studies

## High-level flow

```
content/*  →  typed loaders  →  page modules  →  components  →  DOM
                 ↓
           search index (shared by command palette)
```

## Folder conventions

```
archive/previous-site/   Historical site (inactive)
content/                 Source of truth for copy and data
public/                  Static assets copied as-is (robots, favicon, og image)
scripts/                 Build helpers (404 fallback)
src/
  components/            Presentational UI builders
  content/               Loaders + markdown/frontmatter parsing
  pages/                 Route modules that compose components
  router/                History API router
  search/                Build-time search corpus + query API
  scripts/               SEO, theme helpers
  styles/                Tokens, themes, base, components
  types/                 Shared content interfaces
```

## Routing

- Lightweight client-side router using the History API
- Page modules are loaded with dynamic `import()`
- No framework router
- No hash routing

### GitHub Pages deep links

`npm run build` writes `dist/404.html` as a copy of `dist/index.html`.

When GitHub Pages cannot find `/about`, it serves `404.html`. The app shell loads, reads `window.location.pathname`, and renders the correct page.

## Content model

### JSON — structured data

Use JSON for enumerable, reusable records:

- site, navigation, social
- services, timeline
- experience, education, skills
- availability

Resume, About (facts), Timeline, and Home CTAs consume these shared files. **Do not duplicate** experience/education/skills in a separate resume dataset.

### Markdown — long-form narrative

Use Markdown (optional YAML frontmatter) for:

- `content/pages/*.md` (about, now, uses)
- `content/products/*.md` (case studies)
- `content/writing/*.md`
- `content/experiments/*.md`

Files prefixed with `_` (for example `_template.md`) are ignored by loaders.

### Product schema

Product Markdown supports frontmatter:

- slug, name, description, status, technology, featured, links

And body sections:

- Overview, Problem, Solution, Architecture, Technology, Lessons Learned, Future, Screenshots

Missing sections render as placeholders (`To be added.`). Never invent product content.

## Component philosophy

- Components are small TypeScript functions that return DOM nodes
- Pages compose components directly
- No block registry, CMS, plugin system, or visual page builder
- Prefer clarity over abstraction

Core building blocks:

Hero, Section, Feature Grid, Timeline, Project Card, Case Study, Callout, Quote, Stats, Availability, Contact CTA, Footer, Command Palette

## Search

`src/search/index.ts` builds a typed corpus at bundle time from content:

- pages, products, articles, services, experiments

The command palette queries this same index (simple substring matching in v1).

### Adding Pagefind later

Do **not** change page components. Instead:

1. Emit the `SearchItem[]` corpus (or HTML stubs derived from content) during build
2. Point Pagefind (or another static indexer) at that emit
3. Swap or wrap the query function used by the command palette

The stable contract is the `SearchItem` interface in `src/types`.

## Theme system

```
src/styles/tokens.css
src/styles/themes/dark.css   # default
src/styles/themes/light.css
src/styles/base.css
src/styles/components.css
```

Components use semantic CSS variables only. Theme switching sets `data-theme` on `<html>`.

## Design principles

- Dark mode first, light mode supported
- Minimal, elegant, premium product feel
- Subtle hover/focus/dialog motion only
- Respect `prefers-reduced-motion`
- No analytics in v1
- No neon/hacker/terminal aesthetics

## SEO

- Per-route title/description updates
- Open Graph + Twitter meta
- JSON-LD `Person`
- `robots.txt`, `sitemap.xml`, favicon, OG image in `public/`

## Future extension strategy

| Need | Approach |
|------|----------|
| New product | Add `content/products/{slug}.md` |
| New article | Add `content/writing/{slug}.md` |
| New experiment | Add `content/experiments/{slug}.md` |
| New static page type | Add Markdown/JSON + one page module + one route |
| Richer search | Emit index at build; keep `SearchItem` contract |
| PDF resume | Generate from shared experience/education/skills/products |
| New theme | Add `styles/themes/{name}.css` using existing tokens |

Keep v1 small. Prefer polished foundations over speculative systems.
