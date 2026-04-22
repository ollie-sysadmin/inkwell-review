# AI image-generation prompts

*The prompt patterns that produced usable Inkwell Review illustrations. Reuse and remix; do not deviate from the style block.*

---

## Style block (always include verbatim)

> A hand-drawn linocut-style illustration. Heavy black ink linework, rough woodblock texture, visible hatching and cross-hatching for shading, irregular brushstrokes creating hand-printed imperfection. **Strict black-and-white only — no grey fills, no halftones, no colour. All darks rendered through dense cross-hatching, never as flat solid-black fills. Pure white background — no paper texture, no cream tone.** No text, headlines, letters, or typography of any kind. References: 19th-century natural history woodcut, Penguin Classics cover engraving, the linocut snail mark on namesake.fyi, plates from Diderot's *Encyclopédie* and Buffon's *Histoire Naturelle*.

The bolded constraints exist because the asset processing recipe (luminance-driven alpha extraction, see `brand/visual-system.md` § "Asset processing recipe") needs:
- **Pure white background** so transparent regions extract cleanly
- **No grey fills** so shading reads as crisp linework after tinting
- **No solid blacks** so dark regions don't become solid purple/grey blocks
- **No text** so there's no typographic content competing with the wordmark

If the tool ignores any of these, the output will need rework.

---

## Compositional flavours

Two patterns we've used; both work. Pick based on subject.

### A — Single specimen / portrait

For one creature, instrument, or focal object. Square or near-square output, subject filling roughly the central two-thirds.

> [Style block above.]
>
> **Subject:** [a horizontal common octopus crawling from left to right, monocle on visible eye, one tentacle holding a quill aloft / a single sextant, viewed from a three-quarter angle, with engraved scale markings / a brass pocket watch on its chain, lid open, Roman-numeral face, slight tilt to suggest weight].
>
> **Composition:** subject occupies the central two-thirds of the frame, generous negative white space on all sides, no background scene, no surrounding objects, no shadow ground beyond a thin baseline if needed. Square aspect ratio.

Used for: Ollie portrait, Ollie crawling.

### B — Naturalist's tableau / tray of specimens

For a collection of objects arranged as a Victorian display.

> [Style block above.]
>
> **Subject:** a "naturalist's tray of human specimens" — everyday human artefacts depicted as if mounted in a Victorian collector's display drawer. Include a selection from: a pocket watch with chain, an inkwell, a quill pen, a folded newspaper, a teacup on saucer, a brass key, a single coin, a top hat, an open envelope, a candle stub, a pair of spectacles, brass calipers, a wax-sealed letter, a sextant, a magnifying glass, a small compass.
>
> **Composition:** dense, intricate cluster of specimens occupying the **right 50 %** of the frame, like a richly stocked corner of a museum drawer. From the centre moving leftward, the spacing opens up — fewer, smaller, more scattered objects with generous negative space between them. The **far-left ~25 %** is nearly empty — only one or two small isolated specimens floating in white space, like marginalia. Aspect ratio: as wide as the tool will allow (5 : 1 ideal, 3 : 2 acceptable).

Used for: masthead-tray-raw.png.

**No octopus, no cephalopods, no marine creatures, no human figures, no faces** in tableau prompts — keep Ollie reserved for the single-portrait flavour.

---

## Aspect-ratio gotchas

Most chat-based image generators (ChatGPT image generation, Claude image tools) fight horizontal aspect ratios. They'll refuse 5 : 1 and silently return square; or they'll obey but cram more content in to "fill" the extra width.

- **For true banner shapes (3 : 1 or wider):** use **Midjourney** with explicit `--ar 5:1`, or **Ideogram** which handles arbitrary ratios in the UI. Both reliably produce wide outputs without composition collapse.
- **For square-ish single specimens (1 : 1 to 3 : 2):** any tool works.
- **If you only have a square-ish output but need a wide asset:** crop. Most square outputs from these tools have a band of empty whitespace top and bottom that crops cleanly to ~3 : 1 without losing content.

---

## Spec to send the tool

- **Aspect ratio:** as specified per flavour
- **Background:** solid pure white (not transparent, not cream — cleanest input for the alpha extraction recipe)
- **Resolution:** ≥ 2400 px on the long edge if available
- **Avoid:** colour, grey fills, photographic textures, signatures/watermarks, framing borders

---

## What to do with the output

1. Drop the raw file into `brand/assets/` with a descriptive name ending `-raw` (e.g. `masthead-tray-raw.png`, `ollie-crawling-raw.png`). Keep the raw — it's the source of truth.
2. Inspect the corners with PIL — many AI tools and scanned plates have a baked-in 10–20 px black frame near the edge. Crop past it before processing.
3. Run the asset processing recipe (see `brand/visual-system.md` § "Asset processing recipe") to produce the tinted, transparent PNG variants you actually use in the page (`-ink.png`, `-purple.png`, etc.).
4. Verify alpha = 0 in the four corners of the output before considering it shippable.

---

*Updated 20 April 2026.*
