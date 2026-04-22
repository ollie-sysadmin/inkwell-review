# Inkwell Review — Website UI Kit

High-fidelity recreation of the canonical reading surface on **inkwellreview.com**: a long-form HTML page per piece, built as a Monocle-grade object around an Economist-grade chart.

## Files

- `index.html` — A full issue page (masthead → article → chart → pullquote → subscribe → footer). Click-through nav on the masthead. Self-contained via React CDN + Babel.
- `kit.css` — All component styles. Imports `../../colors_and_type.css` for foundations.
- `Masthead.jsx`, `Article.jsx`, `Chart.jsx`, `Shell.jsx` — Reference React sources, factored for reuse. The `index.html` inlines its own versions for single-file demo, but these components mirror that shape.

## Components covered

- **Masthead** — three-tier nameplate (rail, brand + nav, italic tagline), with the mark beside the wordmark and a double-rule under the whole thing.
- **Article** — `Kicker`, `Headline` (hero / article / card sizes), `Standfirst`, `Byline`, `DropcapParagraph`, `PullQuote`, `Signoff`, `Footnote`.
- **Chart** — `LineChart` (Economist-style: thin dashed grid, one highlight series, end-dot label, source line) and `BigNumber` (oldstyle numerals, tabular numeric meta).
- **Shell** — `SubscribeStrip` (ink background, cream typography, vermilion CTA) and `SiteFooter` (double-rule, three-column nav, type colophon in the bar).

## Conventions

- Body measure capped at ~36em; charts break out to full article width.
- Kickers and meta are always IBM Plex Sans uppercase, 10.5–11 px, 0.14 em tracked.
- Display numbers use Newsreader oldstyle numerals. Tabular numbers in tables or axes use IBM Plex Mono with `font-variant-numeric: tabular-nums`.
- Signoff is placed after the final paragraph — the article is signed, every time.
