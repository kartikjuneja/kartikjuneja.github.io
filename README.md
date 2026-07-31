# Kartik Juneja — Personal Website Engine

Static personal website for [kartikjuneja.com](https://kartikjuneja.com), built as a content-driven static site engine.

## Stack

- Vite
- TypeScript
- HTML / CSS / ES Modules
- Markdown + JSON content
- No backend, no SSR, no analytics in v1

## Quick start

```bash
npm install
npm run dev
```

Build for GitHub Pages:

```bash
npm run build
npm run preview
```

The build outputs to `dist/` and copies `index.html` to `404.html` for History API deep-link support on GitHub Pages.

## Content

Edit files under `content/`:

| Path | Purpose |
|------|---------|
| `site.json` | Name, title, meta, contact |
| `navigation.json` | Nav + primary CTAs |
| `social.json` | Social links |
| `services.json` | Capabilities |
| `timeline.json` | Timeline entries |
| `experience.json` | Work history (shared with Resume) |
| `education.json` | Education (shared with Resume) |
| `skills.json` | Skills + spoken languages |
| `availability.json` | Now page structured fields |
| `pages/*.md` | Long-form pages (about, now, uses) |
| `products/*.md` | Product case studies (`_template.md` is ignored) |
| `writing/*.md` | Articles |
| `experiments/*.md` | Experiments |

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for routing, content model, themes, search, and extension guidance.

## Design (frozen)

Identity is **Product Operating System**. Implement against the constitution — no new metaphors.

| Document | Role |
|----------|------|
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Binding design constitution |
| [docs/IMPLEMENTATION_GUIDE.md](./docs/IMPLEMENTATION_GUIDE.md) | Build order, components, checklists |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Decision log (why) |
| [docs/README.md](./docs/README.md) | Full documentation index |

Historical exploration (reference only): [DESIGN_REVIEW.md](./DESIGN_REVIEW.md), [DESIGN_DIRECTIONS.md](./DESIGN_DIRECTIONS.md), [OPERATING_SYSTEM_DIRECTION.md](./OPERATING_SYSTEM_DIRECTION.md).

## Placeholders

See [TODO.md](./TODO.md) for content still required.

## Archive

The previous website is preserved at `archive/previous-site/` and is not part of the active app.
