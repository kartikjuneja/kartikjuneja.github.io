# Implementation Guide

**Status:** Binding companion to the frozen design constitution  
**Follow:** [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) exactly — no reinterpretation  
**Decisions:** [DECISIONS.md](./DECISIONS.md)

This guide tells implementers *how to build* under the constitution. It does not invent new design.

---

## 1. Design principles to preserve

1. **Product Operating System** — home screen of modules; routes are apps.  
2. **Module Rail Grid** — environment top bar + hairline module header rails + 12-col grid; screenshot fingerprint.  
3. **Identity from composition, not decoration** — layout, hierarchy, spacing, rhythm, typography, interaction.  
4. **Remove Before Add** — home gets clearer, not more crowded.  
5. **Module priority** — P0 Focus + Products protected; lower priorities collapse first.  
6. **Home budget** — ~6–8 modules; minimal first-visit scroll; ≤2 expanded; mobile = vertical app list.  
7. **Content honesty** — no invented products; sparse states designed; no engine leakage in UI.  
8. **Launcher** — Ctrl+K navigation-first over shared search index.  
9. **Accessibility & reduced motion** — non-negotiable.  
10. **Existing architecture** — Vite/TS static, content loaders, router, tokens — evolve presentation, don’t reinvent the engine.

---

## 2. Components that must be built

Presentational building blocks required by the constitution (names may match code, jobs must match):

| Component | Job |
|-----------|-----|
| **EnvironmentChrome** | Top bar: account (name/role), launcher control, theme; app mode adds `← Home` + app title |
| **ModuleShell** | Header rail (title · meta · Open) + hairline + body slot; shared anatomy for all modules |
| **HomeGrid** | 12-col module layout; gutters; priority-aware spanning/collapse |
| **ModuleRow / ModuleList** | Compact list rows inside modules (products, timeline pulses, notes) |
| **SparseState** | Intentional empty/sparse body inside ModuleShell (no dashed admin dropzones, no CMS copy) |
| **SystemLauncher** | Ctrl+K dialog; focus trap; keyboard selection; shared search index |
| **AppShell** | App-mode frame wrapping route content |
| **Button / TextButton** | One primary + quiet secondary; focus-visible; no fake span-buttons |
| **StatusText** | Textual status/meta (not traffic-light dashboards) |

### Home modules to compose (by priority)

| Priority | Module | Opens |
|----------|--------|-------|
| P0 | Current Focus | `/now` (or inline + Open) |
| P0 | Products | `/products` |
| P1 | Timeline | `/timeline` |
| P1 | Resume | `/resume` |
| P2 | Notes | `/writing` |
| P2 | Availability | `/now` |
| P2 | Contact | `/contact` |
| P3 | Build Log | `/timeline` or future log app — only if budget allows |

### Do not rebuild as the home language
Marketing Hero, Feature card grids, dashed EmptyState-as-hero, gallery frames, spec title blocks, instrument-only face — superseded by Module Rail Grid.

---

## 3. Recommended implementation order

1. **Tokens** — spacing (4px scale), color roles, type ramp per constitution; remove decorative noise/gradient identity.  
2. **EnvironmentChrome** — Home + App modes.  
3. **ModuleShell + SparseState** — lock the signature.  
4. **HomeGrid + priority/collapse/budget behavior.**  
5. **Compose Home** from content loaders (Focus, Products, Timeline, Resume, Notes, Availability, Contact; Build Log only if budget).  
6. **SystemLauncher** a11y-complete; wire to search index.  
7. **AppShell** + restyle existing routes as apps (Products, Resume, Contact, Timeline, Now, Writing, etc.) without new metaphors.  
8. **Pass Done criteria + developer checklist** (below).  
9. **Content polish** only after shell is constitution-compliant (real summary/focus when available — still no invented products).

---

## 4. High-risk violation areas

| Risk | How it violates | Guard |
|------|-----------------|-------|
| Reusing old Hero/Section/card home | Marketing template, not OS | Home = modules only |
| Dashboard creep | Charts, KPIs, fake monitors | Forbidden by constitution |
| Too many home modules | Breaks budget / Remove Before Add | Hard cap ~6–8; priority collapse |
| Equal visual weight for P3 | Crowds P0 | Span + order by priority |
| Giant display type on Home | Decoration composition | UI ramp only on Home |
| Gradients / glass / noise / neon | Decoration over composition | Strip effects |
| Pill/badge walls | Template cliché | Text + sparse meta |
| Empty state with file paths / “no backend” | Engine leakage | SparseState copy rules |
| Remounting chrome every navigation | Interaction quality / a11y | Update in place |
| Weak launcher a11y | Breaks OS interaction law | Focus trap, restore focus, Esc |
| Light theme as warm cream | Cliché; off-identity | Cool neutrals if offered |
| Shrinking Products to fit Build Log | Priority violation | Collapse P3 first |
| “Just one more module” | Feature creep | Remove Before Add gate |
| Reinterpreting OS as terminal/gallery/docs | Metaphor drift | Frozen identity |

---

## 5. Screen completion checklist

Use before calling any screen done.

### Every screen
- [ ] Follows Module Rail Grid / AppShell continuity  
- [ ] No decorative gradients, glass, neon, noise, terminal, gallery, or dashboard widgets  
- [ ] Tokens used for space/type/color — no one-off magic numbers  
- [ ] Focus-visible and keyboard paths work  
- [ ] `prefers-reduced-motion` respected  
- [ ] No implementation/CMS/architecture copy in UI  
- [ ] Content is honest (placeholders are designed sparse, not fake data)  
- [ ] Recognizable structure in grayscale  

### Home specifically
- [ ] First viewport communicates operator identity + product path (~10s test)  
- [ ] ≤ ~8 visible modules; scrolling minimal on first visit  
- [ ] ≤ 2 expanded modules  
- [ ] P0 Current Focus + Products present and protected  
- [ ] Resume reachable in ≤ 2 interactions  
- [ ] Inquiry reachable in ≤ 2 interactions  
- [ ] Products are primary capability evidence (module and/or clear Open)  
- [ ] Empty/sparse states intentional  
- [ ] Mobile is a clean vertical module list, not a dense dashboard  
- [ ] Remove Before Add considered for any addition  

### Launcher
- [ ] Ctrl/Cmd+K opens; Esc closes  
- [ ] Focus trapped; focus restored on close  
- [ ] Keyboard move/select works  
- [ ] Uses shared search index  

### App routes
- [ ] `← Home` (or equivalent) present  
- [ ] Same chrome language as Home  
- [ ] Depth lives here, not forced onto Home  

---

## 6. Definition of Done (homepage)

Mirror of constitution §20 — all must pass:

1. Who builds the products clear in ~10 seconds  
2. Resume ≤ 2 interactions  
3. Inquiry ≤ 2 interactions  
4. Products primary evidence  
5. Empty states intentional  
6. No implementation details exposed  
7. Recognizable in grayscale  

---

**End of implementation guide.**
