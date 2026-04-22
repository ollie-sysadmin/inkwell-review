# Inkwell Review — Design System

**Insight for people who pay attention.**
A twice-weekly editorial publication. Statistical peculiarities of human behaviour, charted properly and argued well.

This repo is the **visual system** — typography, papers, wordmark, chart card, article page — treated as one thing. It exists to make new issues feel obviously continuous with the last one.

---

## The system in one paragraph

Everything lives in a **photocopied zine** register. Ink is `#111111`, paper is `#E1E1E1`. Hierarchy is carried by the **paper colour**, not by changing the ink. Six pastel papers map to the six editorial desks; a published page adopts **one paper, wall-to-wall** — purple for Cover, blue for Data, yellow for Voice, green for Cities, brown for Archive, pink for Interviews. Never two pastels on the same page. The home page is always photocopy-grey with a single **purple** accent.

Type is three families with strict jobs:
- **Atkinson Hyperlegible Soft** — ExtraBold for headlines, Regular for body.
- **DM Serif Display** — the wordmark, the giant footer, straplines, italic voice.
- **JetBrains Mono** — tabular numerals and chart axes only.

There is **no icon mark**. The wordmark is the whole brand. Ollie is a column — signed off with an em-dash and an italic _Ollie_.

---

## Files

| File | Purpose |
|---|---|
| `colors_and_type.css` | Single source of tokens — colours, type, rules, speckle, the two headline moves. |
| `Inkwell Review Design System.html` | Overview page. Photocopy-grey home with the wordmark footer. |
| `preview/*.html` | One card per registered piece — brand, colour, type, spacing, components. |
| `ui_kits/website/` | A real article page on Cities-green. The canonical long-form surface. |
| `ui_kits/social/` | Three 1080×1350 portrait social templates (cover, chart, number). |
| `social/*.html` | Stand-alone stat + quote cards at true size. |
| `fonts/` | Local Atkinson Hyperlegible Soft weights. |

---

## The two headline moves

Every component in the system leans on one of these two moves. Used sparingly; never both at once; never on body copy.

1. **Reversed-highlight** — `.t-highlight` wraps an inline run of words, paints a photocopy-black bar behind them, and reverses the ink to the current page colour. This is how we emphasise inside headlines, pull-quotes, and social cards.
2. **Circled emphasis** — `.t-circled` draws a slightly rotated hand-ish oval around a single word. For Voice/Ollie surfaces only.

---

## Colour rules

- **Ink `#111111` and paper `#E1E1E1` never move.** Buttons, borders, rules, and chart strokes are all ink.
- **One pastel per page.** Apply a `.cat-*` class to the page root. Never overlay a second pastel.
- **Home / index surfaces are always photocopy-white** with purple as the single accent.
- **Category swatches** appear as small square stamps in chips and article-card corners, so a category is legible even on photocopy-white.

The six pastels: `#CDA5EF` purple · `#ECADD4` pink · `#96C7F2` blue · `#ECDD85` yellow · `#97CF9C` green · `#DDB896` brown.

---

## Typography rules

- Atkinson Hyperlegible Soft is the working voice — headlines at 800, body at 400. It is set at 17/1.58 for body; 24–56+px for display.
- DM Serif Display is **never** used for body. It's the wordmark, the giant footer, italic standfirsts, italic attributions, and italic emphasis inside short sans-serif blocks.
- JetBrains Mono is **only** numbers — tabular data, chart ticks, issue codes (`Iss. 034`, `Fig. 01`).

Editorial voice moves:
- **Standfirst** — italic DM Serif, 22–24 px.
- **Byline/kicker** — Atkinson 800 caps with wide tracking.
- **Signoff** — an em-dash then italic _Ollie_ in DM Serif. That is the entire mascot system.

---

## Iconography & imagery

- **No bespoke icon mark.** The brand is the wordmark.
- **Unicode glyphs** do most icon work: `×`, `·`, `§`, `†`, `‡`, `—`, `–`.
- **Chart marks** (end-of-series dots, annotation arrows, callouts) are drawn inline in the chart SVG — never from an icon set.
- **Ollie's portrait** is a commission. The brand card shows a placeholder box at the correct size and weight.

Flags, for the commissioning brief:
- No icon set shipped. Substitute Lucide (stroke 1.5, 18–20 px, `currentColor`) as a placeholder.
- No photography shipped.
- The chart card is a demonstrator; production templates live in Astro.

---

## Using the system

1. Read `colors_and_type.css` — the only source of tokens. Import it at the top of any page.
2. For an article surface, copy `ui_kits/website/` and change the `.cat-*` class on `.ir-page` to the right desk.
3. For a social post, copy `ui_kits/social/` and pick `post--cover`, `post--chart`, or `post--num`.
4. For stand-alone cards (Instagram, Twitter), `social/*.html` are true-size drop-ins.

When in doubt, use less. The system is set on one paper, one family, one ink; adding a second of anything is usually a mistake.
