# UI Review Checklist

**Status:** Mandatory before every feature merge and every implementation batch  
**Authority:** [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) (frozen) · [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) · [DECISIONS.md](./DECISIONS.md)

Use this checklist to prevent drift from the Product Operating System constitution.

**Rule:** If any **Identity** answer is **No**, do not merge until corrected.  
Other sections: every applicable item must be **Yes** or **N/A** with a one-line reason.

---

## How to use

1. Complete this checklist for the changed screens/components in the PR or batch.  
2. Paste a short summary in the PR (or commit note): which sections passed, any N/A rationales.  
3. Do not reinterpret the constitution to make a “Yes” fit. Fix the UI instead.

**Change under review:** _______________________________  
**Reviewer / date:** _______________________________

---

## Visual Consistency

- [ ] **Yes / No / N/A** — Does this screen follow the Module Rail Grid (environment chrome + module header rails + grid/app shell continuity)?
- [ ] **Yes / No / N/A** — Are module header rails identical in anatomy (title · optional meta · optional Open · hairline)?
- [ ] **Yes / No / N/A** — Are module titles using the same type treatment across modules?
- [ ] **Yes / No / N/A** — Are spacing tokens (4px scale) used instead of arbitrary margins/padding?
- [ ] **Yes / No / N/A** — Are typography ramp rules respected (no oversized display type on Home)?
- [ ] **Yes / No / N/A** — Is hierarchy expressed with module spans / priority—not decorative emphasis (extra color, glow, unique chrome)?
- [ ] **Yes / No / N/A** — Are surfaces matte with hairline borders only (no glass, gradient brand, neon, noise, multi-layer showy shadows)?
- [ ] **Yes / No / N/A** — Does Home remain a module grid (not a marketing Hero → cards → CTA layout)?

Notes: _______________________________________________

---

## Navigation

- [ ] **Yes / No / N/A** — Does this reduce or hold navigation complexity (not expand it without cause)?
- [ ] **Yes / No / N/A** — Is Ctrl+K still a fastest-path system launcher for the destinations this change introduces?
- [ ] **Yes / No / N/A** — Does this avoid adding unnecessary destinations to chrome, Home, or footer?
- [ ] **Yes / No / N/A** — Are new deep pages framed as apps with clear return to Home?
- [ ] **Yes / No / N/A** — Do Resume and Contact remain reachable within two interactions where relevant?
- [ ] **Yes / No / N/A** — If a Home module or nav item was added, does it satisfy **Remove Before Add** (replace something or prove Home is clearer)?

Notes: _______________________________________________

---

## Components

- [ ] **Yes / No / N/A** — Is a new component actually required?
- [ ] **Yes / No / N/A** — Can ModuleShell, rows, SparseState, chrome, or launcher solve this without a new abstraction?
- [ ] **Yes / No / N/A** — Does this avoid violating **Remove Before Add** (no net clutter on Home)?
- [ ] **Yes / No / N/A** — Does any new component reuse the shared rail / token language (not a one-off visual island)?
- [ ] **Yes / No / N/A** — Are interactive elements real controls (not non-focusable fake buttons)?

Notes: _______________________________________________

---

## Motion

- [ ] **Yes / No / N/A** — Does any animation communicate state or orientation (not decoration)?
- [ ] **Yes / No / N/A** — Can this animation be removed without harming usability? If **Yes** (removable without harm), prefer removing it unless it is launcher/state feedback.
- [ ] **Yes / No / N/A** — Is duration short (≈120–220ms) with the shared easing?
- [ ] **Yes / No / N/A** — Is `prefers-reduced-motion` respected (instant/simplified states)?
- [ ] **Yes / No / N/A** — Are fake boots, page wipes, parallax, scrolljacking, and continuous ambient motion absent?

Notes: _______________________________________________

---

## Empty States

- [ ] **Yes / No / N/A** — Does the empty/sparse state feel intentional and calm?
- [ ] **Yes / No / N/A** — Are implementation details hidden (no file paths, Markdown/CMS instructions, “no backend,” architecture notes)?
- [ ] **Yes / No / N/A** — Does the ModuleShell header rail remain intact when the body is sparse?
- [ ] **Yes / No / N/A** — Would this still feel professional six months from now (no joke placeholders, no fake products)?
- [ ] **Yes / No / N/A** — Are grids of many identical “Coming Soon” cards avoided?

Notes: _______________________________________________

---

## Accessibility

- [ ] **Yes / No / N/A** — Keyboard navigation works for all new interactive elements
- [ ] **Yes / No / N/A** — Focus order is logical; `:focus-visible` is clearly visible
- [ ] **Yes / No / N/A** — Contrast meets AA at actual text sizes (including muted/meta)
- [ ] **Yes / No / N/A** — Semantic HTML is correct (`header` / `main` / `nav` / `section` + headings)
- [ ] **Yes / No / N/A** — Screen reader support is adequate (names, labels, dialog behavior for launcher)
- [ ] **Yes / No / N/A** — If launcher changed: focus trap, Esc to close, focus restore on close

Notes: _______________________________________________

---

## Performance

- [ ] **Yes / No / N/A** — No unnecessary DOM complexity (e.g. remounting full chrome per navigation, deep wrapper trees for show)
- [ ] **Yes / No / N/A** — No unnecessary JavaScript for purely decorative behavior
- [ ] **Yes / No / N/A** — Fonts and assets remain optimized (no heavy decorative assets; no unneeded font families on Home)
- [ ] **Yes / No / N/A** — Home budget still respected (~6–8 modules; minimal first-visit scroll; ≤2 expanded)

Notes: _______________________________________________

---

## Home budget & priority (when Home is touched)

- [ ] **Yes / No / N/A** — Visible Home modules stay within ≈6–8
- [ ] **Yes / No / N/A** — P0 (Current Focus, Products) remain protected and primary
- [ ] **Yes / No / N/A** — Lower-priority modules collapse before higher-priority ones lose clarity
- [ ] **Yes / No / N/A** — Mobile presents a clean vertical module list (not a dense dashboard)
- [ ] **Yes / No / N/A** — Depth lives in app routes, not Home sprawl

Notes: _______________________________________________

---

## Identity (merge gate)

Answer **Yes** or **No**. Any **No** blocks merge.

1. **If all colors became grayscale, would this still be recognizable as this website?**  
   - [ ] Yes - [ ] No

2. **If the logo / wordmark disappeared, would this still look like this website (Module Rail Grid / OS environment)?**  
   - [ ] Yes - [ ] No

3. **If another developer implemented the same requirements from the constitution alone, would they naturally arrive at the same visual language?**  
   - [ ] Yes - [ ] No

If any answer is **No**, the feature must not be merged until corrected.

---

## Homepage Done criteria (when Home is in scope)

- [ ] Visitor understands who builds the products within ~10 seconds  
- [ ] Resume reachable within two interactions  
- [ ] Inquiry reachable within two interactions  
- [ ] Products are the primary evidence of capability  
- [ ] Empty states intentional  
- [ ] No implementation details exposed  
- [ ] Recognizable in grayscale  

---

## Sign-off

| Field | Value |
|-------|--------|
| All non-N/A items Yes? | |
| Identity gate all Yes? | |
| Ready to merge? | |
| Reviewer | |
| Date | |

---

**End of checklist.**
