# Inkwell Review — Visual System

*Canonical brand book. Locked 19 April 2026, after Claude Design Session 2. Full implementation handoff — tokens, fonts, preview cards, UI kits, chat iteration history — lives in `brand/design-system/`.*

---

## Summary

Inkwell Review is a photocopied zine in an editorial register. Dinner-party chart credibility. Nothing slick, nothing shouty. Ink never moves; the paper changes by desk.

**Visual anchor:** [Namesake](https://namesake.fyi/) — adopted during iteration as the working reference. The locked mood sentence (*"insight for people who pay attention — meticulously sourced charts, worth repeating at dinner"*) still holds; the Works-in-Progress / Monocle / Economist trio remains the *editorial* positioning anchor even though the *visual* inheritance is Namesake-adjacent.

**Illustration register:** 19th-century natural history woodcut / Penguin Classics cover engraving. Heavy black ink linework, hatching and cross-hatching for shading, hand-printed imperfection. Reference plates: Diderot's *Encyclopédie*, Buffon's *Histoire Naturelle*, the linocut snail mark on namesake.fyi. Any commissioned or AI-generated illustration must read as if pulled from one of these volumes. Standard prompt template: `brand/asset-prompts.md`.

---

## Core rules

- **Photocopy ink `#111111` and paper `#E1E1E1` never move.** Borders, rules, chart strokes are all ink. Never pure black or pure white.
- **All pages have a photocopy-white body.** *(Updated 20 April 2026 — supersedes the earlier "wall-to-wall pastel per page" rule.)* The six pastel papers map to the six desks but live as **accents**, not page backgrounds. Where they appear: masthead/footer text, kicker swatches, chart-card fills, stat-card fills.
- **Masthead + Footer are constant, ink-black on every page.** *(Updated 20 April 2026.)* Text and rules inside the chrome take the current page's **desk accent** via the `--desk` token. On home / index surfaces the accent is purple (the site default). On a Data-desk piece it is paper-blue; on Cities, paper-green; and so on — so the chrome visually signals "you are in X" without shifting the content surface.
- **The desk colour's signature moment on an article page is the chart card.** A paper-fill, 4 px ink rules, hosting the interactive. One "splash of colour" per page beyond the chrome accent — the card — plus small kicker / swatch / stat-card accents. No wall-to-wall pastel.
- **Never two pastels on the same page** (still holds — the desk accent is the page's colour, and purple is only the home accent).
- **No bespoke icon mark.** The wordmark is the entire brand.
- **Ollie is a column, not a mascot.** Signed off `— Ollie` in italic DM Serif Display. An illustrated Ollie portrait is deferred as a commission placeholder.
- **Square corners by default.** No drop shadows on type. No gradients.
- **Speckle texture is required on every page background.** Two SVG scatter patterns at `brand/assets/speckle-{dark,light}.svg`, each ~90 randomly-placed circles in a 720–780 px tile. Apply as two fixed overlays: `body::before` with the dark pattern and `mix-blend-mode: multiply` (visible on the photocopy-white body), `body::after` with the light pattern and `mix-blend-mode: screen` (visible on ink surfaces — masthead + footer). Reference implementation: `brand/mockups/inkwellreview-home.html`. Avoids the gridded look that radial-gradient tiling produces.

---

## Desk → paper mapping (locked)

| Desk | Paper | Hex |
|---|---|---|
| Cover (lead essays) | Purple | `#CDA5EF` |
| Data (charts) | Blue | `#96C7F2` |
| Voice (Ollie / opinion) | Yellow | `#ECDD85` |
| Cities (environment) | Green | `#97CF9C` |
| Archive (history) | Brown | `#DDB896` |
| Interviews | Pink | `#ECADD4` |

Purple is both the Cover-desk paper and the home-surface accent.

**Desks + formats (locked 19 April 2026):** every piece has both a **desk** (from this list — determines the desk accent) *and* a **format** (from `context/decisions-log.md` — Cartography, Life, Shrinkage, Grid, Specimen — determines template shape). Example: the Extradition Atlas is Data desk (blue accent) + Cartography format (map template). The two axes don't collapse.

**Desk accent mechanism (locked 20 April 2026):** a single CSS custom property, `--desk`, carries the current page's desk colour. Set in `site/src/styles/global.css` on each `.cat-<desk>` class (e.g. `.cat-data { --desk: var(--paper-blue) }`) and defaulted to `--paper-purple` on home / index surfaces via `.home`. Every component that needs the accent — masthead text, masthead rule, footer text, kicker swatches, chart cards, stat tiles — reads `var(--desk)`, not a hard-coded pastel. Adding a new desk is a one-line change here.

---

## Typography

Three families, strict jobs.

| Family | Role | Notes |
|---|---|---|
| **Atkinson Hyperlegible Soft** | Everything readable — headlines (800), body (400), meta/kicker (800 caps with 0.1em tracking) | Ships locally: 14 weight/style woff2 files in `brand/design-system/project/fonts/`. From namesake.fyi. |
| **DM Serif Display** | Wordmark, giant footer, italic standfirst, italic attributions, italic Ollie signoff | Google Fonts. Never used for body copy. |
| **JetBrains Mono** | Numerals only — tabular data, chart axes, issue codes (`Iss. 034`, `Fig. 01`) | Google Fonts. Never used for prose. |

Body is set 17/1.58. Display is 24–56+ px. The giant footer wordmark uses `clamp(6rem, 22vw, 22rem)`.

---

## Palette tokens

Defined in `brand/design-system/project/colors_and_type.css`. Import this file at the top of any page.

```
--photocopy-black: #111111;   /* ink */
--photocopy-white: #E1E1E1;   /* paper */

--paper-purple:    #CDA5EF;
--paper-pink:      #ECADD4;
--paper-blue:      #96C7F2;
--paper-yellow:    #ECDD85;
--paper-green:     #97CF9C;
--paper-brown:     #DDB896;

--accent:          var(--paper-purple);  /* home-page accent only */

--fg-muted:        #1111119a;
--fg-subtle:       #11111166;
--border:          #11111122;
--border-strong:   #111111;
--rule:            #11111133;
```

Apply `.cat-cover | .cat-data | .cat-voice | .cat-cities | .cat-archive | .cat-interviews` to the page root (`body` or a top-level `.ir-page` wrapper) to set the background. `.home` forces photocopy-white.

---

## Two headline moves

Everything that needs emphasis uses one of these. **One mark per headline, editor's choice per piece. Never both in the same block. Never on body copy.** *(The earlier "circled emphasis on Voice / Ollie surfaces only" rule is superseded 20 April 2026 — both marks are now available on any headline, to avoid the reversed-highlight monoculture that was emerging.)*

1. **Reversed-highlight (`.t-highlight` / `.hl`)** — an inline run of words reversed onto an ink bar. The bar takes ink; the text takes the current page colour. Use for hard-news / data / archive headlines where the emphasis is a specific noun or number.
2. **Circled emphasis (`.t-circled` / `.circ`)** — a rotated (−2.5°) hand-drawn oval around a word or short phrase. Use for editorial / voice / specimen / feature headlines where the emphasis is a phrase the piece is *about* rather than a specific quantity. Namesake's "Guides" move.

Both carry the SVG ink-jitter filter (`feTurbulence` + `feDisplacementMap`, scale ≈ 1.4) so the edge reads as hand-stamped, not vector-perfect. Reference filter defs in `brand/mockups/inkwellreview-home.html` and `site/src/layouts/BaseLayout.astro`.

---

## Reinforcement moves (woodcut register)

Three small treatments that lift the page from "Swiss editorial" into the natural-history-broadsheet register. Use sparingly — they accumulate.

1. **Hand-stamped wobble rules.** Replace clean `border-bottom` strokes on major section dividers (lead kickers, section heads, editor's-letter top/bottom) with an SVG `<path>` background-image rendering a slightly wavy hand-stamped rule. Three weights defined as CSS custom properties (`--rule-wobble`, `--rule-wobble-heavy`, `--rule-wobble-double`); apply via `.rule-wobble-bottom` / `.rule-wobble-top` utility classes. Skip on micro 1 px borders inside cards — too noisy at small sizes.
2. **Drop cap on long-form lede paragraphs.** First paragraph after the editor's-letter or article standfirst gets a 5.4 em DM Serif Display capital, floated, padding-right ≈ 12 px. Penguin chapter-opening register.
3. **Ink-jitter on highlight bars.** See "Two headline moves" above — `feTurbulence` + `feDisplacementMap` filter applied to `.hl` spans.

---

## Atmospheric tray-wash

Full-bleed illustration (typically the masthead-tray motif or a similar engraved tableau) painted as a `::before` pseudo-element behind a content section, opacity 0.15–0.20. Black ink tint, not paper-purple — at low opacity, ink reads as a clean grey watermark; purple reads as nearly invisible pinkish wash. Breakout pattern: `position: absolute; left: 50%; transform: translateX(-50%); width: 100vw;` so the wash extends to the viewport edges even from inside a constrained `.page` container. Body needs `overflow-x: hidden` to prevent the breakout triggering a horizontal scrollbar.

Reference: the Recent Curiosities section in `brand/mockups/inkwellreview-home.html` uses `masthead-tray-ink.png` at 0.18 opacity, full viewport width, centered.

---

## Asset processing recipe (linocut sources)

Any black-ink linocut/engraving illustration delivered on a white background — whether commissioned, AI-generated, or pulled from public-domain plates — gets converted to a transparent PNG via a luminance-driven alpha curve, in the chosen tint colour (usually photocopy-ink `#111111`, paper-purple `#CDA5EF`, or a mid-grey for atmosphere).

**Recipe:**
- For each pixel, compute luminance (Rec. 709): `lum = 0.2126·R + 0.7152·G + 0.0722·B`
- If `lum >= HI`: alpha = 0 (fully transparent)
- If `lum <= LO`: alpha = 255 (fully opaque)
- Else: linear ramp `alpha = (HI - lum) / (HI - LO) * 255`
- Replace RGB with the target tint colour at every pixel

**Default thresholds:** `HI = 200, LO = 60` for clean linocuts (kills off-white backgrounds at lum 240+). Use `HI = 220, LO = 90` for sources with significant grey midtones (e.g. the Ollie portrait). Tune per-source.

**Always crop past any baked-in printed border first** — many AI sources and scanned plates have a 10–15 px black frame inside the image edge. Verify clean alpha=0 in the four corners of the output.

Reference Python implementation: any of the per-asset scripts run inline in conversation history, generating `ollie-portrait-purple.png`, `ollie-crawling-ink.png`, `masthead-tray-ink.png`, etc.

---

## Rules and lines

| Class | Weight |
|---|---|
| `.rule-hair` | 1 px |
| `default border` | 1.5 px |
| `.rule-strong` | 2 px |
| `.rule-thick` | 4 px |
| `.rule-double` | 6 px double |

Mastheads use 6 px double-rule top and bottom. Chart cards use 4 px rules. Cards use 1.5 px ink borders.

---

## Components

Canonical implementations live in `brand/design-system/project/preview/` and `brand/design-system/project/ui_kits/`. When Session 3 stands up the Astro project, these are the source to port from.

- **Masthead** (locked 20 April 2026, Monocle-style; chrome-accent rule added 20 April 2026) — type-only, centred: wordmark on a single line (`Inkwell` + italic `Review`, DM Serif Display, `clamp(48px, 10vw, 132px)`, white-space nowrap) → italic strap (17 px) → 6 px double-rule → centred section nav (Latest / Archive / Subscribe, 12 px Atkinson 800 caps, 28 px gap, active state is a 2 px underline — *not* a reversed chip). Ink-reversed background (`#111111`) on every page. **All purple text and rules in the masthead take `var(--desk)` — so the wordmark, strap, rule, and nav adopt the current page's desk accent** (purple on home, blue on a Data-desk piece, green on Cities, etc.). No image, no caps rail, no right-column stack — earlier "Option A ink-reversed" with right-column Ollie is superseded; see decisions-log 2026-04-20 (Wrap pass).
- **Article cards** — 1.5 px ink border, 14 px category swatch at top-left corner, Atkinson 800 headline with one reversed-highlight run, italic DM Serif standfirst, Atkinson 800 meta foot.
- **Pull-quote** — 30 px display, top + bottom 4 px ink rules, reversed-highlight or circled (never both), italic serif attribution.
- **Chart card** — *(superseded by the Plate component below as of 20 April 2026; earlier "blue paper, 4 px ink rules" generic chart card is retained only as a fallback for non-Cartography charts until Life / Shrinkage / Grid / Specimen templates land.)*

- **Plate — the Cartography format** *(locked 20 April 2026, Session 4)*. Any piece whose interactive is a map uses this. Anchored in Uberti & Cheshire's *Atlas of the Invisible* (typographic plate framing), Rougeux's *Byrne's Euclid* + *Werner's Nomenclature* (classifying legend grammar), Bickford-Smith's Penguin Clothbound Classics (strict system discipline + per-piece motif), and Chalabi + Inkwell's already-locked photocopy moves (ink-jitter, hatch fills, misregistration, wobble rules).

  **Structural grammar:**
  - **Cartouche** top-left of the plate, overhanging the frame edge. Two fields: `Fig. N` in 10 px Atkinson 800 caps with a vertical ink divider, then `Plate title` in italic DM Serif 16 px.
  - **Per-piece stamp** top-right of the plate, overhanging the frame edge. A single small inline `<svg>` (~30×22 px), ink-jittered, one motif per piece. The Extradition Atlas uses a suitcase; Fugitive Destinations could use a key; and so on — Bickford-Smith's "one repeating motif per cover" applied at piece level.
  - **Frame** — 1.5 px ink border, square corners. No wobble on the frame; wobble rules live *inside* as row dividers, not on the frame itself.
  - **Body grid** — two columns: map (2.15 fr) + plate-intro prose gutter (1 fr). The gutter carries a short 40–80-word intro that the long-prose SEO body continues below the plate.
  - **Classifying legend** — a `<table>` with four columns: glyph swatch · NAME (Atkinson 800 caps) · count (JetBrains Mono, right-aligned) · italic serif referent one-liner. Populated dynamically from the current anchor's sets.
  - **Stats strip** — 4 tiles, 1.5 px ink border, Atkinson caps label, big DM Serif Display number (`clamp(34px, 4vw, 52px)`). Each number carries a **two-plate misregistration**: a `var(--desk)`-coloured shadow offset 2 px behind the ink glyph, ink-jittered. The desk colour is never also a status fill — reserved for chrome only (kicker swatch, masthead, headline marks, misregistration shadow). It does **not** appear inside the chart.
  - **Wobble rules** top and bottom inside the plate, as row dividers between cartouche/body and stats/source.
  - **Source line** at the bottom of the plate, italic serif.

  **Map grammar** *(updated 21 April 2026, Session 5 — black-plate treatment locked from `brand/mockups/maps-black-background.html`. Long anchor-treatment exploration went through six rejected sub-variants before settling on the present spec.):*
  - **Chart-card fill (the "ocean")** — `#1F1F1F`, a charcoal one shade lighter than `var(--photocopy-black)` (`#111111`). The two-tone choice is deliberate: the ocean reads as a dark plate, the no-record countries read as ink-black, and the slim contrast between them keeps the country lattice visible inside the no-record mass (Africa, Russia, etc.) without making "no-record" any louder than it already is. **The desk colour stays in the chrome only** (kicker swatch, masthead, headline marks, misregistration shadow on the stat strip) and never enters the chart. **Reason:** desk-coloured plates were leaking the desk hue into the chart, making each cartography piece read as its own visual species. A constant dark plate gives every map artefact the same printer's-plate feel; status palette consistency lets a returning reader build colour memory across pieces.
  - **Countries** — solid brand paper-colour fills, no hatching. **All six brand paper colours are available for tier work** (no colour reserved for anchor): paper-green, paper-yellow, paper-pink, paper-brown, paper-purple, paper-blue. The current Atlas + Fugitive Destinations templates use green / yellow / pink / brown / purple; paper-blue is free for future pieces. **Photocopy-white** for the anchor (with a 1 px ink stroke) — the only country that's the lighter tone. **Ink-black** for no-record / no-treaty (only the lattice border visible).
  - **Country borders** — `var(--photocopy-white)` at `stroke-opacity: 0.7` and `stroke-width: 0.6`, bumped to `0.8` opacity on coloured fills and to `1.0 / 1.2px` on hover. The bumped opacity makes the country lattice clearly readable inside the no-record ink mass (Africa countries fully distinguishable from each other) without overwhelming the colour fills.
  - **Ink-jitter** on the path group (`<g>`) — kept. Borders still photocopied, not vector-clean.
  - **Tooltip** — photocopy-white, 1.5 px ink border, no shadow, DM Serif italic country name + Atkinson caps status + italic serif note. The brightness shift on hover is intentional — the tooltip is the breathing-room moment against the dark plate.
  - **Hatched-paper fills + ink hatching are SUPERSEDED** (was the original Plate × Photocopy Hand from Session 4, lines 175–179 prior). Hatched-on-black variant explored and rejected in `brand/mockups/maps-black-background.html` (Variant B): the Chalabi/Bickford-Smith hand survives in chrome but reads quieter than ink-on-paper, and the chart is busy enough already without a second textural layer.

  **Controls** (chips + haven toggle) live **outside** the plate, above it — functional UI, not plate ornament.

  Reference implementation: `site/src/templates/Cartography.astro`. Prototype decision history: `brand/mockups/atlas-direction-{a,b,c}.html` (rejected variants) + `brand/mockups/atlas-hybrid.html` (the locked hybrid).
- **Signoff** — `— Ollie` in 28 px DM Serif Display italic above a small-caps Atkinson byline.
- **Giant footer wordmark** — `.t-wordmark--giant`, `clamp(6rem, 22vw, 22rem)`, colour adopts the page background (so it reverses out of the ink closing bar).

---

## Chart conventions

- **Default mono.** Black / grey / current page colour only.
- **Multi-series:** chart background is ink or photocopy-white; series use the pastel palette as the data palette (not as decoration).
- **Ink strokes only.** No gradients, no shadows. Annotation arrows and callout dots drawn inline in the chart SVG — never from an icon set.

---

## Hard nos

- No gradients, glows, textures beyond `.speckle`
- No accent colour beyond the category paper and the photocopy purple on home surfaces
- No second pastel on the same page
- No emoji
- No bespoke icon mark, no monogram, no octopus illustration in the chrome
- No photography (deferred; referenced in the brief, not in this system)
- Lucide icons (stroke 1.5, 18–20 px, `currentColor`) only as placeholder until real editorial icons are commissioned

---

## When starting a new surface

1. Decide the desk. That locks the paper.
2. Import `brand/design-system/project/colors_and_type.css`.
3. Set `.cat-<desk>` on the page root (or `.home` for index surfaces).
4. Lay the masthead with the DM Serif stacked wordmark. Add the italic strap.
5. Set the headline. Pick **one** reversed-highlight run. No more.
6. Close with `— Ollie` in italic DM Serif if it's a Voice piece or an editorial signoff.

When in doubt, use less. The system is set on one paper, one sans family, one ink; adding a second of anything is usually a mistake.

---

## Implementation map

| What | Where |
|---|---|
| Design tokens (colour, type, scale, utilities, speckle) | `brand/design-system/project/colors_and_type.css` |
| Font files (Atkinson Hyperlegible Soft, 14 woff2) | `brand/design-system/project/fonts/` |
| Full article page (Cities-green) | `brand/design-system/project/ui_kits/website/` |
| Social templates (1080×1350 portrait — cover / chart / number) | `brand/design-system/project/ui_kits/social/` |
| Standalone social cards | `brand/design-system/project/social/` |
| Preview cards (brand, colour, type, spacing, components) | `brand/design-system/project/preview/` |
| Handoff README (from Claude Design) | `brand/design-system/README.md` |
| Source-of-truth skill card | `brand/design-system/project/SKILL.md` |
| Design iteration history (the chat) | `brand/design-system/chats/chat1.md` |

When Session 3 stands up the Astro project:
- Copy `colors_and_type.css` into the Astro project's global CSS (tailwind.config extensions or `src/styles/tokens.css`)
- Copy `fonts/` into `public/fonts/` and re-declare the `@font-face` rules
- Model `src/layouts/Article.astro` on `ui_kits/website/index.html`
- Model `src/components/Masthead.astro` on the masthead block in that file
- Port the Atlas's interactive map logic into `src/components/Cartography.astro` using the new tokens and type

---

## Still to commission / still open

- **Ollie's portrait — LANDED 19 April 2026.** Fine-line linocut portrait in the Namesake-snail register. File: `brand/assets/ollie-portrait.jpg`. Usage rules:
  - **Where it appears:** about page hero, homepage "from the desk" editor's letter, near the signoff on Voice-desk pieces.
  - **Where it does NOT appear:** logo, site chrome-by-default, social-image lockups (those stay wordmark-only). The horizontal Ollie (below) IS used in the site masthead as part of the locked Option A treatment; that's an intentional exception.
  - **Rendering:** always `mix-blend-mode: multiply` when placed on any paper (photocopy-white or pastel), so the white JPEG background disappears and only the ink reads. Minimum display size 160 px; never smaller.
- **Ollie's horizontal crawling mark — LANDED 20 April 2026.** Side-profile linocut, same register as the portrait. Source `brand/assets/ollie-crawling.png`; derivatives:
  - `ollie-crawling-trans.png` — older alpha extraction, kept for back-compat. Slight non-zero alpha in corners — prefer `ollie-crawling-ink.png` for new uses.
  - `ollie-crawling-ink.png` — clean-cropped (62 px in from each edge, removes baked-in printed frame), photocopy-ink `#111`, true alpha=0 corners. Use this for any surface where you want the raw octopus silhouette on light backgrounds.
  - `ollie-crawling-purple.png` — paper-purple `#CDA5EF` tinted variant, tightly cropped to a 1876 × 1100 horizontal band of the source.
  - **Where it appears:** currently no place on the home surface (the masthead is type-only; see locked masthead component). Reserved for future end-of-article decorative marks, about-page banner, or social-post lockups.
- **Tray-of-specimens illustration — LANDED 20 April 2026.** AI-generated naturalist's-tray engraving (pocket watch, inkwell, quill, newspaper, teacup, key, calipers, candle, top hat, sextant, magnifying glass, coin, envelope, spectacles). Source `brand/assets/masthead-tray-raw.png`; derivatives:
  - `masthead-tray-banner.png` — paper-purple, full-width banner crop (1536 × 410, aspect 3.75 : 1).
  - `masthead-tray-cluster.png` — paper-purple, dense right cluster only (976 × 410, aspect 2.38 : 1).
  - `masthead-tray-ink.png` — photocopy-ink, full-width banner crop. **The asset currently in production use** as the atmospheric wash behind Recent Curiosities.
  - **Where it appears:** behind Recent Curiosities at 0.18 opacity, full viewport width (see "Atmospheric tray-wash" above). Not in the masthead — explicitly rejected during the wrap pass.
- **Icon set.** Lucide as placeholder (stroke 1.5, 18–20 px, `currentColor`); editorial icons (if needed) to be commissioned later.
- **Photography / imagery style.** Described in principle, not illustrated with real assets.

---

*Locked 19 April 2026; major updates 20 April 2026 (Session 4 — body-surface rule, two-headline-moves rule, Plate component spec). The design system is a contract — changes require explicit approval via Claude Code and a new entry in `context/decisions-log.md`. Do not edit this file in isolation.*
