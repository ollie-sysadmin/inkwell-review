# Brief for Claude Design — Inkwell Review default OG image

*Paste the contents of this file into a Claude Design session. It's self-contained — Claude Design has no access to the wider Inkwell Review project.*

---

## What you're designing

A **default Open Graph image** for **Inkwell Review** — the 1200×630 PNG that social platforms (Twitter/X, LinkedIn, Facebook, Slack link previews, iMessage unfurls) show when someone shares a non-piece page from `inkwellreview.com` — the homepage, `/ai-info`, `/press`, `/about/*`, `/legal/*`.

**What this is NOT:** it is NOT the per-piece social card. Each published piece already has a bespoke 4:5 (1080×1350) social card auto-generated at build time, and the apex piece page also produces a 1200×630 OG derived from that. This brief is ONLY for the *default* — the fallback shown on pages that aren't a piece.

Inkwell Review is a twice-weekly editorial publication rendering statistical peculiarities of human behaviour into charts people remember. Data-driven, editorial, *Economist*-adjacent. The canonical home is `inkwellreview.com`. Full visual system is already locked — this OG image must live inside it, not redefine it.

## The mood (locked, do not redesign)

> *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*

When someone sees a shared Inkwell Review link in their LinkedIn feed or their Slack channel, the OG preview must signal: *this is a considered publication, not a marketing asset*. Magazine-front-page, not startup-hero.

## What's already locked (and must be respected)

1. **Wordmark:** "Inkwell Review" set in **DM Serif Display** (Google Fonts). Italic "Review" is an established variant used elsewhere in the masthead treatment.
2. **Body / small text:** **Atkinson Hyperlegible Soft** (Google Fonts).
3. **Palette:** photocopy-black ink (`#111`) on cream paper (`#F6EEDB`). Desk accent swatches: paper-blue (`#96C7F2`), paper-purple (`#D3C1F7`), paper-yellow (`#ECDD85`), paper-green (`#97CF9C`). These are used as section backgrounds on the site.
4. **Atmosphere (signature moves):** fine **speckle overlay**, **ink-jitter** on reversed-highlight bars, occasional **misregistration shadow** on keynumbers. These textures are what make Inkwell feel "print shop" rather than "Figma default." They should carry into the OG image.
5. **No Ollie in the chrome.** Prof. Ollie Inkwell is the editor persona (a common octopus), but he does NOT appear in the masthead, logo, or the OG image. The wordmark alone is the brand.

## Content that must be on the image

At a minimum:

- **Wordmark:** "Inkwell Review" — large, unambiguous, centred or left-aligned.
- **Tagline:** the publication's short standfirst. Use one of:
  - *"Statistical peculiarities of human behaviour, charted properly and argued well."*
  - *"Charts worth repeating at dinner — twice a week."*
  - (Pick whichever sits more comfortably in the composition; both are on-brand.)
- **Byline / publisher line:** "Edited by Prof. Ollie Inkwell" or "Twice weekly · Free" — small, lower-right or lower-left.

Nothing else is required. No URL, no CTA, no social handles. The wordmark IS the URL for anyone who's seen it once.

## What to explore (3 directions)

Show three compositions at 1200×630. All three share the locked palette + typography; they differ in structure.

### Direction 1 — Masthead-front (lowest risk, highest readability)

Centred composition. Wordmark "Inkwell Review" set large across the upper half. Tagline in italic Atkinson Hyperlegible Soft below, measured. Byline line at bottom in small caps DM Serif. Photocopy-black on cream. Subtle speckle overlay across the whole surface. A thin photocopy-black rule below the wordmark, with a single misregistration wobble — the house move.

Reference feel: a magazine cover rendered flat, like *Monocle*'s approach to its own product shots. Not a hero banner.

### Direction 2 — Split cartouche

A vertical split at roughly 1:1.6 — **left panel** carries the wordmark + tagline (photocopy-black on cream); **right panel** is a paper-swatch colour field (try all four swatches as variants) with a single bold keynumber or chart fragment motif in photocopy-black. The right panel carries "78%" or a thin hatched misregistration chart-block — suggestive of data without being a specific chart.

Reference feel: a newspaper editorial spread where the left column is the standfirst and the right column is a pull-stat.

### Direction 3 — Full-bleed coloured cartouche

Wordmark + tagline centred on a paper-swatch background (try paper-purple and paper-blue). Photocopy-black ink stays on top. Speckle overlay at higher density, a cartouche frame rule in photocopy-black around the whole composition with the misregistration shadow. Feels closer to a printed poster / specimen page than a magazine cover.

Reference feel: a letterpress specimen sheet — here is the publication's face, printed.

## Constraints

- **1200×630 exact.** This is the de facto OG standard (Twitter, LinkedIn, Facebook, Slack all crop to this). Do not ship 1200×628 or 1920×1080.
- **Readable at thumbnail.** Someone in LinkedIn's feed sees it at ~400×210. The wordmark and tagline must hold up at that scale. No fine ornament competing with the type.
- **Cream or paper-swatch backgrounds only.** No photographic hero, no gradient wash, no AI-generated "editorial texture" as background.
- **DM Serif Display for the wordmark is load-bearing.** Do not substitute.
- **Ship with sources, not just PNG.** The PNG is the deliverable, but the source file (SVG or Figma) must be exportable so we can regenerate at different crops (1:1 for Discord, 9:16 for Pinterest) if needed later.
- **Do NOT include Ollie's portrait.** The publication's face is the wordmark.
- **Do NOT include `inkwellreview.com`** written out — the URL is implicit from the share context. Clutter.

## What you're NOT designing here

- Per-piece social cards (4:5 and 1:1.91 OGs per piece) — already built in Astro templates.
- Homepage masthead — already designed and shipped.
- Favicon — separate Claude Design brief.
- Full-bleed Instagram Story template (9:16) — separate session.

## Deliverables

- **`default.png`** — 1200×630, photocopy-quality. Exported at 2× density (i.e. source 2400×1260) then downsampled to keep type crisp. Target <400KB. Ships to `site/public/og/default.png` in the project.
- **`default-source.svg`** (or Figma file) — editable source, so the OG can be regenerated at 1:1, 9:16, and 4:5 crops if the site adds a Pinterest or TikTok surface later.
- **Thumbnail specimen** — all three directions shown at 400×210 (LinkedIn-feed scale) and 1200×630 (native) side by side, for review.

## How to start

Render all three directions in 10 minutes of fast iteration, at both thumbnail and full sizes. Eliminate the ones that don't hold up at thumbnail. Then iterate composition on the survivor — tagline placement, misregistration amount, speckle density — against the mood sentence.

Reference check at every step: *does this feel like a publication I'd trust to fact-check itself?* If the answer is "it feels like a startup landing page," kill it and restart.

---

*Brief drafted 22 April 2026 in Claude Code. Source: `brand/claude-design-brief-og-default.md`.*
