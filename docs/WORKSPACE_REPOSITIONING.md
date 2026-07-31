# Workspace Repositioning

**Status:** Planning — not implemented  
**Date:** 2026-08-01  
**Type:** Product repositioning (narrative + IA + content model)  
**Not:** Visual redesign · not an internal tools platform  

**Preserved:** Static Vite + TypeScript site, GitHub Pages, Markdown/JSON content, Module Rail Grid, command palette, search, accessibility, responsive layout, performance  

**Companions:** [CONTENT_MODEL_V2.md](./CONTENT_MODEL_V2.md) · [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md)  
**Supersedes:** Studio-brand drafts; any CMS/admin roadmap for this repo

---

## Repository scope (locked)

This repository builds **one thing only**:

> **The public website of Kartik Juneja.**

It documents:

- software products  
- professional case studies  
- engineering knowledge  
- personal background  

**Nothing else.**

### Out of scope — do not add to this repo

The following are **separate product ideas**. They are **not** on the roadmap. Do not reference them, stub them, or leave “future adapter” hooks in planning for this site:

- Local CMS / admin dashboard  
- PIN, password, or any authentication  
- Project registry  
- Builder Console  
- Deployment / infrastructure / secret / operations management  
- Studio management  
- Any internal tooling  

Content is edited as **files in git** (Markdown + JSON).

---

## Identity

The site is the **public workspace of Kartik Juneja**.

| It is | It is not |
|-------|-----------|
| A public workspace documenting products and engineering | A resume-first surface |
| Product-centered narrative | A generic portfolio template |
| Personal brand: Kartik Juneja | An agency, software studio, or SaaS product |

**Visitor takeaway (pass):**  
“Kartik builds software products and documents how they evolve.”

**Visitor takeaway (fail):**  
“Kartik is a Senior Software Engineer.” (as the whole story)

Products are the **centerpiece**. The person provides **context**.

**Core narrative:**  
I build software products, explore ideas, and document what I learn along the way.

---

## Information architecture (frozen)

### Primary navigation — exactly five

| Label | Route | Role |
|-------|-------|------|
| Home | `/` | Workspace overview |
| Products | `/products` | All product-shaped work (see types below) |
| Knowledge | `/knowledge` | Engineering writing and learning |
| About | `/about` | Story, philosophy, experience, resume, focus, uses |
| Contact | `/contact` | Inquiry |

**No additional top-level navigation.**

### Not primary nav (absorbed or removed)

| Former | Disposition |
|--------|-------------|
| Resume, Timeline, Uses, Now | Under **About** only — no standalone primary pages |
| Writing / Notes / Experiments | Under **Knowledge** or Products (Research) as appropriate |
| Services | Not primary; deprecate from IA |
| Work (interim name) | Use **Products** as the public label |
| Lab | Optional label for Research items — not a sixth nav item |

---

## Homepage

Workspace overview — not a landing page, hero site, or resume.

Module Rail Grid **kept**; change composition and copy only.

Suggested blocks:

1. **Intro** — one sentence on what Kartik builds  
2. **Now building** — one featured product (or honest empty)  
3. **Selected products** — independent + professional; ownership/type as metadata  
4. **Knowledge** — recent notes/articles (omit if empty)  
5. **About** — short intro, resume link into About, focus  

---

## Products

Centerpiece of the site. One **Products** section; items may be typed as:

| Type | Meaning |
|------|---------|
| Independent Product | Personally owned / indie builds |
| Professional Case Study | Employment/client delivery; **employer/client context required**; never imply ownership of employer products |
| Research | Exploration without overclaiming maturity |
| Archived | Stopped; retained for history |

**Horsepower Financial** = Professional Case Study only (employer context clear).

Shared fields as needed for public pages (title, status, summary, problem, solution, architecture, technology, timeline, lessons, links, etc.). Missing sections stay unpublished — never fabricate.

---

## Knowledge

Single section merging:

- Articles  
- Engineering Notes  
- Architecture  
- Lessons Learned  
- Decision write-ups  

Searchable (client-side over static content). Honest empty state if none published.

---

## About

Contains:

- Story  
- Engineering philosophy  
- Experience  
- Resume (supporting — not the site’s job)  
- Current focus  
- Uses  

No standalone Resume / Timeline / Uses / Now **top-level apps** in the product IA.

---

## Success criteria

| Pass | Fail |
|------|------|
| Repo clearly = public website only | CMS/admin/tooling creep returns |
| Five primary nav items | Resume/Services back in top nav |
| Products centerpiece; Horsepower correctly labeled | Employer work presented as indie |
| Knowledge merged | Parallel Writing + Notes apps |
| About holds person context | Interactive-resume homepage |

---

## Constitution note

`DESIGN_SYSTEM.md` still governs visual/interaction law (Module Rail Grid, tokens, a11y). This document governs **product purpose and IA**. Implementation should amend DESIGN_SYSTEM §0 (north star / home priorities) to match the public workspace narrative — without reopening aesthetics.
