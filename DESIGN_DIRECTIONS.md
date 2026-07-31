# Design Directions

**Project:** kartikjuneja.com  
**Type:** Visual identity & homepage experience exploration  
**Status:** Pre-implementation — no UI code in this pass  
**Constraint:** Keep existing architecture, content model, router, and static build  
**Date:** 2026-07-31

---

## Purpose

The current site is architecturally sound and visually competent. It still reads as a polished personal-site template. That is an **identity problem**, not an engineering problem.

This document explores **five radically different experiential directions** for the same engine. Each must:

- Feel memorable as a product surface, not a portfolio
- Support recruiters, clients, developers, and product explorers
- Scale as products, writing, experiments, and case studies are added
- Fit inside the current content-driven static architecture

No direction is “restyle the current homepage.” Each rethinks composition, hierarchy, and metaphor from first principles.

---

## Shared constraints (all concepts)

| Remains fixed | May change freely |
|---------------|-------------------|
| Vite + TS static app | Visual metaphor |
| Client router + `404.html` | Homepage composition |
| JSON + Markdown content model | Navigation presentation |
| Typed models / loaders | Type, color, grid, motion |
| Command palette (Ctrl+K) | How palette is framed |
| Pages as composed modules | Which modules appear where |
| No backend | Density, rhythm, chrome |

Content honesty still applies: unfinished modules use designed sparse states, never invented facts.

---

# Concept 01 — Product Atelier

### Name
**Product Atelier**

### Core idea
The site is a quiet studio where software products are treated as **physical works on a wall**. You are the maker; the homepage is the studio entrance, not a bio dump.

### Target feeling
Calm authority. Craft. Selective. Gallery lighting, not startup landing.

### First impression
A dark room. One large work title (or “Works in progress” as a designed sparse panel). Your name is the studio mark, secondary to the work plane. Silence before explanation.

### Visual language
- Matte charcoal surfaces, soft spotlight gradients (single light source)
- Hairline frames around works; generous mat margins
- Almost no filled cards; separation by space and thin rules
- Accents only on the active work or primary action
- Imagery: product silhouettes, UI frames, or abstract “canvas” plates — not screenshots collage

### Typography approach
- Display: refined grotesque or sharp sans for product titles (not playful serif poster)
- Body: neutral text sans with high readability
- Name as a small stamped mark (atelier logo), not a billboard

### Grid / layout philosophy
Museum wall: asymmetric hang. Large primary pane (60–70%) + annotation rail (30–40%). Fixed outer margins like gallery walls.

### Navigation style
Minimal top: Studio mark · Works · Notes · Now · Inquire  
Everything else lives in Ctrl+K (“catalog search”). Desktop nav is sparse on purpose.

### Hero composition
Not a hero banner. **Opening wall:**

1. Studio mark (name)
2. One sentence of practice (“Builds software products and systems.” — when written)
3. Primary work plane (featured product frame or intentional empty canvas)
4. Small “Enter studio” / “View ledger” actions in the annotation rail

### Homepage structure
1. Opening wall (featured work or designed sparse canvas)
2. Current exhibition strip (3 product plates max)
3. Studio notes (1 writing tease OR hide if empty)
4. Visiting hours / availability (Now, compressed)
5. Inquire

### How products are presented
As **works**: title plate, status label (edition/state), one-line caption, enter case study. Case study pages feel like exhibition texts (Overview → Problem → …), not blog posts.

### How experience is presented
Not on the homepage as a résumé block. Linked as “Practice” / Timeline in the catalog — chronological wall labels, not a corporate timeline graphic.

### How resume integrates
“Curriculum” as a printable sheet accessed from Inquire or a quiet header action — document surface, not a marketing section.

### How contact integrates
“Inquire” — short project brief form framed as a studio visit request. Mailto remains.

### Interaction style
Slow hover: frame brightens, caption reveals. Click enters the work. No floating cards.

### Motion philosophy
Light falls on; panels ease opacity. No bounce. Palette feels like opening a catalog drawer.

### Strengths
Highly memorable; product-first; scales beautifully as products arrive; empty canvas can feel intentional.

### Weaknesses
Weak if products stay empty for months without a strong sparse design; less “loud” for recruiters seeking keywords immediately.

### Why someone would remember it
“It felt like a gallery for software.”

### Why it is not a typical developer portfolio
Portfolios list projects in cards. An atelier **hangs works** and treats case studies as exhibition text.

### Wireframe

```
┌──────────────────────────────────────────────────────────┐
│  KJ          Works    Notes    Now              Inquire  │
├──────────────────────────────┬───────────────────────────┤
│                              │  Kartik Juneja            │
│                              │  Senior Software Engineer │
│      ┌────────────────┐      │                           │
│      │                │      │  Practice line (1 sent.)  │
│      │  FEATURED WORK │      │                           │
│      │  / EMPTY CANVAS│      │  Status · Focus (Now)     │
│      │                │      │                           │
│      └────────────────┘      │  [ View works ]           │
│                              │  [ Curriculum ]           │
├──────────────────────────────┴───────────────────────────┤
│  Exhibition                                                  │
│  [ plate ]   [ plate ]   [ plate ]     or designed sparse    │
├──────────────────────────────────────────────────────────┤
│  Inquire · visiting hours                                    │
└──────────────────────────────────────────────────────────┘
```

---

# Concept 02 — Spec Archive

### Name
**Spec Archive**

### Core idea
The site is a living **product specification archive**: precise, indexed, industrial. You are documented the way serious software systems are documented — clear structure, revision awareness, no fluff.

### Target feeling
Precision. Trust. Engineering seriousness without terminal cosplay.

### First impression
A title block like an engineering drawing sheet: document name, revision, owner, status. Immediately feels like infrastructure documentation, not a vibe site.

### Visual language
- Cool gray / ink / blueprint-adjacent (lines, registration marks) without blueprint cliché overload
- Monospace for IDs, dates, statuses only; humanist sans for reading
- Tables, definition lists, ruled sections
- Borders are structural (sheet edges), not card chrome
- Stamp-like status: DRAFT / ACTIVE / ARCHIVED

### Typography approach
- Display: condensed technical sans for sheet titles
- Body: clear grotesque
- Meta always tabular (dates, IDs aligned)

### Grid / layout philosophy
Document grid: header title block → body columns → footer revision bar. 12-col with strict gutters. Feels like Spec + Appendix.

### Navigation style
Index sidebar (desktop) or top “TOC”: Overview · Products · Capabilities · Continuum · Writing · Curriculum · Inquire  
Ctrl+K = “Jump to section / symbol.”

### Hero composition
**Title block**, not hero image:

```
DOCUMENT: Personal Product Surface
OWNER: Kartik Juneja
ROLE: Senior Software Engineer
STATUS: Active
REV: content-driven
SUMMARY: [one professional sentence]
```

Primary actions as sheet commands: Open Products · Open Curriculum · File Inquiry

### Homepage structure
1. Title block + summary
2. Contents (linked index of live sections only)
3. Product register (table)
4. Capability index (compact definitions)
5. Latest continuum entries (3)
6. Inquiry procedure

### How products are presented
**Register / catalog table**: Name · Status · Stack · Links · Spec  
Detail route = full specification (the existing case-study sections map cleanly to spec chapters).

### How experience is presented
“Continuum” appendix — dated records from `timeline.json` / experience — revision history of a career, not a decorative timeline.

### How resume integrates
Curriculum = exportable sheet view of the same register data (experience, education, skills). Print CSS becomes “plot to paper.”

### How contact integrates
“File an inquiry” — structured fields labeled like a change request / intake ticket (still mailto).

### Interaction style
Row highlight, keyboard-friendly tables, jump links. Dense but calm.

### Motion philosophy
Near-zero decorative motion. Instant state changes. Palette snaps open like a command index.

### Strengths
Extremely on-brand for a systems/product engineer; scales with content; empty rows can say “—”; recruiter-scannable.

### Weaknesses
Can feel cold or “docs site”; must avoid fake terminal / hacker aesthetics; needs excellent typography to stay premium.

### Why someone would remember it
“His site was documented like a real system.”

### Why it is not a typical developer portfolio
Portfolios narrate personality first. A Spec Archive **indexes artifacts and revisions**.

### Wireframe

```
┌────────────────────────────────────────────────────────────┐
│ TITLE BLOCK                                                │
│ PERSONAL PRODUCT SURFACE          STATUS  Active   REV  —  │
│ Kartik Juneja · Senior Software Engineer                   │
│ Summary .............................................      │
│ [ Open Products ]  [ Curriculum ]  [ File Inquiry ]        │
├──────────────┬─────────────────────────────────────────────┤
│ CONTENTS     │  1. PRODUCT REGISTER                        │
│ Overview     │  Name        Status     Tech      Spec      │
│ Products     │  --------    ------     ----      ----      │
│ Capabilities │  (empty designed row / future entries)      │
│ Continuum    │                                             │
│ Writing      │  2. CAPABILITY INDEX                        │
│ Curriculum   │  Term — definition (or sparse)              │
│ Inquire      │                                             │
│              │  3. CONTINUUM (latest)                      │
│ Ctrl+K Jump  │  date — title — subtitle                    │
└──────────────┴─────────────────────────────────────────────┘
```

---

# Concept 03 — Field Notes

### Name
**Field Notes**

### Core idea
The site is an **engineer’s field notebook** opened flat: margin annotations, indexed entries, working thoughts beside finished work. Personal, rigorous, human — without casual-blog messiness.

### Target feeling
Intellectual craft. Curiosity. “In progress with standards.”

### First impression
Two-page spread. Left: identity + current focus (margin notes). Right: the day’s primary entry (product or continuum). Feels written, not marketed.

### Visual language
- Paper/ink in dark mode as “night desk” (ink on soft graphite), not cream cliché
- Ruled margins, footnote marks, asterisks used sparingly
- Warmth from typography, not from parchment backgrounds
- Accent = editor’s red / ink blue for annotations only

### Typography approach
- Display: literary serif for entry titles
- UI/meta: compact sans
- Margin notes in smaller size, distinct color
- Pull quotes rare and earned

### Grid / layout philosophy
Classic spread: margin (15%) · main column (55%) · aside (30%). Homepage is one open spread; inner pages continue the notebook metaphor.

### Navigation style
Notebook tabs or top “sections” as index labels: Front · Works · Log · Essays · Gear · Now · Back matter (Resume/Contact)  
Ctrl+K = “Find in notebook.”

### Hero composition
**Open spread**, not banner:

- Verso: name, role, focus, availability (annotation style)
- Recto: lead entry (featured product note OR continuum lead OR designed blank ruled page)

### Homepage structure
1. Spread (identity + lead entry)
2. Index of recent entries (products/writing/experiments mixed by date when exist)
3. Log excerpt (timeline)
4. Back matter strip: Curriculum · Correspondence

### How products are presented
Each product is a **long entry** with frontmatter as header metadata. List views look like a table of contents with page marks, not cards.

### How experience is presented
“Log” — dated field entries from timeline/experience. Reads like a ship’s log, not LinkedIn.

### How resume integrates
“Back matter / Curriculum vitae” — separate sheet style inside the notebook system.

### How contact integrates
“Correspondence” — letter-like inquiry (salutations optional; keep professional). Mailto compose.

### Interaction style
Underline/ink highlight on links; margin markers appear on hover for “related.” Page turns are not literal animations — content crossfades gently.

### Motion philosophy
Page-turn is metaphorical only. Subtle ink fade-ins. Prefer stillness.

### Strengths
Distinctive, human, scales with writing + experiments + products; empty ruled page can be beautiful.

### Weaknesses
Risk of looking like a blog or Medium clone if serif is overused; must stay product-serious; recruiters may need a clear Curriculum path.

### Why someone would remember it
“It felt like reading a careful notebook of a builder.”

### Why it is not a typical developer portfolio
Portfolios showcase; field notes **record**. The metaphor privileges process and artifacts over self-promotion layout.

### Wireframe

```
┌─────────────────┬──────────────────────────┬────────────────┐
│ MARGIN          │ MAIN ENTRY               │ ASIDE          │
│                 │                          │                │
│ KJ              │  LEAD TITLE              │  Focus         │
│ Engineer        │  ─────────────────       │  ~~~~~         │
│                 │  Body / featured work    │                │
│ * Now           │  note or sparse ruled    │  Related       │
│ * Focus note    │  page                    │  · Resume      │
│                 │                          │  · Inquire     │
│ [tabs index]    │                          │  · Log         │
├─────────────────┴──────────────────────────┴────────────────┤
│ INDEX  01 Works  02 Log  03 Essays  04 Gear                 │
└─────────────────────────────────────────────────────────────┘
```

---

# Concept 04 — Signal Desk

### Name
**Signal Desk**

### Core idea
The homepage is a **broadcast desk for product signal**: what is shipping, what is learning, what is available — a living status surface for a product builder. Not a metrics dashboard; a calm control strip + narrative channel.

### Target feeling
Operational clarity. Current. Professional urgency without hype.

### First impression
A status masthead: AVAILABILITY · FOCUS · LAST UPDATED. Then a primary “signal” story. Feels like opening a product ops room that respects quiet.

### Visual language
- Dark console neutrals; one luminous signal color (teal/amber — choose one)
- Horizontal rules as channels
- Modules as **channels**, not cards (full-bleed rows)
- Typography-led; icons minimal and functional
- Avoid charts, KPI tiles, fake graphs

### Typography approach
- UI: medium sans, slightly technical
- Headlines: confident sans, not serif poster
- Status labels in small caps / tracked caps

### Grid / layout philosophy
Stacked channels (100% width bands). Each band is one job. Rhythm = alternating density (tight status → open narrative → tight index).

### Navigation style
Persistent utility bar: Signal (home) · Products · Capabilities · Log · Writing · CV · Desk (contact)  
Ctrl+K labeled “Command.”

### Hero composition
**Masthead + primary signal:**

1. Name + role (compact)
2. Status strip (from `availability.json` / Now)
3. Primary signal block (one paragraph when written; designed sparse otherwise)
4. Dual actions: Open CV · Send brief

### Homepage structure
1. Masthead / status
2. Primary signal
3. Product channel (horizontal index)
4. Capability channel (inline chips → definitions page)
5. Log channel (3 events)
6. Desk (contact CTA band)

### How products are presented
Channel rows: name — status — one line — action. Detail pages are “deep signal” / case study. Empty channel = single quiet band, not a grid of voids.

### How experience is presented
Log channel feeding Timeline page; homepage shows only latest pulses.

### How resume integrates
CV is a first-class utility in the masthead (always visible). Printable route unchanged in engine.

### How contact integrates
Bottom “Desk” band — inquiry as sending a brief to the desk. Mailto.

### Interaction style
Channel hover = left signal bar illuminates. Keyboard users tab through channels cleanly.

### Motion philosophy
Status dots breathe once on load (subtle). Channel expands content height carefully. No parallax.

### Strengths
Excellent for “Now” + availability; recruiter-friendly; product-ops metaphor fits a builder; empty channels degrade gracefully.

### Weaknesses
Can slide into dashboard cliché if KPI tiles creep in; must stay editorial-operational, not analytics cosplay.

### Why someone would remember it
“His homepage was a live signal, not a brochure.”

### Why it is not a typical developer portfolio
Portfolios are static about-me posters. A Signal Desk is **time-aware and status-aware**.

### Wireframe

```
┌────────────────────────────────────────────────────────────┐
│ KJ · Senior Software Engineer     CV    Command    Desk    │
├────────────────────────────────────────────────────────────┤
│ STATUS  Availability ——  Focus ——  Updated ——              │
├────────────────────────────────────────────────────────────┤
│ PRIMARY SIGNAL                                             │
│ One clear paragraph / designed sparse                      │
│ [ Open CV ]  [ Send brief ]                                │
├────────────────────────────────────────────────────────────┤
│ PRODUCTS CHANNEL                                           │
│ name —— status —— line ——→                                 │
│ (or one sparse band)                                       │
├────────────────────────────────────────────────────────────┤
│ LOG CHANNEL   date  event  date  event  date  event        │
├────────────────────────────────────────────────────────────┤
│ DESK  Project inquiry CTA                                  │
└────────────────────────────────────────────────────────────┘
```

---

# Concept 05 — Continuum

### Name
**Continuum**

### Core idea
Time is the interface. The site is a **single vertical continuum** of building: education, work, products, writing, experiments — one scrollable spine. Homepage = the continuum itself, not a marketing funnel.

### Target feeling
Inevitability. Progress. Narrative seriousness. “This person builds over years.”

### First impression
Your name pinned at the top of a long spine. The eye immediately travels down through time. Products and roles appear as nodes on one path.

### Visual language
- Strong vertical axis (spine), not card grid
- Nodes with year markers; chapters open as panels
- Monochrome + one accent for “now” node
- Wide margins; content hangs off the spine left/right alternately (editorial zigzag)

### Typography approach
- Years in large display numerals
- Event titles in medium sans/serif hybrid system
- Body reserved for expanded nodes

### Grid / layout philosophy
One column spine with alternating left/right entries on desktop; single stack on mobile. Homepage *is* the layout system.

### Navigation style
Floating year rail or top jump: Now · Products · Work · Education · Writing · CV · Contact  
Ctrl+K searches nodes across types.

### Hero composition
**Origin header** (compact) + **Now node** emphasized, then scroll into history/future placeholders.

No traditional hero image. The continuum *is* the hero.

### Homepage structure
1. Identity stub (name, role, one sentence)
2. NOW node (availability/focus)
3. Product nodes (when exist) interleaved with work nodes
4. Education nodes
5. Writing/experiment nodes (when exist)
6. End cap: CV + Inquiry

### How products are presented
Product nodes expand to case study routes. In-list: name, status, year range. No separate “featured cards” section required.

### How experience is presented
Native — experience/timeline content *is* the homepage medium.

### How resume integrates
CV = filtered continuum (work + education + skills) in document layout; or “print this spine.”

### How contact integrates
End cap or sticky “Inquire” on the now node.

### Interaction style
Click node to expand inline or navigate. Scroll-linked accent on active year (subtle, respect reduced motion).

### Motion philosophy
Scroll reveals; optional gentle spine draw-on once. No playful bounce.

### Strengths
Maximally distinctive; uses existing timeline/experience content immediately; memorable scroll; scales by adding nodes.

### Weaknesses
Weaker “product marketing” landing if products are the future center; long scroll can tire; must avoid cheesy timeline kitsch; homepage may feel résumé-like if copy is thin.

### Why someone would remember it
“The whole site was one timeline of building.”

### Why it is not a typical developer portfolio
Portfolios section-hop. Continuum **abolishes sections** in favor of time.

### Wireframe

```
              │
   KJ · SSE   │  one sentence
              │
         ● NOW  focus / availability     [Inquire]
              │
         ○ 2022  Thinkflow (node)
              │
         ○ 2019  Intersoft / Horsepower
              │
         ○ 2015  B.Tech
              │
         ○ —    Products (future nodes)
              │
         ■ CV · Inquiry
              │
```

---

# Concept 06 — Instrument

### Name
**Instrument**

### Core idea
The site is a **precision instrument**: one object, finely made — like a measuring device or musical instrument UI. Every control has a purpose. The homepage is the face of the instrument; inner pages are modes.

### Target feeling
Exactness. Restraint. Expensive simplicity. “Nothing extra survived review.”

### First impression
A single centered instrument face: name as inscription, three primary modes as controls, a readout for status. Negative space is the luxury material.

### Visual language
- Extreme reduction of chrome
- One surface, one accent needle/readout color
- Geometric alignment; optical centering
- No cards, no pills cluster, no tag clouds on home
- Soft material gradients (metal/glass) used once, carefully — not glossy skeuomorphism

### Typography approach
- Few sizes. Display inscription + one body size + one micro label size
- Tabular figures for any numbers/dates
- Name letterspacing tuned like engraving

### Grid / layout philosophy
Centered column (max ~40–48rem) for home; wider for case studies only. Symmetry as a feature.

### Navigation style
Mode switcher: Overview · Works · Practice · Writing · Now · CV · Contact  
Looks like segmented instrument modes (not pill soup — segmented control). Ctrl+K = “Override / Jump.”

### Hero composition
**Instrument face:**

```
[ inscription: Kartik Juneja ]
[ readout: role ]
[ status window: focus/availability ]
[ three controls: Works | CV | Contact ]
```

### Homepage structure
Almost nothing else on first viewport. Below fold only if content earns it:

1. Instrument face  
2. Optional “selected work” single module  
3. Stop

Deep content lives in modes, not on the home scroll.

### How products are presented
Works mode = list or single-column index. Case study = full-bleed reading mode. Home shows at most one selected work.

### How experience is presented
Practice mode (timeline/about facts). Not on home.

### How resume integrates
CV mode — first-class control on the face.

### How contact integrates
Contact mode / control — inquiry form as a panel.

### Interaction style
Controls depress subtly; readout updates. High focus visibility. Feels mechanical and precise.

### Motion philosophy
Needle/readout transitions; mode crossfade. Very short durations. Luxury = stillness.

### Strengths
Highest differentiation via reduction; unforgettable if executed with craft; forces content quality; empty states are simply dim readouts (“—”), which can look intentional.

### Weaknesses
Hardest to execute; easy to look unfinished if spacing/type are wrong; little room for storytelling on home; may feel austere to some clients.

### Why someone would remember it
“His site was one instrument — nothing else.”

### Why it is not a typical developer portfolio
Portfolios accumulate sections. An Instrument **refuses accumulation** on the home face.

### Wireframe

```
┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│              KARTIK JUNEJA                   │
│         Senior Software Engineer             │
│                                              │
│         ┌────────────────────┐               │
│         │  FOCUS / STATUS  — │               │
│         └────────────────────┘               │
│                                              │
│         [ Works ] [ CV ] [ Contact ]         │
│                                              │
│              Command  Ctrl+K                 │
│                                              │
└──────────────────────────────────────────────┘
         (optional single work below)
```

---

## Comparison

| Criterion | Atelier | Spec Archive | Field Notes | Signal Desk | Continuum | Instrument |
|-----------|---------|--------------|-------------|-------------|-----------|------------|
| Memorability | Very high | High | High | High | Very high | Extreme (if crafted) |
| Product-first | Excellent | Excellent | Good | Excellent | Good | Excellent (via Works mode) |
| Works with empty products | Excellent (canvas) | Strong (empty register) | Strong (ruled blank) | Strong (quiet channel) | Medium | Strong (dim readout) |
| Recruiter clarity | Medium | Excellent | Medium | Excellent | Good | Good (CV control) |
| Client clarity | High | High | Medium | High | Medium | High |
| Developer appeal | High | Very high | High | High | High | Very high |
| Scales with writing | Medium | Good | Excellent | Good | Excellent | Medium |
| Scales with products | Excellent | Excellent | Good | Excellent | Good | Excellent |
| Risk of template feel | Low | Low–Med (docs) | Med (blog) | Med (dashboard creep) | Med (timeline kitsch) | Low (if pure) |
| Execution difficulty | High | Medium | High | Medium | Medium | Very high |
| Fits current content model | Excellent | Excellent | Excellent | Excellent | Excellent | Excellent |
| Distinct from portfolio | Strong | Strong | Strong | Strong | Strong | Strongest conceptually |

### Ranking (long-term potential, not taste)

Scored against the required outcome: *communicates a software engineer who builds products; scales with content; highest chance of being memorable; avoids portfolio/SaaS/dashboard clichés.*

| Rank | Concept | Score | Rationale |
|------|---------|------:|-----------|
| 1 | **Product Atelier** | 9.1 | Best balance of memorability, product-first identity, graceful emptiness, and long-term case-study growth |
| 2 | **Instrument** | 8.7 | Most distinctive if craft is perfect; slightly riskier and thinner for narrative/writing growth on home |
| 3 | **Spec Archive** | 8.4 | Clearest professional signal and scaling; slightly less “emotional memory” than Atelier/Instrument |
| 4 | **Signal Desk** | 8.0 | Excellent ops/Now framing; higher cliché risk if discipline slips |
| 5 | **Continuum** | 7.6 | Unforgettable spine; less ideal as the permanent *product* center of gravity |
| 6 | **Field Notes** | 7.4 | Beautiful for writing-heavy future; easier to be misread as a blog/portfolio hybrid |

---

## Final recommendation

### Primary direction: **Product Atelier**

**Not because it is the safest** — gallery metaphors fail when they become Dribbble. It wins because it best satisfies the evaluation criteria simultaneously:

1. **Identity:** Positions Kartik as a **maker of software products**, not a person listing skills. The homepage’s job is to present works (or a deliberate empty canvas), not a template bio stack.

2. **Memorability:** “Software gallery / atelier” is rare in engineer personal sites and easy to recall after one visit — without neon, terminals, or dashboard theater.

3. **Scaling:** As `content/products/*.md` case studies arrive, they hang on the wall naturally. Writing becomes “notes,” timeline becomes “practice,” resume becomes “curriculum,” contact becomes “inquire” — mapped cleanly onto the existing content model and routes.

4. **Empty-state integrity:** A lit empty canvas with a short practice line is a coherent unfinished state. It does not require fake products. It does not need seven hollow capability cards on the home wall.

5. **Audience coverage:**  
   - Recruiters: Curriculum always one click; practice facts remain available.  
   - Clients: Inquire + works.  
   - Developers: Case study depth + Ctrl+K catalog.  
   - Product explorers: Exhibition plates.

6. **Architecture fit:** No new runtime paradigm. Page modules change composition; tokens/themes change; components shift from cards to frames/rails; search index still powers the catalog.

### Secondary (if Atelier feels too quiet in critique): **Spec Archive**

Choose Spec Archive if the priority shifts toward maximum recruiter/client scannability and documentation culture. It is the strongest “serious systems engineer” signal, with slightly less poetic memorability.

### Explicitly not recommended as the north star

- **Signal Desk** — strong, but easiest to accidentally become a dashboard template.  
- **Continuum** — powerful special homepage; weaker as the long-term product brand center.  
- **Field Notes** — reserve as a **writing mode aesthetic** inside Atelier notes, not the whole identity.  
- **Instrument** — outstanding as a *refinement pass* on Atelier’s chrome (reduction, inscription, mode controls), but as a solo direction it demands near-perfect craft and offers less homepage storytelling surface.

### Suggested synthesis (still one identity)

Commit to **Product Atelier** as the identity system, and borrow **one** discipline from Instrument:

- Extreme reduction on the opening wall  
- Few primary controls  
- No card grid on home  

And borrow **one** habit from Spec Archive:

- Product register available as an alternate view / catalog index for scannability  

That synthesis remains one memorable language — not a mashup of six metaphors.

---

## What this means for implementation later (guidance only)

When implementation is approved:

1. Do **not** iterate the current homepage in place. Replace the home page module’s composition.  
2. Restyle tokens and chrome to Atelier language (frames, margins, light, sparse nav).  
3. Demote empty routes from primary exhibition nav until content exists.  
4. Redesign empty states as canvases/catalog gaps, never CMS instructions.  
5. Keep case study section schema — it already matches exhibition text chapters.  
6. Resume/Contact remain routes; change only their presentational framing (Curriculum / Inquire).

---

## Decision ask

Approve **Product Atelier** (with optional Instrument reduction + Spec catalog view) as the visual north star before any UI implementation begins.

If rejected, the fallback for serious product positioning is **Spec Archive** — not a return to the current template homepage.
