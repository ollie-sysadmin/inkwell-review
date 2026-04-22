# Inkwell Review — Social UI Kit

Portrait-first social images at 1080×1350. This is the trailer surface — Instagram, LinkedIn, Threads, Bluesky, and the hero image on X.

## Files

- `index.html` — A row of three canonical variants rendered side-by-side: cover, chart, big-number. Each is a 1080×1350 div you can screenshot or export directly.
- `kit.css` — All styles. Imports foundations from `../../colors_and_type.css`.

## Variants

1. **Cover** — issue-launcher for a carousel or a single-post announcement. Oversized display headline, italic vermilion tagline, the mark anchored top-right, signoff at the foot. Use on the first slide of an IG carousel.
2. **Chart** — the default post shape. Masthead strip → kicker → headline → standfirst → the chart (bounded by strong/hair rules) → foot. This is the one we run most weeks.
3. **Big number** — used when one statistic carries the story. Set in the display serif at 360 px, oldstyle numerals, vermilion accent. Italic caption contextualises it.

## Rules

- Always include the mark + wordmark in the top bar. Exception: cover variant, where the mark floats top-right.
- Always sign off: the caption-signature SVG at the foot-left, URL at the foot-right.
- Keep the kicker in uppercase vermilion, 0.18 em tracked. It situates the post in a series.
- Charts must include a source line, always italic Plex Sans, 18 px, ink-3.
- Dark variant is the same composition with `--bg`/`--fg` inverted to prussian/cream. Use for big-number posts where the figure should feel weightier.
