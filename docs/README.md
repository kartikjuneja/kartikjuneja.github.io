# Documentation index

Planning, constitution, and decision records for kartikjuneja.com.

The active product identity is **Product Operating System**, governed by the frozen design constitution. Do not reopen exploration without an explicit amendment.

---

## Binding (implement against these)

| Document | Role |
|----------|------|
| [../DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) | **Frozen design constitution** — visual/interaction law |
| [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) | Build order, required components, violation risks, checklists |
| [UI_REVIEW_CHECKLIST.md](./UI_REVIEW_CHECKLIST.md) | **Mandatory** pre-merge / pre-batch UI review |
| [RC_HARDENING_REPORT.md](./RC_HARDENING_REPORT.md) | Release candidate hardening findings + Go/No-Go |
| [V1_RELEASE_REPORT.md](./V1_RELEASE_REPORT.md) | Content ship + v1.0 release recommendation |
| [DECISIONS.md](./DECISIONS.md) | Why decisions were made; amendment log |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Technical architecture (router, content, search, themes) |

---

## Historical design process (reference only — not to reinterpret)

| Document | Role |
|----------|------|
| [../DESIGN_REVIEW.md](../DESIGN_REVIEW.md) | Critique of first UI pass; why template feel was rejected |
| [../DESIGN_DIRECTIONS.md](../DESIGN_DIRECTIONS.md) | Multi-concept exploration (Atelier, Spec, Instrument, etc.) |
| [../OPERATING_SYSTEM_DIRECTION.md](../OPERATING_SYSTEM_DIRECTION.md) | POS brief + comparison that led to approval |

These explain history. They must **not** override `DESIGN_SYSTEM.md`.

---

## Product / content ops

| Document | Role |
|----------|------|
| [../README.md](../README.md) | Setup, content map, pointers |
| [../TODO.md](../TODO.md) | Content placeholders still required |
| [../archive/previous-site/ARCHIVE.md](../archive/previous-site/ARCHIVE.md) | Old site archive note |

---

## Rule of thumb

- **Building UI?** → `DESIGN_SYSTEM.md` + `IMPLEMENTATION_GUIDE.md`  
- **Wondering why?** → `DECISIONS.md`  
- **Wiring content/router?** → `ARCHITECTURE.md`  
- **Tempted by a new vibe?** → Stop. Amend constitution + decisions, or don’t.
