# Design System Constitution

**Identity:** Product Operating System  
**Status:** FROZEN — binding constitution; implement faithfully; no reinterpretation  
**Supersedes:** exploratory directions for visual decisions  
**Amended:** 2026-07-31 (Remove Before Add · Module Priority · Home Budget · Done · Composition Law)  
**Date:** 2026-07-31

This is not a mood board. It is the permanent design constitution for kartikjuneja.com.

No further design exploration. Do not invent new metaphors. Do not reinterpret these rules. Build to them exactly.

Related records: [docs/DECISIONS.md](./docs/DECISIONS.md) · [docs/IMPLEMENTATION_GUIDE.md](./docs/IMPLEMENTATION_GUIDE.md) · [docs/README.md](./docs/README.md)

---

## 0. North star

The site is the **home environment of a personal Product Operating System** for a software engineer who builds products.

- The homepage is a **home screen of modules**, not a marketing landing page.
- Routes are **apps** opened from modules or the launcher.
- Craft is expressed through **layout, hierarchy, rhythm, typography, and interaction** — not through decorative effects.

**One-sentence brand test:**  
If someone sees a screenshot with the logo cropped out, they should still say: *“That’s the module OS site.”*

---

## 1. Visual philosophy

### Intent
Calm confidence. Precision. Clarity. Craftsmanship. Software-product seriousness without coldness.

### How identity is made
Identity comes from:

1. Persistent **environment chrome**
2. A recognizable **module grid**
3. Strict **typographic hierarchy**
4. Exact **spacing rhythm**
5. Quiet, high-quality **interaction**

Identity does **not** come from gradients, glass, glow, noise overlays, gallery frames, blueprint sheets, or dashboard widgets.

### Always
- Treat the viewport as an environment, not a brochure.
- Make hierarchy obvious in under three seconds.
- Let negative space be structural (gutters, module gaps), not accidental emptiness.

### Never
- Never use neon, cyberpunk, terminal/phosphor, fake boot sequences, or hacker theater.
- Never use glassmorphism stacks, heavy blurs as decoration, or multi-layer showy shadows.
- Never use marketing “Hero → logos → feature cards → CTA” composition on Home.
- Never imitate Linear, Raycast, Arc, Notion, or Vercel visually.

### Prefer
- Matte surfaces, hairline rules, one elevation level.
- Alignment over ornament.
- Fewer elements, better composed.

### Avoid
- Pill clusters, badge spam, decorative gradients, noise textures, purple accent defaults.

---

## 2. Unique visual signature — “Module Rail Grid”

### The signature
Every primary surface is organized as a **Module Rail Grid**:

1. **Environment top bar** (account + launcher) — always present in the same form.
2. **Modules** as rectangular apps with a **fixed header rail**:
   - Left: module title (system label style)
   - Right: optional meta + text action (“Open”)
   - A **1px hairline** under the header rail
3. **Home** composes modules on a **strict 12-column grid** with constant gutters.
4. Module headers across the home screen share **one baseline** (aligned header rails).

This combination — top bar + hairline module rails + aligned multi-size modules on a 12-col grid — is the screenshot fingerprint.

No other metaphor (gallery wall, spec sheet title block, single instrument face) may replace it.

### Signature rules
- **Always** use the module header rail on home modules and on app-mode content shells where applicable.
- **Always** keep module title typography identical across modules (same size, weight, tracking).
- **Never** turn modules into KPI widgets, charts, or fake system monitors.
- **Never** remove the hairline rail in favor of floating card chrome or heavy shadows.
- **Prefer** varying module *span* (4/6/8/12) for hierarchy, not varying header styles.
- **Avoid** unique decorative headers per module (icons may differ; rail structure may not).

### Recognition checklist (screenshot)
Someone should be able to point to:

- Top environment bar  
- Multiple modules with identical header-rail anatomy  
- Clear grid gutters  
- No hero billboard  

…and identify the site.

---

## 3. Spacing philosophy

### Intent
Rhythm over decoration. Spacing is the primary craft material.

### Base unit
Use a **4px base unit**. All spacing tokens are multiples of 4.

Recommended scale:

| Token | Value | Use |
|-------|------:|-----|
| `space-1` | 4px | Micro gaps (icon-label) |
| `space-2` | 8px | Inline compact |
| `space-3` | 12px | Tight stack |
| `space-4` | 16px | Default inner module padding (horizontal minimum) |
| `space-5` | 24px | Module body padding, control padding |
| `space-6` | 32px | Module gap (grid gutter) |
| `space-7` | 48px | Environment inset from viewport edge (desktop) |
| `space-8` | 64px | Rare major separations (app mode only) |

### Always
- Use the same grid gutter between all home modules (`space-6`).
- Pad module interiors consistently (`space-5` body; header rail vertical padding fixed).
- Align module header baselines across a row.

### Never
- Never invent one-off margins for a single module.
- Never stack “section padding” systems on top of the module grid (no double page frames).
- Never use monumental vertical whitespace to fake premium on empty content.

### Prefer
- Density with clarity on Home (aim for meaningful content above the fold on desktop).
- Optical adjustments only when geometry is wrong — then encode as tokens, not magic numbers.

### Avoid
- Random 18/22/26px values.
- Larger padding than content deserves.

---

## 4. Typography system

### Intent
Typography is UI infrastructure. Personality is restrained; clarity is mandatory.

### Families
- **UI / environment:** one modern grotesque (or geometric-humanist sans) for chrome, modules, forms, lists.  
  Example direction: Manrope / equivalent — final face may be chosen at implementation, but **only one UI family** on the home screen.
- **Reading (apps only):** optional second family for long-form case studies and writing **inside app views**, never on the home screen module grid.
- **Mono:** only for IDs, shortcuts (`Ctrl+K`), and code fragments — never for headlines.

### Ramp (home + chrome)

| Role | Size | Weight | Tracking | Notes |
|------|------|--------|----------|-------|
| Environment name | 14–16px | 600 | 0 | Account mark |
| Environment meta | 12px | 500 | 0.02em | Role |
| Module title | 12px | 600 | 0.06em | Uppercase or small-caps OK; must be consistent |
| Module action | 12px | 500 | 0 | “Open” |
| Row title | 14–15px | 600 | 0 | Product names, events |
| Body / value | 13–14px | 400–500 | 0 | Default reading in modules |
| Meta | 12px | 500 | 0 | Dates, status |
| Display reading H1 (apps) | clamp 28–40px | 500–600 | -0.02em | App views only |

### Always
- Keep module titles identical in treatment across the OS.
- Use tabular lining figures for dates where possible.
- Maintain clear label → value relationships.

### Never
- Never use oversized display type on the home screen.
- Never mix more than two type families sitewide.
- Never decorate type with gradients or glow.

### Prefer
- Short labels. Exact words.
- Sentence case for row titles; system case for module titles.

### Avoid
- Eyebrow spam, serif billboards on Home, playful lettering.

---

## 5. Color philosophy

### Intent
Neutral OS chrome with **one** purposeful accent used for selection, focus, and primary actions.

### Dark-first palette roles

| Role | Purpose |
|------|---------|
| `bg` | Environment canvas |
| `surface` | Module surface |
| `surface-hover` | Hover module/row |
| `border` | Hairlines, rails |
| `fg` | Primary text |
| `fg-muted` | Secondary text |
| `fg-subtle` | Tertiary meta (must still pass contrast at its size) |
| `accent` | Focus ring, selection, primary action |
| `accent-soft` | Selection backgrounds only |

### Always
- Default to dark theme.
- Meet WCAG AA for text at actual sizes.
- Use accent sparingly (active module row, focus, primary button, launcher selection).

### Never
- Never use purple-as-default brand.
- Never use neon accents or multi-color status rainbows.
- Never color-code every module differently.

### Prefer
- Status as text (“Active”, “Coming Soon”) plus optional single neutral pill; not traffic-light dashboards.
- Light theme as a true second theme with the **same structure** (cool neutrals — not warm parchment cream).

### Avoid
- Soft purple hero glows, gradient mesh backgrounds, noise overlays.

---

## 6. Module philosophy

### Definition
A **module** is a bounded application surface with:

- One job  
- Header rail (title + optional action)  
- Compact body  
- Designed sparse/empty state  
- Optional navigation into an app route  

Modules replace website “sections.”

### Home module set (canonical)
| Priority | Modules |
|----------|---------|
| P0 | Current Focus, Products |
| P1 | Timeline, Resume |
| P2 | Notes, Availability, Contact |
| P3 | Build Log (+ future only via Remove Before Add) |

See §18 Module priority and §19 Home screen budget.

Not every module must be visible if content policy or budget hides it — but when visible, it obeys the shell.

### Hierarchy via span (12-col)
| Priority | Span | Examples |
|----------|------|----------|
| Primary | 8–12 | Products, Current Focus |
| Secondary | 6 | Timeline, Resume |
| Utility | 4 | Availability, Contact, Notes, Build Log |

### Always
- One job per module.
- Same header-rail anatomy.
- Map modules to existing content sources (no duplicate content models).

### Never
- Never nest modules inside modules on Home.
- Never put analytics/charts/gauges in modules.
- Never use modules as decorative cards without actions or meaning.

### Prefer
- Lists and definition-style rows inside modules.
- “Open →” as explicit navigation into apps.

### Avoid
- Carousel modules, stacked CTAs, marketing feature grids inside a module.

---

## 7. Navigation philosophy

### Three layers
1. **Environment chrome** — account, launcher, theme  
2. **Home screen** — module grid (primary map)  
3. **App mode** — full routes with clear “← Home” return  

### Launcher (Ctrl+K)
System launcher for modules, apps, products, notes, services. Navigation-first. Same search index architecture.

### Always
- Keep chrome persistent and visually quieter than modules.
- Provide Home return in app mode.
- Ensure Resume and Contact are reachable within one hop (module or launcher).

### Never
- Never show a 10+ link marketing mega-nav as the primary desktop map.
- Never hide critical recruiter paths exclusively behind novelty UI.

### Prefer
- Sparse chrome links (or none beyond launcher) while modules do wayfinding.
- Shared IA between launcher labels and module titles.

### Avoid
- Footer sitemap dumps as primary navigation.
- Duplicate competing nav systems with different labels for the same app.

---

## 8. Interaction philosophy

### Intent
Interactions should feel like a precise tool: predictable, fast, quiet.

### States required for interactive elements
Default · Hover · Active/Pressed · Focus-visible · Disabled (rare)

### Always
- Provide visible `:focus-visible` using accent ring tokens.
- Make entire meaningful rows clickable when they navigate.
- Preserve keyboard access to launcher, modules actions, and forms.

### Never
- Never use generic “everything lifts 2px” hover as the only language.
- Never fake buttons with non-focusable `span`s.
- Never autoplay motion that distracts from reading.

### Prefer
- Module/row border or background change on hover.
- Primary button as solid accent or solid fg-on-bg — one primary style only.
- Pressed state slightly darker/inset, not bouncy.

### Avoid
- Parallel hover metaphors (scale + glow + shadow + underline all at once).

---

## 9. Animation philosophy

### Intent
Motion orients; it does not entertain.

### Allowed
- Launcher open/close (opacity + short translate ≤ 8px, ≤ 200ms)
- First paint stagger of modules (optional, ≤ 40ms steps, respect reduced motion)
- Row selection feedback in launcher

### Always
- Honor `prefers-reduced-motion: reduce` (instant states).
- Keep durations short (120–220ms).
- Use the same easing curve sitewide.

### Never
- Never fake OS boot, progress loaders for static content, page wipe transitions, parallax, or scrolljacking.
- Never animate layout thrash (modules jumping gutters).

### Prefer
- Instant route content swap with optional 100–150ms fade.
- Stillness as the default luxury.

### Avoid
- Continuous ambient animations (breathing dots, animated gradients, noise).

---

## 10. Icon philosophy

### Intent
Icons are functional labels, not decoration.

### Always
- Use a single icon set/optical size (e.g. 16px) in chrome and module meta.
- Pair icons with text labels in critical actions (launcher, contact).
- Keep stroke/weight consistent.

### Never
- Never use emoji as UI icons in chrome.
- Never use multicolored brand-style icons in the environment bar.
- Never illustrate every module with large decorative icons.

### Prefer
- Text or near-text glyphs: search, home, availability, external-link.
- No icon if the label is clearer alone.

### Avoid
- Duotone illustration packs, 3D icons, animated icon flourishes.

---

## 11. Empty-state philosophy

### Intent
Sparse must feel **designed and honest**, never broken or technical.

### Always
- Use a short human line + optional single action.  
  Example: `No products yet` + `Open Products`
- Keep empty modules’ header rail intact (the shell remains).
- Hide a module entirely if policy says it should not appear until content exists — consistency over completeness.

### Never
- Never show file paths, Markdown instructions, “no backend,” architecture notes, or CMS guidance in UI.
- Never render grids of many identical “Coming Soon” cards.
- Never use dashed “dropzone” empty frames that look like unfinished admin UI.

### Prefer
- Em dash / quiet placeholder values inside rows (`—`) when a field is unknown.
- One composed sparse module body, not a marketing empty illustration.

### Avoid
- Humor that undermines professionalism; fake sample products.

---

## 12. Accessibility philosophy

### Intent
A professional OS is usable with keyboard, screen reader, and clear contrast — by default.

### Always
- Valid semantic structure: `header`, `main`, `nav`, modules as `section` with headings.
- One logical `h1` per view (Home may use account name or “Home”; apps use app title).
- Skip link to main content.
- Focus trap + restore focus for launcher dialog; `Esc` closes.
- AA contrast for text/UI at real sizes.
- `lang` on HTML; descriptive button labels.

### Never
- Never rely on color alone for state.
- Never block zoom or use tiny low-contrast meta as critical info.
- Never ship launcher without keyboard selection support.

### Prefer
- Native controls for forms.
- `aria-current` for app context; prefix-match section roots where helpful.

### Avoid
- Decorative fake windows that break semantics.
- Over-ARIA on static text.

---

## 13. Layout constitution (Home vs App)

### Home
- Module Rail Grid only.
- No marketing hero.
- Environment chrome + grid + launcher.

### App mode
- Top bar becomes context bar: `← Home` · App name · Launcher.
- Content uses readable measure for prose; lists/tables for inventories.
- Case studies and writing may use the reading typeface.

### Always
- Maintain signature chrome continuity between Home and Apps.
- Preserve content-model single sources of truth (experience/education/skills/products).

### Never
- Never redesign app pages as unrelated microsites with different identity systems.

---

## 14. Content voice (design-facing)

### Always
- Professional, exact, calm.
- Placeholders only when content is truly missing — designed sparsely.

### Never
- Never leak implementation details into copy.
- Never invent products, metrics, or biography.

### Prefer
- Concrete nouns: products, inquiry, resume, focus, availability.

### Avoid
- Growth-hacker CTA language, meme tone, fake urgency.

---

## 15. Concrete global rules

### Always
- Follow the Module Rail Grid signature on Home.
- Dark-first; tokenized color/spacing/type.
- Map UI to content files; no duplicated resume datasets.
- Keep Ctrl+K as system launcher consuming the shared search index.
- Design sparse states intentionally.
- Ship keyboard-visible focus and reduced-motion support.

### Never
- Never add dashboards, widgets, terminals, galleries, or doc-title-block as the identity.
- Never use gradients/glass/neon/noise as brand.
- Never implement new visual directions that conflict with this constitution without rewriting it.
- Never prioritize novelty over clarity.

### Prefer
- Modules over sections.
- Lists over cards.
- Alignment over decoration.
- One accent over many colors.
- Stillness over motion.
- Honest empty over fake fullness.

### Avoid
- Portfolio templates, SaaS landing templates, admin dashboards, and “AI personal site” clichés.
- Pill-heavy UI, badge walls, and oversized display type on Home.
- Footer or nav as a dumping ground for unfinished rooms.

---

## 16. Permanent design law

> ### IDENTITY COMES FROM COMPOSITION, NOT DECORATION.

Whenever future design decisions conflict, **this law overrides decorative preference**.

Identity is created by:

- Layout  
- Hierarchy  
- Spacing  
- Rhythm  
- Typography  
- Interaction  

Identity is **not** created by:

- Gradients  
- Effects  
- Animations  
- Trendy UI treatments  
- Glass, glow, noise, neon, or novelty chrome  

If a change improves decoration but weakens composition, **reject it**.

---

## 17. Remove Before Add

The homepage must become **more focused over time, not more crowded**.

Growing the product means **enriching modules**, not multiplying them. Avoid feature creep.

### Rule
Every new homepage module, major UI element, or navigation item must either:

1. **Replace** an existing one, **or**
2. **Demonstrate** why the home screen becomes *clearer* because of its addition.

### Always
- Ask: “What becomes clearer if we add this?”
- Prefer deepening Products / Focus / Timeline content over adding modules.
- Removals and replacements are first-class design actions.

### Never
- Never add a module “because we might need it later.”
- Never grow the home screen to mirror the full route list.
- Never treat the home screen as a feature backlog.

### Prefer
- Stronger empty/sparse content inside P0–P1 modules.
- New capability as an **app route** first; promote to Home only if it earns P0–P2 clarity.

### Avoid
- Parallel modules that tell the same story (e.g. duplicate status surfaces).

---

## 18. Module priority

Explicit priority governs layout, collapse, and survival under constraint.

| Priority | Modules | Meaning |
|----------|---------|---------|
| **P0** | Current Focus, Products | Define identity; always protected |
| **P1** | Timeline, Resume | Proof and recruiter path; protected after P0 |
| **P2** | Notes, Availability, Contact | Utility; may collapse before P0/P1 |
| **P3** | Build Log, future modules | Lowest home priority; first to collapse or stay app-only |

### Collapse rules (constrained viewports / tight budgets)
- Lower priority modules collapse **first**.
- Higher priority modules must **never** shrink or degrade to preserve lower-priority content.
- Collapse means: move to launcher-only access, stack below fold as a single-line app row, or hide from Home per budget — **not** crushing P0 into unreadability.

### Always
- Preserve P0 readability and Products primacy.
- Keep Resume (P1) and Contact (P2) reachable within two interactions even if Contact’s home module collapses (chrome/launcher/Focus actions may compensate).

### Never
- Never sacrifice Products or Current Focus to keep Build Log visible.
- Never give P3 equal visual weight to P0 on desktop first viewport.

---

## 19. Home screen budget

The homepage must never become an application dashboard.

### Desktop budget
- Approximately **6–8 visible modules** maximum on Home.
- The **first viewport** must communicate the entire identity (operator + focus + products path).
- Scrolling on first visit should be **minimal**.
- At most **two expanded modules** at once (expanded = richer body / multi-row detail). All others stay compact.
- Everything else belongs in **app routes**.

### Mobile budget
- Modules become a **clean vertical application list** (same header-rail language).
- No dense multi-column dashboard layouts.
- P0 first, then P1, then P2; P3 only if budget remains.

### Always
- Count modules against the budget before shipping Home changes.
- Put depth in apps, not in home sprawl.

### Never
- Never exceed ~8 visible home modules without a Remove Before Add replacement.
- Never add widgets, charts, or monitoring panes to “use space.”

### Prefer
- Compact rows inside modules.
- One primary Products surface spanning wide; utilities compact.

### Avoid
- Equal-size wallpaper of eight equally loud modules.

---

## 20. Definition of Done (homepage)

The homepage is **complete** only if all of the following are true:

1. A first-time visitor understands **who builds the products** within ~**10 seconds**.
2. Recruiters can reach the **resume within two interactions**.
3. Clients can begin an **inquiry within two interactions**.
4. **Products** are the primary evidence of capability (even via a designed sparse Products module that points to the Products app).
5. Empty states feel **intentional**, not unfinished.
6. **Implementation details are never exposed** in the UI.
7. The interface remains **recognizable in grayscale** because identity comes from structure (Module Rail Grid), not color.

If any criterion fails, Home is not done — regardless of visual polish.

---

## 21. Decision hierarchy (when rules conflict)

1. **Composition law** (identity from composition, not decoration)  
2. **Clarity** for recruiters, clients, developers  
3. **Remove Before Add** + **Home budget** + **Module priority**  
4. **Signature integrity** (Module Rail Grid)  
5. **Content honesty**  
6. **Accessibility**  
7. **Density & rhythm**  
8. **Aesthetic flourish**

If a flourish threatens 1–6, cut the flourish.

---

## 22. Out of scope for visual identity

The following remain engineering concerns and must not alter this constitution:

- Router mechanics, content loaders, build pipeline  
- Pagefind later, PDF generation later  
- Adding real product Markdown files  

New content should **fill modules**, not invent a new look.

---

## 23. Freeze gate

This document is the **frozen** design constitution for Product Operating System.

**Implementation must follow it exactly.**  
No new concepts. No new metaphors. No “small reinterpretations.”

Any change requires an explicit written amendment to `DESIGN_SYSTEM.md` and a matching entry in [docs/DECISIONS.md](./docs/DECISIONS.md).

---

**End of constitution.**
