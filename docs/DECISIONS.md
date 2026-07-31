# Design & Architecture Decisions

**Purpose:** Record *why* major decisions were made so future work does not reopen settled questions.  
**Constitution:** [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) (frozen)  
**Index:** [README.md](./README.md)

Amendments to the constitution require a new dated entry here.

---

## Decision log

### D001 — Rebuild as a static website engine, not an in-place restyle
**Date:** 2026-07-31  
**Decision:** Archive the previous site under `archive/previous-site/` and build a new Vite + TypeScript static app at repo root.  
**Why:** The old site was a jQuery/Bootstrap personal page; the goal is a long-lived content-driven product surface. In-place restyling could not carry the architecture.  
**Alternatives rejected:** Modify `index.html` in place; adopt a heavy framework/SSR stack.  
**Refs:** `ARCHITECTURE.md`, archive

---

### D002 — Client-side History API router + `404.html` fallback
**Date:** 2026-07-31  
**Decision:** SPA-style client router with GitHub Pages `404.html` = `index.html` copy; no hash routing.  
**Why:** Modern URLs and app-mode navigation while remaining fully static on GitHub Pages.  
**Alternatives rejected:** Multi-page HTML per route; hash routing.  
**Refs:** `ARCHITECTURE.md`, `scripts/postbuild.mjs`

---

### D003 — Content model: JSON for structure, Markdown for long-form
**Date:** 2026-07-31  
**Decision:** Structured data in JSON; narrative/case studies/pages in Markdown with frontmatter.  
**Why:** Appropriate format per content type; UI stays content-driven; products/writing scale as files.  
**Alternatives rejected:** Everything in JSON; everything hardcoded in components; a CMS.  
**Refs:** `ARCHITECTURE.md`, `content/`

---

### D004 — No invented products; template only
**Date:** 2026-07-31  
**Decision:** Ship `content/products/_template.md` only; Products empty state until real files exist. Do not seed fake products.  
**Why:** Content honesty; credibility for recruiters/clients.  
**Alternatives rejected:** Placeholder product pages with guessed case studies.  
**Refs:** user approval, `TODO.md`

---

### D005 — No analytics in v1
**Date:** 2026-07-31  
**Decision:** Remove Google Analytics; do not add tracking scripts.  
**Why:** Explicit product decision for v1 privacy/simplicity.  
**Refs:** user approval

---

### D006 — About bio not migrated from old casual copy
**Date:** 2026-07-31  
**Decision:** Professional placeholder until rewritten by owner.  
**Why:** Old tone did not match premium product positioning; no invented rewrite.  
**Refs:** user approval

---

### D007 — Reject current UI as final identity (design review)
**Date:** 2026-07-31  
**Decision:** Treat first UI pass as architecturally useful but visually template-like; stop iterating that homepage as the identity.  
**Why:** Design review scored experience below premium product bar; identity problem, not engineering.  
**Refs:** `DESIGN_REVIEW.md`

---

### D008 — Explore multiple directions before locking identity
**Date:** 2026-07-31  
**Decision:** Produce radically different concepts (Atelier, Spec Archive, Field Notes, Signal Desk, Continuum, Instrument) before choosing.  
**Why:** Avoid local maxima of “restyle the template.”  
**Refs:** `DESIGN_DIRECTIONS.md`

---

### D009 — Evaluate Product Operating System as additional direction
**Date:** 2026-07-31  
**Decision:** Explore POS as home-screen modules / apps — not dashboard, gallery, or docs.  
**Why:** Needed an environment metaphor that scales for years and maps cleanly to content types + Ctrl+K.  
**Refs:** `OPERATING_SYSTEM_DIRECTION.md`

---

### D010 — Adopt Product Operating System as north-star identity
**Date:** 2026-07-31  
**Decision:** POS is the approved visual/experiential identity.  
**Why (criteria, not taste):**
- Best long-term **scalability** (enrich modules / add apps)
- Strong **memorability** (“site as OS for product work”)
- **Product-first** (Products module + Products app)
- Better everyday **recruiter/client paths** than Atelier alone
- Fits existing engine (routes, content, launcher)

**Alternatives not chosen as north star:**
| Direction | Why not primary |
|-----------|-----------------|
| Product Atelier | Excellent craft metaphor; less natural multi-module evolution |
| Instrument | Extreme reduction; thinner home storytelling; high execution risk |
| Spec Archive | Strong scannability; colder “docs” identity as whole-site myth |
| Signal Desk | Ops clarity; higher dashboard-cliché risk |
| Continuum / Field Notes | Strong specials; weaker permanent product-OS center |

**Borrow only (not identity):** Instrument reduction discipline; Spec list precision inside modules; Atelier empty-state intentionality.  
**Refs:** `OPERATING_SYSTEM_DIRECTION.md`, user approval

---

### D011 — Unique signature = Module Rail Grid
**Date:** 2026-07-31  
**Decision:** Screenshot identity = environment top bar + identical hairline module header rails + 12-col home grid with aligned baselines.  
**Why:** Identity from composition; forbidden to rely on gradients/glass/neon/gallery/dashboard chrome.  
**Refs:** `DESIGN_SYSTEM.md` §2

---

### D012 — Freeze constitution with anti-creep amendments
**Date:** 2026-07-31  
**Decision:** Amend and freeze `DESIGN_SYSTEM.md` with Remove Before Add, Module Priority (P0–P3), Home Screen Budget, Definition of Done, and Composition Law.  
**Why:** Prevent dashboard sprawl and feature creep during implementation and future years.  
**Refs:** `DESIGN_SYSTEM.md` §16–§23, user final amendments

---

### D013 — Planning documents retained in repo
**Date:** 2026-07-31  
**Decision:** Keep review, exploration, OS brief, constitution, implementation guide, and this decision log under version control; catalogued in `docs/`.  
**Why:** Future contributors must know *what was rejected* and *why*, not only the final rules.  
**Refs:** `docs/README.md`

---

## How to amend

1. Propose change against a failed real criterion (Done, accessibility, budget) — not preference.  
2. Update `DESIGN_SYSTEM.md` explicitly.  
3. Add a dated `Dxxx` entry here with decision, why, alternatives rejected.  
4. Do not silently reinterpret the OS metaphor.

---

**End of decision log.**
