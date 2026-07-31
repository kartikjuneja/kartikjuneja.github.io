# Kartik Juneja — Public Workspace

Static public website for [Kartik Juneja](https://kartikjuneja.com) — products, professional case studies, engineering knowledge, and background.

## Stack

- Vite + TypeScript
- Markdown + JSON content
- Client History API router
- GitHub Pages compatible (`dist/` + `404.html` fallback)
- No backend, no CMS, no analytics in v1

## Quick start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

`npm run build` writes `dist/` and copies `index.html` → `dist/404.html` for deep-link support on GitHub Pages.

## Deploy (GitHub Pages)

1. Build with `npm run build`.
2. Publish the **`dist/`** folder (GitHub Actions recommended, or `gh-pages` / Pages “deploy from branch” of build output).
3. Do **not** publish the repo root HTML from `archive/previous-site/` as the live site.
4. Point the custom domain (if used) at Pages and confirm HTTPS.

Deep links require the postbuild `404.html` fallback to be present in the published artifact.

## Content

Edit files under `content/`:

| Path | Purpose |
|------|---------|
| `site/settings.json` | Name, meta, contact, domain |
| `site/navigation.json` | Primary nav (Home · Products · Knowledge · About · Contact) |
| `site/social.json` | Social links |
| `home/homepage.json` | Home intro, now-building slug, featured selection |
| `products/*.md` | Independent / research products |
| `case-studies/*.md` | Professional case studies (e.g. Horsepower Financial) |
| `knowledge/**/*.md` | Engineering knowledge entries |
| `about/*` | Story, philosophy, experience, resume, focus, uses |

Files prefixed with `_` (templates) are ignored by loaders.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md).

## Design

Visual system: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) (Module Rail Grid).  
Product narrative: [docs/WORKSPACE_REPOSITIONING.md](./docs/WORKSPACE_REPOSITIONING.md).  
Docs index: [docs/README.md](./docs/README.md).

## Archive

Previous website: `archive/previous-site/` (inactive).
