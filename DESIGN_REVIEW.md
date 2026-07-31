# Design Review

**Subject:** kartikjuneja.com static website engine (v1 foundation)  
**Reviewer stance:** Senior product designer, pre-launch quality gate  
**Date:** 2026-07-31  
**Constraint:** Audit only — no implementation in this pass

---

## 1. Executive summary

The engineering architecture is clean and credible. The **visual and product experience is not yet at the bar** of a premium software product.

What exists today reads as a well-structured **dark personal-site template**: sticky blur header, serif display name, pill nav, bordered cards, dashed empty states, and repeated “Coming Soon” copy. It is competent. It is not memorable. It does not yet convince a recruiter, client, or peer developer that this is a product built with exceptional taste.

The largest gap is not polish on buttons — it is **information density vs. information architecture**. The site exposes ~11 destinations while most surfaces are structurally empty. Premium products feel intentional when sparse; unfinished products feel hollow. Right now the site feels hollow.

The homepage fails the core communication test: name is clear, role is present as an eyebrow, but **what you build and why to continue** are placeholders. Without that narrative, craft in the chrome cannot carry the experience.

**Launch readiness as a premium product site: not yet.**

---

## 2. Overall score

| Dimension | Score | Notes |
|-----------|------:|-------|
| Architecture / maintainability | 8.5 / 10 | Strong foundation |
| Visual design / craft | 4.5 / 10 | Tasteful defaults, template-like |
| Information architecture | 4.0 / 10 | Overbuilt relative to content |
| Homepage narrative | 2.5 / 10 | Identity without proposition |
| Interaction quality | 5.0 / 10 | Functional, flat |
| Accessibility | 5.5 / 10 | Basics present; palette/menu gaps |
| Responsiveness | 5.0 / 10 | Collapses; few true redesigns |
| SEO / performance posture | 5.5 / 10 | Shell SEO + eager content cost |
| Empty-state / unfinished UX | 3.5 / 10 | Feels broken, not curated |
| **Overall (premium product bar)** | **4.8 / 10** | Solid scaffold, weak product feel |

---

## 3. Biggest strengths

1. **Clear design-token and theme separation** — colors/type/space are centralized; dark-first is intentional.
2. **Typography pairing has character** — Instrument Serif + Manrope avoids Inter/Roboto defaults and signals some taste.
3. **Content/engine separation** — pages compose from content; this is the right long-term model.
4. **Skip link, `lang`, focus-visible tokens, reduced-motion** — accessibility is not ignored.
5. **Command palette as a product affordance** — Ctrl+K is the right *kind* of interaction for a product-like site.
6. **Resume print path and shared content model** — conceptually strong for ATS/print later.
7. **No analytics / no gimmicks** — restraint matches the brief.

---

## 4. Biggest weaknesses

1. **Homepage does not explain the product of “you.”** Name + “Coming Soon” is not a premium first impression.
2. **IA is a full magazine; content is a pamphlet.** Too many routes advertise emptiness.
3. **Visual language is template-adjacent:** pills, bordered cards, blur header, soft radial hero, dashed empties.
4. **Hero is not a composition** — it is a left text stack inset inside `<main>` padding, not a product-grade first viewport.
5. **Empty states expose implementation** (“Add a Markdown file…”, “There is no backend”, “Single source of truth”).
6. **Interaction design is commodity** — `translateY(-1px)` and background tint everywhere.
7. **No visual system for craft** — no imagery, iconography, product frames, or signature layout motif; only type and boxes.
8. **Light theme drifts toward warm cream** — close to a common AI-design cluster and at odds with a sharp product brand.

---

## 5. Issues found

Severity key: **Critical** · **High** · **Medium** · **Low**

---

### IA-01 — Information architecture exceeds available content
**Severity:** Critical  

**Why it matters:** Visitors open Writing, Experiments, Uses, Products, Services and repeatedly hit emptiness. Trust collapses. Premium sites hide unfinished rooms; they do not tour them.

**Recommended solution:**  
- Define a **v1 public IA** of 5–6 destinations max (e.g. Home, About, Work/Timeline, Resume, Contact, Now).  
- Keep other routes built, but **de-emphasize or gate** in nav/footer until content exists.  
- Footer should not dump all 11 links as peer equals.

**Expected impact:** Site feels curated and intentional instead of incomplete.

---

### HOME-01 — Homepage fails “who / what / why continue”
**Severity:** Critical  

**Why it matters:** First viewport currently communicates: name, job title eyebrow, “Coming Soon” summary/focus, location, email, three CTAs. Recruiters don’t learn specialization. Clients don’t learn offer. Developers don’t learn craft.

**Recommended solution:**  
- Require real `summary` + `currentFocus` before calling v1 “designed.”  
- Restructure hero copy hierarchy: **Name (brand) → one sharp proposition → one proof line → CTAs**.  
- Replace “Explore Work” when products are empty with a CTA that leads to **proof that exists** (Resume / Timeline / Contact).

**Expected impact:** Immediate comprehension; lower bounce; stronger brand.

---

### HOME-02 — Hero is not a first-viewport composition
**Severity:** Critical  

**Why it matters:** Premium product sites treat the first screen as one designed surface. Here, `.main { padding-block }` wraps the hero, so the “hero” is a padded block under the header — not edge-to-edge atmosphere. Max-width ~48rem left stack reads as generic personal landing.

**Recommended solution:**  
- Pull hero **outside** main content padding (full-bleed band under header).  
- Design one composition: brand, one headline, one sentence, CTA group, and a **dominant visual plane** (abstract product grid, work frame, or crafted graphic — not stock).  
- Avoid stacking meta email/location as primary hero furniture; demote to secondary.

**Expected impact:** First impression shifts from “template” to “product.”

---

### HOME-03 — Primary CTA leads into an empty Products page
**Severity:** Critical  

**Why it matters:** “Explore Work” → empty state with CMS instructions is a broken funnel.

**Recommended solution:** Until products exist, primary CTA → Resume or Timeline (real proof). Secondary → Contact. Keep Products in IA but not as the hero promise.

**Expected impact:** CTAs feel honest; conversion paths work.

---

### EMPTY-01 — Empty states feel broken, not designed
**Severity:** Critical  

**Why it matters:** Dashed borders + centered “No products yet” + developer instructions look like staging, not product UX. Services shows seven cards all labeled “Coming Soon” — actively damaging.

**Recommended solution:**  
- **Curated sparse states:** short editorial line + single next action (e.g. “Case studies in progress — see experience” + link).  
- Never show file-path / Markdown / backend implementation language to end users.  
- For Services: do not render a grid of hollow cards; show a compact list or a single “Capabilities — details soon” panel until copy exists.  
- Prefer fewer finished modules over many stub modules.

**Expected impact:** Unfinished areas feel confident and temporary, not defective.

---

### VIS-01 — Overall look is template-like
**Severity:** High  

**Why it matters:** Sticky frosted header, pill nav, pill buttons, pill tags, rounded cards with 1px borders, soft dual radial hero glow, noise overlay — this is the current “modern dark SaaS personal site” starter kit. Distinctive engines need distinctive surfaces.

**Recommended solution:**  
- Pick **one signature layout motif** (editorial split, strict modular grid, typographic poster hero, etc.) and apply consistently.  
- Reduce pill radius on buttons/nav; use sharper or more deliberate radii.  
- Default to **fewer borders**; separate with typography, rules, and spacing.  
- Reserve cards for interactive collections only (per product brief).  
- Replace noise+purple-tinted glow with a more original atmosphere tied to brand.

**Expected impact:** Recognizable visual identity; less “generated site” smell.

---

### VIS-02 — Card-first UI contradicts premium minimal direction
**Severity:** High  

**Why it matters:** Feature cards, project cards, availability card, callouts, stats, empty states — almost every content unit is a bordered rounded rectangle. That flattens hierarchy and feels dashboard/portfolio.

**Recommended solution:**  
- Services/capabilities as typographic list or definition layout.  
- Timeline already non-card — extend that language.  
- Project presentation as rows or media+text modules when products exist.  
- Use cards only when the whole unit is clickable / selectable.

**Expected impact:** Calmer, more expensive-looking pages.

---

### VIS-03 — Accent color is underpowered; secondary purple leaks in
**Severity:** High  

**Why it matters:** Steel accent (`#8eb6c4`) is tasteful but nearly camouflage — the UI feels monochrome-gray. Hero gradient also mixes `#7a8cff`, which reintroduces the purple bias the brief wanted to avoid.

**Recommended solution:**  
- Commit to one accent with clearer agency (still restrained, but decisive on links/CTAs/focus).  
- Remove purple from gradients.  
- Use accent sparingly on **one** primary action + focus + key labels — not on every eyebrow.

**Expected impact:** Stronger brand memory; cleaner palette discipline.

---

### VIS-04 — Light theme approaches the “warm cream” cluster
**Severity:** Medium  

**Why it matters:** `#f6f4ef` / `#efece4` is close to the cream editorial look called out as an AI-design cliché. Dark is default, but theme toggle advertises this surface.

**Recommended solution:** Restyle light mode as cool paper / precise light product UI (neutral gray-white, not parchment), or defer light mode until dark is excellent.

**Expected impact:** Theme system supports brand instead of diluting it.

---

### TYPE-01 — Display type is asked to carry empty meaning
**Severity:** High  

**Why it matters:** Huge serif name with no supporting proposition creates **empty monumentality** — loud but vacant. Scale without content reads as decoration.

**Recommended solution:**  
- Keep brand-sized name only when paired with a finished one-liner.  
- Tighten hero type scale until copy exists, or introduce a real subhead.  
- Audit section titles (`--text-3xl`) on thin pages — large H2 over a dashed empty box looks awkward.

**Expected impact:** Typography feels purposeful, not performative.

---

### TYPE-02 — Weak typographic hierarchy beyond hero
**Severity:** Medium  

**Why it matters:** Body is almost entirely muted gray. Headings are serif; everything else is similar weight/size. Eyebrows are overused (About / Experience / Education / Languages / Work / Engage…), so the accent uppercase label stops meaning anything.

**Recommended solution:**  
- Use eyebrows rarely (page-level only).  
- Increase contrast between title, deck, and body.  
- Establish a strict type ramp for UI vs. prose vs. display.

**Expected impact:** Faster scanning; clearer section purpose.

---

### SPACE-01 — Nested spacing creates uneven rhythm
**Severity:** High  

**Why it matters:** Home wraps `hero` + `.shell.page` inside another `.page`, inside `.main` with large block padding. Result: inconsistent vertical rhythm, hero inset, and large empty bands on content-light pages. Feels both cramped (nav) and sparse (body).

**Recommended solution:**  
- One page frame system: `chrome → optional full-bleed → content shell`.  
- Standardize section spacing tokens (e.g. tight/regular/loose) and ban double-wrapping the same `.page` gap.  
- Tune spacing to content density (sparse content → less monumental padding).

**Expected impact:** Cohesive rhythm; premium “measured” whitespace.

---

### SPACE-02 — No real grid system
**Severity:** Medium  

**Why it matters:** Layout is mostly single column + `auto-fit` card grids. There is no editorial grid, no intentional asymmetric compositions, no shared column rules between About/Resume/Contact.

**Recommended solution:** Introduce a simple 12-col or content+rail grid for desktop; use it for About, Resume, Contact, case studies.

**Expected impact:** Pages feel designed as a system, not stacked sections.

---

### NAV-01 — Primary nav is incomplete and inconsistent with IA
**Severity:** High  

**Why it matters:** Desktop nav shows a subset (Home, About, Products, Services, Writing, Now, Contact) while Timeline, Resume, Experiments, Uses live only in mobile/footer/palette. Resume is a primary audience need and is hidden from desktop nav. Mental model fractures.

**Recommended solution:**  
- Design nav around **audience jobs**, not file list.  
- Example v1: Work, About, Writing (if live), Now, Contact — with Resume as header action.  
- Ensure desktop/mobile/footer/palette share one prioritized map.

**Expected impact:** Wayfinding confidence; better recruiter paths.

---

### NAV-02 — Footer is a sitemap dump
**Severity:** Medium  

**Why it matters:** Listing every route + every social network equally creates noise. Seven social links compete with product intent (LinkedIn/GitHub matter more for this audience than Pinterest/Facebook).

**Recommended solution:** Prioritize 2–3 professional links; collapse or omit low-intent networks. Footer columns should reflect product IA, not completeness.

**Expected impact:** Stronger professional signal; less clutter.

---

### NAV-03 — `aria-current` is exact-path only
**Severity:** Low  

**Why it matters:** `/products/:slug` won’t mark Products as current; users lose orientation.

**Recommended solution:** Prefix matching for section roots.

**Expected impact:** Clearer location awareness.

---

### IX-01 — Interactions feel flat / commodity
**Severity:** High  

**Why it matters:** Buttons and cards share the same micro-lift hover. No press/active depth, no deliberate focus choreography, no link affordances beyond underline on some links. Premium products feel physically considered.

**Recommended solution:**  
- Differentiate hover by component type (nav ≠ card ≠ primary button).  
- Add `:active` compression, clearer primary/secondary/tertiary rules.  
- Prefer border/contrast changes over generic float.  
- Motion only where it aids comprehension (palette, menus).

**Expected impact:** Interface feels responsive and crafted.

---

### IX-02 — Header action icons are unfinished
**Severity:** Medium  

**Why it matters:** Literal “Ctrl K”, “◐”, “☰” look like placeholders. On Mac, Ctrl labeling is wrong; on Windows, “Ctrl K” as a fat pill is clumsy.

**Recommended solution:** Proper icon set (search, sun/moon, menu), platform-aware shortcut hint, consistent hit targets (44px) with tooltips.

**Expected impact:** Chrome feels shipped, not mocked.

---

### IX-03 — Command palette accessibility incomplete
**Severity:** High  

**Why it matters:** Dialog lacks focus trap, `aria-activedescendant` (or roving tabindex), return-focus on close, and body scroll lock. Listbox/option wiring is partial. This is a flagship interaction — it must be excellent.

**Recommended solution:** Implement modal a11y pattern fully; visible selected state + screen reader announcements; optional recent pages.

**Expected impact:** Palette becomes a trustworthy product feature.

---

### IX-04 — Mobile menu is a long link list
**Severity:** Medium  

**Why it matters:** Eleven stacked links with no grouping, no overlay, no close-on-escape specificity beyond global palette escape. Feels like a sitemap accordion, not a mobile product menu.

**Recommended solution:** Group by intent (Work / Presence / Contact); overlay drawer; focus trap; fewer items.

**Expected impact:** Usable mobile IA.

---

### IX-05 — No loading / route-transition feedback
**Severity:** Low  

**Why it matters:** Dynamic imports can flash empty `main`. Premium apps avoid uncertain blank states.

**Recommended solution:** Instant shell skeleton or top progress tick; keep subtle.

**Expected impact:** Perceived performance and polish.

---

### CONTENT-01 — Placeholder string strategy is blunt
**Severity:** High  

**Why it matters:** Raw “Coming Soon” repeated across hero, services, availability, timeline project blurbs, resume projects, and forms trains users to skim past everything. It also appears in composed mailto body defaults.

**Recommended solution:**  
- Distinguish **missing narrative** (hide module) vs **known pending** (one polished line).  
- Never repeat identical placeholder in a grid.  
- Hero must not ship with “Coming Soon” visible.

**Expected impact:** Placeholders feel designed; site feels alive.

---

### CONTENT-02 — Implementation details leak into UI copy
**Severity:** High  

**Why it matters:** Examples: empty-state Markdown path instructions; Contact “There is no backend”; Resume “Single source of truth… content files.” End users should never see engine docs.

**Recommended solution:** Move all of that to README/ARCHITECTURE. UI copy stays human and professional.

**Expected impact:** Product voice; trust.

---

### CONTENT-03 — About page is structurally redundant with Resume
**Severity:** Medium  

**Why it matters:** About currently restates experience/education/languages with almost no narrative. Two pages compete with the same facts; neither feels deep.

**Recommended solution:** About = story/philosophy/approach. Resume/Timeline = facts. Until story exists, keep About extremely short rather than duplicating Resume.

**Expected impact:** Clear page jobs; less duplication fatigue.

---

### PAGE-01 — Services page is currently harmful
**Severity:** Critical  

**Why it matters:** Seven bordered cards titled as capabilities, each “Coming Soon,” reads as keyword stuffing without substance — opposite of premium.

**Recommended solution:** Redesign as a short capability index with real sentences when ready; until then, a single restrained section or hide from primary nav.

**Expected impact:** Removes the weakest public surface.

---

### PAGE-02 — Resume page mixes document UX with marketing chrome poorly
**Severity:** Medium  

**Why it matters:** Disabled-looking PDF control (`span.button`) is confusing. Raw social URLs are ugly. Architecture note section is meta. Print styles exist but on-screen resume still feels like a web section, not a crafted document.

**Recommended solution:**  
- Document-first layout (paper surface, tighter measure).  
- Honest PDF CTA only when file exists.  
- Human-readable professional links.  
- Remove meta engineering notes.

**Expected impact:** Resume becomes a credible artifact.

---

### PAGE-03 — Contact form is serviceable but not premium
**Severity:** Medium  

**Why it matters:** Standard stacked fields + callout + apology for architecture. No sense of engagement quality bar. `novalidate` disables native feedback.

**Recommended solution:** Stronger inquiry framing (what happens next, response expectation). Validate fields. Visual hierarchy that feels like starting a project, not submitting a template form.

**Expected impact:** Higher-quality inbound; better brand close.

---

### COMP-01 — Project card anatomy is noisy for unfinished work
**Severity:** Medium  

**Why it matters:** Status chips + tech tags + dual “Coming Soon” link slots + case study link create clutter before real products exist.

**Recommended solution:** For v1 empty: don’t render project cards. For real products: prioritize name, one sentence, one status, one primary action.

**Expected impact:** Cards feel sharp when they appear.

---

### COMP-02 — Timeline is generic
**Severity:** Low  

**Why it matters:** Vertical rule + dots is the default portfolio timeline. Fine structurally; not distinctive.

**Recommended solution:** When content is richer, consider year rail, grouped eras, or typographic chronology without ornamental dots.

**Expected impact:** Differentiation without novelty for its own sake.

---

### A11Y-01 — Focus handling on inputs vs global focus ring
**Severity:** Medium  

**Why it matters:** Global `:focus-visible` uses box-shadow; inputs also change border on `:focus` (including mouse). Inconsistent and potentially double-styled. Some controls (disabled PDF span) are not keyboard accessible but look like buttons.

**Recommended solution:** Unify focus system; don’t fake buttons with spans; ensure all interactive controls are tabbable with visible focus.

**Expected impact:** Clearer keyboard UX; fewer WCAG risks.

---

### A11Y-02 — Semantic / heading issues
**Severity:** Medium  

**Why it matters:** Empty states inject `h2` inside sections that already have `h2`. Hero uses `h1` (good) but many pages re-title with large `h2` that duplicate page purpose. Footer `h3` labels are fine. Main gets `tabindex="-1"` but skip-link focus move isn’t explicitly managed in JS.

**Recommended solution:** One `h1` per page/view; empty states as text, not competing headings; ensure skip focuses `#main`.

**Expected impact:** Better AT navigation and outline.

---

### A11Y-03 — Contrast risks on subtle text
**Severity:** Medium  

**Why it matters:** `--color-fg-subtle` (#6d7686 on #0b0d10) used for small brand subtitle and meta may fall short for small text WCAG AA depending on size/weight.

**Recommended solution:** Recheck all muted/subtle tokens at actual sizes; darken subtle text or enlarge.

**Expected impact:** More inclusive readability.

---

### A11Y-04 — External links and social links lack context
**Severity:** Low  

**Why it matters:** Multiple identical “opens in new tab” targets without announcing new window; long footer lists are noisy for AT users.

**Recommended solution:** Visually prioritize; indicate external where needed; reduce count.

**Expected impact:** Cleaner AT experience.

---

### RESP-01 — Desktop-first layout doesn’t redesign for mobile — it only stacks
**Severity:** High  

**Why it matters:** Hero type scales via clamp (good), but composition remains a tall text column. Nav becomes a full IA dump. Card grids become single column of many bordered boxes (especially Services). Contact/Resume are acceptable; Home/Services need real mobile composition, not shrink-wrap.

**Recommended solution:**  
- Mobile home: shorter hero, one CTA, proof module.  
- Hide hollow grids.  
- Consider bottom priority actions for Contact/Resume.

**Expected impact:** Mobile feels intentional.

---

### RESP-02 — Tablet breakpoint is essentially missing
**Severity:** Medium  

**Why it matters:** Only major switch is ~960px nav. Between ~700–1100px, `auto-fit` grids and 7-item nav create awkward mid states (cramped pills / orphan columns).

**Recommended solution:** Explicit tablet rules for nav density, grid columns, hero measure.

**Expected impact:** No “awkward middle.”

---

### SEO-01 — SPA shell is thin before JS
**Severity:** High  

**Why it matters:** `index.html` has almost no meta description/OG until client JS runs. Many crawlers/link unfurlers partially execute JS; risk of weak previews. OG image is SVG — poorly supported by several social platforms.

**Recommended solution:**  
- Harden static head defaults in `index.html`.  
- Use PNG/JPG OG image.  
- Longer-term: build-time HTML snapshots for key routes if SEO becomes critical.

**Expected impact:** Better sharing and crawl reliability.

---

### SEO-02 — JSON-LD is minimal Person only
**Severity:** Low  

**Why it matters:** Fine for v1, but no WebSite/SiteNavigation; incomplete story for rich results.

**Recommended solution:** Add WebSite + sameAs (already partially) once content stabilizes.

**Expected impact:** Marginal SEO gains.

---

### PERF-01 — Eager content + markdown in critical path
**Severity:** Medium  

**Why it matters:** `import.meta.glob(..., { eager: true })` plus `marked` means content parsing weight sits in the main graph. Fine at tiny scale; grows poorly as writing/products expand.

**Recommended solution:** Lazy route-level content where possible; keep palette index lean (titles/descriptions only).

**Expected impact:** Sustained performance as content grows.

---

### PERF-02 — Header DOM rebuild on every navigation
**Severity:** Medium  

**Why it matters:** `mountPage` recreates the entire header each route change — unnecessary work, loses focus, possible flicker.

**Recommended solution:** Update `aria-current` in place; don’t remount chrome.

**Expected impact:** Snappier navigation; better a11y continuity.

---

### PERF-03 — Noise filter overlay is continuous cost
**Severity:** Low  

**Why it matters:** Full-viewport SVG turbulence overlay is atmospheric but not free; adds little brand uniqueness.

**Recommended solution:** Remove or replace with a cheaper static texture / none.

**Expected impact:** Cleaner rendering; less “effect for effect’s sake.”

---

### PERF-04 — Render-blocking Google Fonts
**Severity:** Medium  

**Why it matters:** Fonts CSS in `<head>` delays text; self-hosting or `font-display` strategy is more product-grade.

**Recommended solution:** Self-host subsetted fonts with `font-display: swap` or optional sizing-adjusted fallbacks.

**Expected impact:** Faster first text; fewer layout surprises.

---

### MOTION-01 — Motion is generic, not narrative
**Severity:** Low  

**Why it matters:** Brief asked for subtle purposeful motion. Current motion is commodity hover lifts + palette fade. No signature interaction language.

**Recommended solution:** Define 2–3 intentional motions only (palette, menu, primary button). Remove card floating.

**Expected impact:** Motion supports product feel instead of decorating templates.

---

### BRAND-01 — First viewport fails the brand test
**Severity:** Critical  

**Why it matters:** If nav is removed, the first screen is a large name and placeholders — it could belong to any engineer with a dark theme. No product artifact, no craft motif, no unique layout.

**Recommended solution:** Make the first viewport unmistakable: name as brand signal + concrete proposition + visual craft unique to this site.

**Expected impact:** Memorability; brand ownership.

---

### SYS-01 — Components exist that pages don’t elevate
**Severity:** Low  

**Why it matters:** Quote/Stats/ContactCta are defined but unused/underused; risk of a component museum without a coherent page grammar.

**Recommended solution:** Either use them deliberately in page compositions or keep them undocumented until needed. Prefer page-level excellence over component count.

**Expected impact:** Design system stays sharp.

---

## 6. Prioritized implementation roadmap

### Critical (do before calling the site “designed”)

1. Rewrite homepage narrative (`summary`, `focus`) and restage hero as a true first-viewport composition (full-bleed, not padded main).  
2. Fix CTA honesty — stop sending “Explore Work” into an empty Products void.  
3. Redesign empty/unfinished states; remove all engine/implementation copy from UI.  
4. Collapse public IA to match real content; demote empty routes from primary nav/footer.  
5. Redesign or temporarily unpublish Services-as-seven-Coming-Soon-cards.  
6. Pass the brand test on the first viewport.

### High

7. Reduce card/pill template language; establish a signature layout motif.  
8. Resolve accent palette (remove purple glow; make accent decisive).  
9. Rebuild spacing/frame system (hero vs main vs section rhythm).  
10. Align desktop nav with audience jobs; put Resume where recruiters expect it.  
11. Upgrade interaction model (especially command palette a11y + header icons).  
12. Harden SEO head + real OG image.  
13. Mobile compositions for Home and any remaining grids.

### Medium

14. Restyle or pause light theme.  
15. About vs Resume content roles.  
16. Resume document presentation; remove meta notes; honest PDF CTA.  
17. Contact inquiry framing + validation.  
18. Tablet breakpoints; grid system.  
19. Performance: stop remounting header; font strategy; leaner search index over time.  
20. Typographic eyebrow discipline and contrast audit.

### Low

21. Timeline visual differentiation.  
22. Loading indicator for route chunks.  
23. JSON-LD expansion.  
24. Noise overlay removal.  
25. External link affordances / `aria-current` prefixing.  
26. Prune unused components from the “system” narrative until needed.

---

## 7. Final assessment

This project currently has the bones of a premium personal **product site engine**, but the **experience layer still looks like a polished starter kit**. Architecture will not save a hollow first impression. At the premium bar set by Linear/Raycast/Vercel/Stripe/Apple-level craft (as inspiration, not imitation), v1 UI is **below launch quality**.

What would make it feel genuinely premium and memorable:

- A finished homepage proposition and composition  
- A smaller, honest IA  
- Empty states that feel editorial, never technical  
- A distinctive layout/typography system with fewer boxed components  
- Interactions that feel considered (especially palette + chrome)  
- Proof surfaces (Resume/Timeline/work) elevated above placeholder destinations  

Until those land, additional features would only decorate the problem. **Do not add features next — redesign the experience against the critical roadmap above.**

**Verdict:** Strong foundation. Insufficient product design. Not yet memorable.
