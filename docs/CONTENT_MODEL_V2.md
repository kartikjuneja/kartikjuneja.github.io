# Content Model V2

**Status:** Planning — not implemented  
**Date:** 2026-08-01  
**Authority:** [WORKSPACE_REPOSITIONING.md](./WORKSPACE_REPOSITIONING.md)  
**Scope:** Content for the **public website only**. No CMS, admin, editor, or tooling schemas.

---

## Principles

1. Files under `content/` are the only content source of truth.  
2. Edit via git (Markdown + JSON).  
3. Never fabricate products, counts, or sections.  
4. Professional case studies always carry employer/client context.  
5. Keep the tree small and obvious.

---

## Folder structure

```
content/
  home/
    homepage.json           # Intro, featured slug, selected product refs, knowledge preview limits

  products/                 # Independent + Research + Archived (non-professional)
    _template.md
    {slug}.md

  case-studies/             # Professional case studies only
    _template.md
    horsepower-financial.md

  knowledge/
    articles/
    notes/
    architecture/
    decisions/              # optional; or use kind/tags in frontmatter instead of extra folders
    # lessons may be a kind/tag on any knowledge file

  about/
    story.md
    philosophy.md
    experience.json
    education.json
    skills.json
    resume.json             # presentation / section config for resume block
    focus.md                # current focus (replaces Now page)
    uses.md

  site/
    navigation.json         # exactly five primary items
    settings.json           # name, domain, meta, email, location
    social.json
```

No `admin/`, no CMS config trees, no editor schemas in `content/`.

### Type vs folder

| Product type | Location | Required metadata |
|--------------|----------|-------------------|
| Independent Product | `products/` | `type: independent` (or default for this folder) |
| Research | `products/` | `type: research` |
| Archived | `products/` or `case-studies/` | `status: archived` (and keep original type) |
| Professional Case Study | `case-studies/` | `type: professional`, `employer` (or client) required |

---

## Product / case-study schema (public)

Frontmatter (conceptual):

| Field | Notes |
|-------|--------|
| `slug`, `title`, `summary` | Required for listing |
| `type` | `independent` \| `professional` \| `research` |
| `status` | e.g. Production · Beta · Alpha · Research · Archived — only when true |
| `employer` / `client` | Required when `professional` |
| `featured`, `homeOrder` | Home selection |
| `technology`, `timeline`, `links` | Optional |
| `repository`, `demo` | Optional |

Body headings when published (omit if unpublished): Problem, Solution, Architecture, Technology, Timeline, Lessons Learned, Roadmap, Screenshots, etc.

**Horsepower:** only under `case-studies/`, `type: professional`, employer set, copy does not imply personal ownership.

---

## Home — `home/homepage.json`

- `intro` (one sentence)  
- `nowBuilding.slug` → existing product/case-study slug or `null`  
- `selected` — manual slugs and/or “featured first” rules  
- `knowledgePreview.limit`  

No fake featured item if slug is null.

---

## Knowledge

Markdown under `knowledge/**` with `slug`, `title`, optional `date`, `tags`, `kind` (article | note | architecture | decision | lesson).

Public routes load all published entries; **search** indexes title/summary/tags/excerpts client-side.

---

## About

Assembled from `about/*` into one page (anchors for resume, focus, uses, etc.).

---

## Site

### `navigation.json`

Primary (frozen):

1. Home → `/`  
2. Products → `/products`  
3. Knowledge → `/knowledge`  
4. About → `/about`  
5. Contact → `/contact`  

### `settings.json`

Personal brand + SEO (Kartik Juneja) — not a company entity.

---

## Routing

| Route | Source |
|-------|--------|
| `/` | `home/homepage.json` + resolved refs |
| `/products` | `products/` + `case-studies/` (filters by type) |
| `/products/:slug` | Either tree (unique slugs globally) |
| `/knowledge` | `knowledge/**` + search |
| `/knowledge/:slug` | Single knowledge file |
| `/about` | `about/**` |
| `/contact` | settings + form |

### Redirects from old IA

| Old | New |
|-----|-----|
| `/work`, `/work/:slug` | `/products`, `/products/:slug` |
| `/writing`, `/writing/:slug` | `/knowledge`, `/knowledge/:slug` |
| `/resume` | `/about#resume` |
| `/timeline` | `/about` |
| `/uses` | `/about#uses` |
| `/now` | `/about#focus` |
| `/experiments` | `/products` (research filter) or specific slug |
| `/services` | remove or soft-land on `/about` / `/contact` |

---

## Deprecated current paths (migrate then remove)

Root-level `content/site.json`, `navigation.json`, `products/` (move horsepower to case-studies), `pages/`, `writing/`, `experiments/`, `timeline.json`, `services.json`, `availability.json` as active IA — see [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md).

---

## Invariants

1. Primary nav length === 5.  
2. No independent listing of Horsepower.  
3. Empty collections render empty — no filler content.  
4. This model describes the **website** only.
