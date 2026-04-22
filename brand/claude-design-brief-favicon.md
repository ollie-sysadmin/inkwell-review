# Brief for Claude Design — Inkwell Review favicon

*Paste the contents of this file into a Claude Design session. It's self-contained — Claude Design has no access to the wider Inkwell Review project.*

---

## What you're designing

A **favicon** for **Inkwell Review** — the small mark that appears in a browser tab, a bookmark bar, a PWA install icon, and anywhere else a 16×16 to 512×512 square must represent the publication at a glance.

Inkwell Review is a twice-weekly editorial publication rendering statistical peculiarities of human behaviour into charts people remember. Data-driven, editorial, *Economist*-adjacent. Canonical home at **inkwellreview.com**. The full visual system is already locked — this favicon must live inside it, not redefine it.

## The mood (locked, do not redesign)

> *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*

The favicon must feel like it belongs to this publication. Not playful-cartoon, not crypto-modern, not generic-startup. Editorial, confident, print-adjacent.

## What's already locked (and must be respected)

1. **Typography:** the wordmark "Inkwell Review" is set in **DM Serif Display**, italic where appropriate. Body is **Atkinson Hyperlegible Soft**. Both via Google Fonts.
2. **Palette:** photocopy-black ink (`#111`) on cream paper (`#F6EEDB`). Small accent swatches of paper-blue (`#96C7F2`), paper-purple (`#D3C1F7`), paper-yellow (`#ECDD85`), paper-green (`#97CF9C`) — used as desk colours on specific sections of the site, never as background for the whole brand.
3. **Atmosphere:** a "print shop" texture — fine speckle overlay, ink-jitter filter on reversed-highlight bars, occasional misregistration shadow on keynumbers. These are signature moves; the favicon can invoke them at tiny scale but must not rely on them (they'll be illegible at 16×16).
4. **Ollie does NOT appear in the chrome.** Prof. Ollie Inkwell is the editor persona — a common octopus — but he is **not** part of the logo, masthead, or favicon. The wordmark alone is the brand. No tentacles in the favicon.

## What to explore (3 directions, ranked by risk)

Show three favicon concepts, one in each direction. All three must be rendered at **16×16, 32×32, 128×128, and 512×512** on a light tab background AND a dark tab background.

### Direction 1 — Wordmark fragment (lowest risk)

A single capital letter — probably **"I"** — set in DM Serif Display, photocopy-black on cream. Exploit the distinctive serifs. Monolithic, recognizable at tiny sizes because of the bold vertical + foot serifs. The most conservative choice; it's basically "the first letter of the masthead."

Open variation: try it also as "IR" as a tight two-letter monogram, with and without italic.

### Direction 2 — Ink-mark glyph (middle risk)

An abstract editorial mark that suggests the inkwell without being a literal inkwell drawing. Think: a bold serif foot that reads as both a letterform and an ink stroke; a capital "I" with a hairline crossbar that hints at a dip-pen nib; a typographic dropcap with a slight misregistration halo. Should still feel like it belongs to the masthead.

Not a cartoon inkwell. Not a quill pen icon. The reference is a well-cut serif specimen at tiny scale, not an illustration.

### Direction 3 — Abstract publishing mark (highest risk)

A purely geometric mark — a paper-swatch square, a hatched rectangle, a small cartouche — in the brand palette. Strips out the letterform entirely and relies on colour + form. Higher distinctiveness at thumbnail size, lower name-recognition.

Try both: **(a)** a single paper-swatch square with a thin photocopy-black frame, evoking the desk-colour system; **(b)** a tight hatched stripe pattern in two swatches.

## Constraints

- **Must work at 16×16.** This is non-negotiable. If a concept only works at 128×128, it fails.
- **Both tab backgrounds.** Chrome light mode (cream background), Chrome dark mode (dark background). The favicon must read on both without needing a "dark variant" hack.
- **No fine detail.** Speckle overlay, ink-jitter, misregistration — these are signature moves of the wider brand but are noise at 16×16. Either bake them into a 512px "maskable" PWA icon only, or skip them.
- **SVG-native.** The favicon is SVG at the browser level (`<link rel="icon" type="image/svg+xml" href="/favicon.svg">`). A PNG fallback at 32×32 is nice-to-have.
- **Maskable PWA variant.** A 512×512 version with safe-zone padding for Android adaptive icons.
- **Do not modify the locked typography or palette.** Work within them.

## Deliverables

For the chosen direction:

- **`favicon.svg`** — optimised SVG, <2KB ideally. Ships to `site/public/favicon.svg` in the project.
- **`apple-touch-icon.png`** — 180×180 PNG for iOS home-screen.
- **`favicon-maskable.svg`** — 512×512 with safe-zone padding for Android PWA adaptive icons.
- **Specimen sheet** — all three tested sizes (16, 32, 128, 512) on both tab backgrounds, side by side, for review.

Runner-up directions should be exported as SVGs too, in case we want to test them live.

## How to start

Render all three directions as a specimen grid first — 16×16 at the top row, scaling up. That's the shortest path to killing the ones that don't work. Then iterate on the one that survives.

Optional: reference the existing masthead mockup and the wordmark specimen in the main Inkwell Review visual system (ask the user to paste them in) to make sure the favicon feels like it grew from the same type tree.

---

*Brief drafted 22 April 2026 in Claude Code. Source: `brand/claude-design-brief-favicon.md`.*
