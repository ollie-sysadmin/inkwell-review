# Inkwell Review — designer skill card

**Tone:** photocopied zine in an editorial register. Dinner-party chart credibility. Nothing slick, nothing shouty.

## System, in six bullets

- **Photocopy core.** Ink `#111111`, paper `#E1E1E1`. Never pure black or pure white. Borders, rules, chart strokes = ink.
- **Six pastel papers** carry hierarchy, not ink colour: purple `#CDA5EF`, pink `#ECADD4`, blue `#96C7F2`, yellow `#ECDD85`, green `#97CF9C`, brown `#DDB896`. **One paper per page, wall-to-wall.**
- **Desk mapping (locked):** Cover=purple · Data=blue · Voice=yellow · Cities=green · Archive=brown · Interviews=pink. Home = photocopy-white with purple as the only accent.
- **Three families, strict jobs.** Atkinson Hyperlegible Soft 200–800 (everything readable), DM Serif Display (wordmark, giant footer, italic standfirsts/attributions/editor-voice), JetBrains Mono (numerals only).
- **No icon mark.** The wordmark is the entire brand. Ollie is a column — signed off `— Ollie` in italic serif.
- **Rules:** 1 px hair · 1.5 px default · 2 px strong · 4 px thick · 6 px double. No drop shadows on type, no gradients, no textures. Square corners by default.

## Two headline moves

Everything that needs emphasis uses one of these. Never both in the same block, never on body copy.

- **Reversed-highlight** (`.t-highlight`) — an inline run of words reversed onto an ink bar. The bar takes ink, the text takes the page colour.
- **Circled emphasis** (`.t-circled`) — a rotated hand-drawn oval around a single word. Voice surfaces only.

## Components & default dimensions

- **Masthead.** Three tiers: caps rail · (wordmark / nav) · italic serif strap. 6 px double-rule top and bottom. Active nav chip reverses to the current paper colour.
- **Cards.** 1.5 px ink border, 14 px category swatch at the top-left corner, Atkinson 800 headline with one reversed-highlight run, italic DM Serif standfirst, Atkinson 800 meta foot.
- **Pull-quote.** 30 px display, top+bottom 4 px ink rules, reversed-highlight or circled — never both. Italic serif attribution.
- **Chart card.** Blue paper, 4 px ink rules, Atkinson 800 title, italic serif standfirst, JetBrains Mono axes, ink strokes only, italic serif source line.
- **Signoff.** `— Ollie` in 28 px DM Serif italic above a small caps Atkinson line.

## Hard nos

- No gradients, glows, textures beyond the optional `.speckle` dot noise.
- No accent colour beyond the category paper and the photocopy purple on the home surface.
- No second pastel on the same page.
- No emoji.
- No bespoke icon mark. No monogram. No octopus illustration in the chrome — that lives inside the Ollie column, as a placeholder until commissioned.

## When starting a new surface

1. Decide the desk. That locks the paper.
2. Import `colors_and_type.css`. Set `.cat-<desk>` on the page root.
3. Lay the masthead with the DM Serif stacked wordmark. Add the italic strap.
4. Set headline. Pick one reversed-highlight run. No more.
5. Close with `— Ollie` in italic serif.
