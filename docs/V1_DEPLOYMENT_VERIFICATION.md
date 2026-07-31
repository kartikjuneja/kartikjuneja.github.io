# Version 1.0 Deployment Verification

**Date:** 2026-07-31  
**Role:** Release Engineer  
**Authority:** DESIGN_SYSTEM.md (frozen)  
**Constraint:** Verify only — no redesign, no features, no refactor

---

## Executive summary

Production build of the Product Operating System succeeds locally. **Public production does not serve this build.**

| Surface | Observed |
|---------|----------|
| `https://kartikjuneja.github.io/` | Legacy jQuery/Bootstrap site (`Anonymous Page`, gtag + jquery). Not the Vite `dist/` app (`#app` absent). Deep routes `/resume`, `/products`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg` → **404**. |
| `https://kartikjuneja.com/` | Porkbun marketplace “domain for sale” page — not this project. |
| Local `vite preview` (`127.0.0.1:4173`) | Serves current `dist/` correctly for SPA shell + assets. |

Deploy from this environment **could not be executed** (`git` / `gh` not on PATH). Live Steps 2–6 against the intended v1 host are therefore incomplete.

**Verdict: DO NOT SHIP** until the v1 `dist/` is live on the public host and live smoke / a11y / Lighthouse / console checks pass there.

---

## Deployment status

| Check | Result |
|-------|--------|
| Deploy current commit to production | **Not completed** — no `git`/`gh` available in the release-engineer shell; no GitHub Actions workflow present in the repo |
| Homepage loads (v1) | **Fail** on both public URLs (wrong content) |
| Deep links | **Fail** on github.io (404 for app paths) |
| Refresh on deep link | **Not verified on production** (requires v1 + Pages `404.html` fallback live) |
| 404 / unknown route | **Not verified on production** |
| Assets / fonts / favicon | **Fail on production** for v1 assets (legacy root HTML; favicon.svg 404). Fonts N/A for v1 |
| Manifest | **Not shipped** — no `site.webmanifest` in `public/`; not linked from `index.html`. Requesting `/site.webmanifest` on preview returns SPA HTML shell |
| `robots.txt` / `sitemap.xml` | Present in `dist/`; **absent on github.io (404)**. Files declare `https://kartikjuneja.com/...` while that domain currently sells via Porkbun |

### Manual deploy required (owner)

1. Ensure Git is available; commit/push the v1 source (or publish `dist/` per chosen Pages strategy).  
2. Configure GitHub Pages to serve the **built** site (typical: Actions build → `dist/`, or `docs/`/`gh-pages` branch containing build output — **not** the old root HTML alone).  
3. Confirm `404.html` (copy of `index.html` from postbuild) is published for History API fallback.  
4. Point `kartikjuneja.com` DNS at Pages (or update `robots.txt`/`sitemap.xml` canonical host to the live URL if `.com` remains unused).  
5. Re-run Steps 2–6 on the live URL and update this document.

---

## STEP 1 — Production build

| Check | Result | Evidence |
|-------|--------|----------|
| Clean install | **Partial pass** | `npm install` exit 0, 0 vulnerabilities. Full `node_modules` wipe blocked by locked `esbuild.exe` / rollup native binding (preview server). Install still resolved packages successfully. |
| Production build | **Pass** | `npm run build` → `tsc && vite build && node scripts/postbuild.mjs`, exit 0. 49 modules; no build errors. |
| Blocking warnings | **None observed** | Build log clean. |
| Broken imports | **None** | Typecheck + Vite bundle succeeded. |
| Missing assets in `dist/` | **Pass for shipped statics** | `index.html`, `404.html`, hashed CSS/JS under `assets/`, `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml`. |
| Routes in router | **Present** | `/`, `/about`, `/products`, `/products/:slug`, `/services`, `/timeline`, `/writing`, `/experiments`, `/uses`, `/now`, `/resume`, `/contact` (+ detail patterns). |
| Console at startup (local preview) | **Pass (automated)** | Lighthouse `errors-in-console` score 1 on `http://127.0.0.1:4173/`. |

**Manual:** Open DevTools on local preview once and confirm no red console errors on first paint (automated audit already clean).

---

## STEP 2 — Deployment verification (production)

| Check | Production | Local preview (proxy for build only) |
|-------|------------|--------------------------------------|
| Homepage | **Fail** — wrong site | **Pass** — shell 200, title Kartik Juneja, `#app` |
| Deep links | **Fail** — 404 on github.io app paths | **Pass** — all listed routes return 200 + same SPA shell |
| Refresh | **Fail / N/A** | SPA shell served for paths (preview fallback) |
| Unknown path | **Fail / N/A** | 200 + SPA shell (client 404 expected after JS) |
| CSS/JS assets | **Fail** — v1 assets not hosted | **Pass** — `/assets/index-*.css` / `*.js` 200, non-HTML |
| Fonts (Manrope via Google) | **N/A for v1** | CSS URL **200**; `fonts.googleapis.com` / `fonts.gstatic.com` origin HEAD alone 404 (expected); stylesheet fetch OK |
| Favicon | **Fail** (404) | **Pass** |
| Manifest | Not published / not linked | SPA HTML if requested |
| robots / sitemap | **Fail** (404 on github.io) | **Pass** (files present; hostnames point at `.com`) |

**Issues logged**

1. **BLOCKER:** Production github.io is still the archived previous site.  
2. **BLOCKER:** `kartikjuneja.com` is not connected to this project.  
3. **BLOCKER:** Deploy tooling unavailable in this session (`git`/`gh` missing).  
4. **Config:** Sitemap/robots canonical host is `kartikjuneja.com` while DNS is a marketplace page.  
5. **Note:** No web app manifest is part of the shipped `index.html` (acceptable if PWA not in scope; do not treat SPA HTML fallback as a valid manifest).

---

## STEP 3 — Live smoke test

### Production (`kartikjuneja.github.io` / `kartikjuneja.com`)

**Not executable for v1.** Public hosts do not serve the Product OS.

| Route | Production |
|-------|------------|
| `/` | Wrong document |
| Products, Resume, Timeline, About, Writing, Now, Uses, Contact, Services, 404 | Not the v1 app |

### Local preview (`http://127.0.0.1:4173`) — HTTP smoke only

| Route | HTTP | Notes |
|-------|------|-------|
| `/` | 200 | SPA shell |
| `/products` | 200 | |
| `/products/horsepower-financial` | 200 | |
| `/resume` | 200 | |
| `/timeline` | 200 | |
| `/about` | 200 | |
| `/writing` | 200 | |
| `/now` | 200 | |
| `/uses` | 200 | |
| `/contact` | 200 | |
| `/services` | 200 | |
| `/experiments` | 200 | |
| unknown path | 200 shell | Client not-found after boot — **manual visual check required** |

**Manual (must re-run on deployed v1 URL)**

- [ ] Each route renders expected app content (not blank / not legacy)  
- [ ] In-app navigation + `← Home`  
- [ ] Launcher (Ctrl/⌘K): open, filter, navigate, Esc  
- [ ] No broken in-content links  
- [ ] Visual check vs frozen constitution (no marketing hero regression)

---

## STEP 4 — Accessibility smoke test

### Production

**Not run** — wrong site.

### Local / code-backed (incomplete vs checklist)

| Item | Status |
|------|--------|
| Landmarks / skip link / `main` focus on navigate | Present in code (`app.ts`, RC hardening) |
| Home `h1.sr-only` + module `h2` rails | Present |
| Launcher dialog, listbox, Esc, focus trap/restore | Present |
| Reduced motion kill-switch | Present (`base.css`, `launcher.css`) |
| Contact native `required` | Present |
| Keyboard-only / Tab / Shift+Tab on **deployed** site | **Manual — not signed off** |
| Screen reader (NVDA/VO/JAWS) | **Manual — not signed off** |
| Lighthouse axe: `label-content-name-mismatch` | **Fail (local)** — Command launcher button visible text `Command` / `Ctrl K` vs `aria-label="Open command launcher"` (visible label not contained in accessible name). Impact tagged serious; rule also tagged experimental. |

**Manual checklist (deployed URL)**

- [ ] Tab order through chrome → modules → footer  
- [ ] Shift+Tab reverse  
- [ ] Esc closes launcher; focus returns to trigger  
- [ ] Screen reader: main landmark, headings, buttons, links, Contact form  
- [ ] OS reduced-motion: no distracting motion

---

## STEP 5 — Lighthouse

| Target | Result |
|--------|--------|
| Deployed production URL (v1) | **Not run** — v1 not deployed |
| Local preview `http://127.0.0.1:4173/` | Ran via `@lhci/cli` → Lighthouse **12.1.0** (desktop/headless). **Not** a production measurement. |

### Local preview category scores (LHCI / Lighthouse 12.1.0)

| Category | Score |
|----------|------:|
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### Local preview — material audit notes

| Area | Finding |
|------|---------|
| Console errors | Pass (`errors-in-console` = 1) |
| Document title / meta description / lang / viewport | Pass |
| robots.txt validity | Pass (file valid; host may be wrong for live DNS) |
| Color contrast / heading order / button-name / link-name | Pass in scored categories |
| CLS | ~0.041 in an earlier LH run |
| Render-blocking | Google Fonts stylesheet called out (est. ~340ms) — **cause:** external Manrope CSS in `index.html` |
| Accessible name (axe `label-content-name-mismatch`) | Still reported on launcher control (visible “Command” / shortcut vs `aria-label="Open command launcher"`). Experimental; did not reduce the LH 12.1 Accessibility category score to below 100 in this run |
| PWA installability | Fail — no manifest (expected; PWA not shipped; outside SEO category) |

**After deploy:** Re-run Lighthouse on the live HTTPS URL and replace these local scores. Treat production HTTPS + real CDN/fonts latency as the release measurement.

---

## STEP 6 — Production console

| Check | Production v1 | Local preview (Lighthouse) |
|-------|---------------|----------------------------|
| Runtime errors | **Not verified** (wrong site) | No console errors logged |
| Failed network requests | Legacy site only | Core assets 200; font CSS 200 |
| Hydration warnings | N/A (not React SSR) | N/A |
| Missing resources | v1 assets missing publicly | None for linked assets |
| Unexpected layout shift | Not measured live | CLS ~0.041 local |

**Manual on deployed v1:** DevTools → Console + Network on `/`, `/products`, `/resume`, `/contact`, open launcher.

---

## STEP 7 — Final constitution audit

Review against DESIGN_SYSTEM.md only for **objective** conformance of the **built local app** (not live production).

| Law | Result |
|-----|--------|
| Product Operating System / Module Rail Grid home | **Conforms** — `HomeGrid` + `ModuleShell`; no marketing hero |
| Home budget / Remove Before Add | **Conforms** — Notes omitted when empty; P0–P2 set without P3 Build Log |
| Dark-first tokens; Manrope UI; no glass/neon/purple brand system | **Conforms** (code/styles) |
| Lists over cards; chrome continuity; app `← Home` | **Conforms** |
| Launcher Ctrl/⌘K | **Conforms** |
| A11y always: skip, landmarks, focus, reduced motion | **Mostly conforms**; one objective name-mismatch on launcher control (see Step 4) |
| Content honesty | **Conforms** — sparse / “Not published.” where unverified |

**Statement:** The local implementation conforms to DESIGN_SYSTEM.md for identity, composition, and home rules. One objective accessibility mismatch exists on the launcher control’s accessible name vs visible label. **Live production does not implement this constitution** because it still serves the previous site.

---

## Remaining issues

| ID | Severity | Issue |
|----|----------|-------|
| R1 | **Blocker** | v1 `dist/` not published to GitHub Pages |
| R2 | **Blocker** | `kartikjuneja.com` not serving this site (Porkbun sale page) |
| R3 | **Blocker** | Deploy could not be performed in this environment (`git`/`gh` unavailable) |
| R4 | High (process) | Live smoke, keyboard, screen reader, production console, production Lighthouse not signed off |
| R5 | Med (a11y) | Launcher button `aria-label` does not include visible “Command” text |
| R6 | Med (SEO/host) | `robots.txt` / `sitemap.xml` point at `kartikjuneja.com` while DNS is wrong |
| R7 | Low | No web manifest (only relevant if PWA claimed) |
| R8 | Low | Google Fonts render-blocking; optional self-host later |
| R9 | Low | Production source maps present in `dist/assets/*.map` |

---

## Release recommendation

Do **not** announce or cut over the public homepage to v1.0 until R1–R2 are fixed and Steps 2–6 are re-verified on the live URL.

Local engineering build quality is sufficient to **attempt** deploy; **publication safety is not verified**.

---

## DO NOT SHIP

**Minimum evidence:** `https://kartikjuneja.github.io/` still serves the legacy site (not Vite `#app`), deep v1 routes 404, and `https://kartikjuneja.com/` is a domain-for-sale page — so version 1.0 is not what the public receives.
