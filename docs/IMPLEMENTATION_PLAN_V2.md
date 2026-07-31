# Implementation Plan V2

**Status:** Planning — not implemented  
**Date:** 2026-08-01  
**Authority:** [WORKSPACE_REPOSITIONING.md](./WORKSPACE_REPOSITIONING.md) · [CONTENT_MODEL_V2.md](./CONTENT_MODEL_V2.md)  
**Supersedes:** [MIGRATION_PLAN_V2.md](./MIGRATION_PLAN_V2.md) (CMS-era), studio implementation plans  

**Rule:** Public website only. No CMS, admin, auth, or internal tooling in any phase.

---

## Phases (frozen)

| Phase | Focus |
|-------|--------|
| **1** | Content model · navigation · routing |
| **2** | Homepage narrative |
| **3** | Products |
| **4** | Knowledge |
| **5** | About |
| **6** | Accessibility · performance · release |

Do not start UI narrative work before Phase 1 content/routes/nav are in place. Do not add tooling projects in Phase 6.

---

## Phase 1 — Content model, navigation, routing

**Goals**

- Create V2 `content/` tree (`home`, `products`, `case-studies`, `knowledge`, `about`, `site`)  
- Move Horsepower → `case-studies/` with professional + employer metadata  
- Rewrite `site/navigation.json` to five items: Home, Products, Knowledge, About, Contact  
- Update loaders (`src/content/*`)  
- Update `src/router/routes.ts` + redirects from old paths  
- Update launcher index to match  

**Exit:** Build green; nav frozen; Horsepower not in independent set.

---

## Phase 2 — Homepage narrative

**Goals**

- Compose home from `homepage.json`: Intro · Now building · Selected products · Knowledge · About compact  
- Remove resume/availability/timeline-first home modules  

**Exit:** Identity test — products/workspace, not interactive resume.

---

## Phase 3 — Products

**Goals**

- `/products` lists independent, professional, research, archived with clear labels  
- `/products/:slug` shared detail; omit unpublished sections  
- Professional case studies show employer/client context  

**Exit:** Centerpiece works; ownership never implied for employer products.

---

## Phase 4 — Knowledge

**Goals**

- `/knowledge` merges articles, notes, architecture, lessons, decisions  
- Detail routes + client-side search  

**Exit:** One knowledge surface; honest empty state.

---

## Phase 5 — About

**Goals**

- Single About page: story, philosophy, experience, resume, focus, uses  
- Redirects from old resume/uses/now/timeline routes to anchors  

**Exit:** Person context supports products; resume not a top-level product.

---

## Phase 6 — Accessibility, performance, release

**Goals**

- Keyboard/AT smoke, Lighthouse on **deployed** public URL  
- No console/network failures on production host  
- Confirm GitHub Pages serves this site (prior deploy gap still applies)  
- Constitution amendment for north-star copy if not done in Phase 1 docs  

**Exit:** Ready-to-ship checklist for the **website** only — see also historical `V1_DEPLOYMENT_VERIFICATION.md` patterns.

**Not in Phase 6:** CMS, admin, auth, registries, deploy consoles, secret managers.

---

## Breaking changes (summary)

- IA: Products + Knowledge replace sprawling primary nav  
- Standalone resume/timeline/uses/now/services apps removed from product IA  
- Content tree nested under V2 folders  
- Horsepower taxonomy: case study only  

## Major code touchpoints

`content/**` · `src/content/**` · `src/router/routes.ts` · `src/pages/*` · environment/launcher nav · SEO helpers  

Visual system (tokens, Module Rail Grid, chrome) **preserved**.

---

## Explicit non-goals

- Local CMS / admin / editors  
- Authentication of any kind  
- Project registry, builder console, ops/deploy/secret tooling  
- Studio or company brand  
- Fabricated products or knowledge  

---

## Start criteria

1. WORKSPACE_REPOSITIONING accepted  
2. CONTENT_MODEL_V2 accepted  
3. This plan accepted  
4. `nowBuilding` slug real or explicitly `null`  
5. No CMS/admin tickets filed against this repo
