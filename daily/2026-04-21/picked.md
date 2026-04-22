# Picked — 21 April 2026

## Angle

**The adoption inversion: the US ranks 24th in generative-AI use.**

The headline story is the gap between investment dominance (US: $285.9B private AI capital, 23× China) and adoption rank (US: 28.3%, 24th — behind Singapore 61%, UAE 54%, and 21 others). The "AI race" framing assumes the country with the most labs and capital is the one using the tech most. The data says otherwise.

## Format

🗺️ Cartography. World choropleth of population-level generative-AI adoption.

## Desk

**TBD — proposing Data (paper-blue).** Confirm with Dene before chart styling.

## Source

Stanford HAI AI Index Report 2026, Chapter on public sentiment and adoption. The 28.3% US figure and Singapore/UAE toplines are sourced in the report; the full country list lives in the underlying Ipsos / YouGov / Stanford HAI global survey. Data step needs to find that source.

## Why this piece

- **Counterintuitive finding**: inverts the dominant narrative. US is the supply-side leader; not the demand-side leader.
- **Cartography fit**: world map with an ordinal adoption ranking is the natural visual.
- **Journalist flywheel**: bookmark-worthy for anyone writing about AI policy, workforce, competition.
- **SEO**: high-intent queries around "AI adoption by country" are well-defined.

## Pipeline bar

Ship through existing Cartography template (`site/src/templates/Cartography.astro`). Piece #2 (Fugitive Destinations) shipped in ~50 min through this template. Target: 2–3 hours end-to-end including carousel + captions + newsletter.

## Risks flagged

- **Definition of "adoption"**: AI Index blends multiple survey sources. Need to pick one clean definition (e.g. "used in past month") and stick with it. If sources conflict, kill the piece.
- **Country coverage**: need 30+ countries for a credible world choropleth. If the underlying survey is <30 countries, reshape as a ranked-list Grid instead.
