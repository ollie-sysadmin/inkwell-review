# Inkwell Review — Visual Identity Brief

*Working document for the visual identity work. Updated 19 April 2026 after Claude Design Session 2 completed.*

> **Note on tooling:** This work uses two tools in parallel. **Claude Code** (this project) handles text-based decisions, working code, templates, and version control. **Claude Design** (Anthropic's visual iteration tool, launched 17 April 2026) handled the visual system exploration in Session 2.

> **Note on history:** An earlier version of this brief listed typography (Fraunces / Inter Tight / JetBrains Mono), palette (navy / amber / sage / rust), and a masthead format (`INKWELL REVIEW · VOL. 47`) as "LOCKED". Those were lifted from the Extradition Atlas — a Claude-generated artefact Dene had not weighed in on. They were stripped. Session 2 in Claude Design then produced an entirely different direction, anchored on Namesake (namesake.fyi), which Dene iterated on directly. That system is now locked and lives at `brand/design-system/` with a canonical summary at `brand/visual-system.md`.

---

## Why we're doing this

Inkwell Review's distribution model, publishing pipeline, and editorial positioning are scoped (`strategy/distribution.md`). The visual system — typography, palette, logo treatment, masthead, signature moves — is now locked. What remains: port the system into the Astro codebase and build the content format templates.

---

## Starting constraints (all locked)

From `context/decisions-log.md`, `strategy/distribution.md`, and the Session 2 handoff:

- **Mood sentence** *(Decision 1, locked 18 April 2026)*: *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*
- **Editorial reference publications** *(Decision 1, locked 18 April 2026)*: Works in Progress, Monocle, The Economist. Position: *a Monocle-looking object containing Works in Progress-grade rigour, built around Economist-grade charts.*
- **Visual reference** *(Session 2, 19 April 2026)*: Namesake (namesake.fyi) — adopted during Claude Design iteration as the working visual anchor. The editorial reference trio above remains the *positioning* frame; Namesake is the *visual* inheritance.
- **Character:** Prof. Ollie Inkwell — a common octopus, editor. He is a *column*, not a mascot. He does not appear in the logo, masthead, or chrome. An illustrated Ollie portrait is deferred as a future commission.
- **Site role** *(locked 19 April 2026)*: inkwellreview.com is canonical. Visual system must work as website pages *and* on 1080×1350 social images.
- **Stack** *(locked 19 April 2026)*: Astro + Tailwind + Vercel. Templates are `.astro` components.
- **Typography** *(Session 2, locked 19 April 2026)*: Atkinson Hyperlegible Soft (body + display, 200–800) + DM Serif Display (wordmark + italic voice) + JetBrains Mono (numerals only).
- **Palette** *(Session 2, locked 19 April 2026)*: photocopy ink `#111111` + photocopy paper `#E1E1E1` (never move) + six pastel papers mapped to six editorial desks. Purple `#CDA5EF` is the single site-wide accent on photocopy-white surfaces.
- **Logo** *(Session 2, locked 19 April 2026)*: no icon mark. Wordmark (DM Serif Display, stacked "Inkwell / Review") is the entire brand.
- **Ollie's signature mark** *(Session 2, locked 19 April 2026)*: typographic — em-dash + italic "Ollie" in DM Serif Display.
- **Masthead** *(Session 2, locked 19 April 2026)*: three tiers (caps rail · wordmark + nav · italic serif strap) bounded by 6 px double-rules. Active nav chip reverses to current paper colour.
- **Two signature moves** *(Session 2, locked 19 April 2026)*: reversed-highlight and circled emphasis. Never both in same block; never on body copy.

See `brand/visual-system.md` for the full brand book, or `brand/design-system/` for the implementation handoff (tokens, fonts, UI kits, preview cards, chat iteration history).

---

## The six decisions

### Decision 1 — the identity mood *(Claude Code, LOCKED 18 April 2026)*

> *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*

The upstream test every future piece is held against. Editorial references: Works in Progress / Monocle / The Economist. Visual reference added Session 2: Namesake.

### Decision 2 — typography & palette *(Claude Design, LOCKED 19 April 2026)*

- **Typography:** Atkinson Hyperlegible Soft (everywhere readable, 200–800) + DM Serif Display (wordmark + italic voice) + JetBrains Mono (numerals only).
- **Palette:** photocopy ink `#111111` + photocopy paper `#E1E1E1` + six pastel papers (purple / pink / blue / yellow / green / brown) + purple accent on home surfaces only.
- **Desk → paper mapping:** Cover=purple, Data=blue, Voice=yellow, Cities=green, Archive=brown, Interviews=pink.

Tokens at `brand/design-system/project/colors_and_type.css`. Fonts at `brand/design-system/project/fonts/`. Full spec at `brand/visual-system.md`.

### Decision 3 — the logo system *(Claude Design, LOCKED 19 April 2026)*

- No bespoke icon mark. No monogram. No octopus silhouette in the chrome.
- Wordmark is the entire brand: "Inkwell / Review" stacked in DM Serif Display, italic second line.
- An illustrated Ollie portrait is reserved as a future commission in the fine-line Namesake-snail register.

Lockup references: `brand/design-system/project/preview/brand-logo-primary.html` and `brand-logo-reversed.html`.

### Decision 4 — Ollie's signature mark *(Claude Design, LOCKED 19 April 2026)*

Typographic: em-dash + italic "Ollie" in DM Serif Display. No drawn mark. Used at the end of Voice-desk columns and editorial signoffs.

Reference: `brand/design-system/project/preview/brand-ollie.html`.

### Decision 5 — the masthead treatment *(Claude Design, LOCKED 19 April 2026)*

Three tiers, bounded top and bottom by 6 px double-rule:

1. **Caps rail** — 10 px Atkinson 800, 0.2em tracking, meta info (issue + date left, section right), 1.5 px bottom rule
2. **Main** — wordmark left (DM Serif Display 72 px stacked), nav right (Atkinson 800 12 px caps, 0.18em tracking, active chip reverses to current paper colour)
3. **Strap** — italic DM Serif 15 px (left standfirst + right attribution), 1.5 px top rule

Implementation: `brand/design-system/project/ui_kits/website/kit.css` and `index.html`. Preview: `brand/design-system/project/preview/components-masthead.html`.

### Decision 6 — the template library *(Claude Code, IN PROGRESS — Cartography locked Session 4, four templates remain)*

Five Astro components, one per content format, built on top of the locked visual system:

| Template | Purpose | Status |
|---|---|---|
| `Cartography.astro` | Maps (Extradition, Fugitives, Popes) | **LOCKED 20 April 2026 (Session 4).** Plate × Photocopy Hand hybrid. See `brand/visual-system.md` § Plate. |
| `Life.astro` | Life-stage line charts | Open — Session 6+ |
| `Shrinkage.astro` | Before/after or over-time comparisons | Open — Session 6+ |
| `Grid.astro` | Small multiples | Open — Session 6+ |
| `Specimen.astro` | Single data point deep-dive | Open — Session 6+ |

Plus shared infrastructure:
- A page layout matching `brand/design-system/project/ui_kits/website/index.html` — masthead, deck, interactive chart slot, structured-prose slot (300–500 words for SEO), source citation, related pieces
- Auto-generated social variants per piece (1080×1350 / 1080×1080 / 1200×675 / 1080×1920 / OG) built at deploy time via the pipeline in `strategy/distribution.md`
- RSS entry, sitemap entry, OG meta — generated per piece

The Extradition Atlas is the obvious starting point for `Cartography.astro` once the visual system is ported.

---

## Two tools, one brand — where each task got done

| Decision | Where | Status |
|---|---|---|
| 1. Mood & references | Claude Code | LOCKED 18 April |
| 2. Typography & palette | Claude Design | LOCKED 19 April |
| 3. Logo system | Claude Design | LOCKED 19 April |
| 4. Ollie's signature mark | Claude Design | LOCKED 19 April |
| 5. Masthead treatment | Claude Design | LOCKED 19 April |
| 6. Template library | Claude Code | OPEN (Session 4) |
| Carousel slide design | Claude Design | NOT YET STARTED |
| Profile pic / banners | Claude Design | NOT YET STARTED |

---

## Revised session flow

**Session 1 — Distribution & strategy (DONE 19 April 2026)**
- Decision 1 locked
- `strategy/distribution.md` locked (8 decisions)
- Brief stripped of false locks

**Session 2 — Visual system in Claude Design (DONE 19 April 2026)**
- Decisions 2–5 locked
- Design handoff landed at `brand/design-system/`
- Canonical brand book at `brand/visual-system.md`

**Session 3 — Stack setup in Claude Code (NEXT, ~60 min)**
- Initialise Astro project (separate codebase, linked from this repo)
- Wire Tailwind + Vercel + Plausible
- Port tokens from `brand/design-system/project/colors_and_type.css`
- Port fonts from `brand/design-system/project/fonts/`
- Check Astrotypes backlog entry per `strategy/tooling-backlog.md` (applies only if fonts were Google Fonts — they're not, Atkinson ships local; Astrotypes doesn't help for Atkinson)
- Build the base page layout modelled on `ui_kits/website/index.html`

**Session 4 — First template (DONE 20 April 2026, ~extended session)**
- `Cartography.astro` built and locked — "Plate × Photocopy Hand" hybrid. Full interactivity (chips / havens toggle / URL state / tooltip)
- Extradition Atlas re-published through the template at `/pieces/extradition-atlas`
- **Two bonus rule changes landed out-of-scope:** body surface flipped to photocopy-white across the site with `--desk` accent mechanism; two-headline-moves rule relaxed (both marks general-purpose, one per headline)
- **4:5 portrait (1080×1350) locked as the primary social asset format**, with 1.91:1 for OG and 9:16 padded for Stories
- Piece #2 (Fugitive Destinations) slipped to Session 5 — the production-bar test moves with it

**Session 5 — Piece #2 + social card (~90 min + ~30 min)**
- Ship Piece #2 (Fugitive Destinations Map) on Cover desk via the Cartography template — the 90-minute production-bar test
- 4:5 social-card prototype for the Extradition Atlas at `brand/mockups/atlas-social-4x5.html`
- Any Cartography tweaks surfaced by Piece #2 production

---

## Reconciliations (resolved 19 April 2026)

1. **Desks + formats → orthogonal (Option a, locked).** Every piece has a **desk** (determines paper colour) and a **format** (determines template shape). Example: the Extradition Atlas is Data desk (blue paper) + Cartography format (map template). Formats and desks do not collapse into each other.
2. **Reference publications → Namesake added as the visual anchor (locked).** The editorial trio (Works in Progress / Monocle / Economist) stays as the *positioning* frame. Namesake (namesake.fyi) is now explicitly the *visual* inheritance anchor, not implicit. Both `brand/visual-system.md` and `context/decisions-log.md` reflect this.
3. **Ollie portrait → landed (locked).** A fine-line linocut portrait of Ollie in the Namesake-snail register now lives at `brand/assets/ollie-portrait.jpg`. The commission placeholder is dispensed with. The portrait is used on the about page, in the homepage "from the desk" editor's letter, and near the signoff on Voice-desk pieces. It does **not** appear in the masthead, logo, or chrome.

## Additional locked rule (19 April 2026)

- **Speckle texture is required on every page background** — both photocopy-white home/index surfaces and pastel-paper desk surfaces. The `.speckle` utility in `colors_and_type.css` is the mechanism. This aligns the system with the Namesake reference, which applies a subtle dot imperfection across all page backgrounds. Implementation reference: `brand/mockups/inkwellreview-home.html` (fixed overlay with `mix-blend-mode: multiply`).

---

## Claude Design usage — actual vs budgeted

- Budgeted for Session 2: ~50% of weekly allotment.
- Actual (19 April): one extended session covering typography, palette, logo, Ollie's mark, masthead, article page, social templates, preview cards. Full iteration from an Economist-adjacent first pass to the Namesake-anchored final system.
- Remaining budget estimate: ~50%. Enough for Session 3b (carousel slide design when Session 4 needs it) and profile pics / banners.

---

## Deliverables

- [x] `strategy/distribution.md` — distribution strategy *(locked 19 April 2026)*
- [x] `brand/claude-design-brief.md` — paste-ready brief for the Claude Design session
- [x] `brand/design-system/` — full Claude Design handoff bundle (tokens, fonts, preview cards, UI kits, chat history)
- [x] `brand/visual-system.md` — canonical brand book derived from the handoff
- [ ] `brand/assets/` — profile pictures, banners, avatars *(Claude Design, after Session 4 production-bar test)*
- [ ] Astro codebase — separate repo, set up in Session 3
- [ ] `Cartography.astro` — reusable map template (Session 4, adapted from Extradition Atlas)
- [ ] `Life.astro` / `Shrinkage.astro` / `Grid.astro` / `Specimen.astro` — remaining format templates (post Session 4)
- [ ] `CarouselSlide.astro` — shared carousel base (designed in Claude Design, refined in Claude Code)

---

## One honest note

Visual identity work has a failure mode: it becomes infinite. You can polish logos for weeks. Don't.

**The rule:** the identity is good enough when Piece #2 (the Fugitive Destinations Map) can be produced through the template in under 90 minutes. If it still takes 6 hours, the templates need more work. If it takes 90 minutes and looks right, stop and ship.

Perfect is the enemy of shipping. Shipping is what builds the brand.

---

*Last edited: 21 April 2026.*
