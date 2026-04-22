# Brief for Claude Design — Inkwell Review visual system

*Paste the contents of this file into a Claude Design session. It's self-contained — Claude Design has no access to the wider Inkwell Review project.*

---

## What you're designing

**Inkwell Review** is a twice-weekly editorial publication rendering statistical peculiarities of human behaviour into charts people remember. Data-driven, editorial, distinctive. Published on Instagram, X, LinkedIn, Threads, Bluesky, and a weekly Substack newsletter, with the canonical artefact (an interactive HTML page per piece) on **inkwellreview.com**.

The publication is fronted by **Prof. Ollie Inkwell**, a fictional common octopus who plays editor. He signs off pieces with `— Ollie`. He appears in the logo, the masthead, the signature line, and occasional asides. He does *not* dominate the captions — voice is plain, sharp English; the character is seasoning, not costume.

You're designing the coherent visual system: typography, palette, logo, Ollie's signature mark, and masthead treatment. As one system, not five separate things.

## The mood (locked, do not redesign)

> *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*

This is the upstream test. Every visual decision is held against it. If a draft doesn't feel like *insight, meticulously sourced, worth repeating at dinner* — it's wrong.

## The references (locked)

Inkwell Review sits next to three publications on the shelf:

- **Works in Progress** — editorial DNA. Essayistic rigour, citation culture, a readership flattered into paying attention.
- **Monocle** — design DNA. Handsome object, confident grid, production quality, a considered artefact rather than a screenshot.
- **The Economist** — data DNA. Chart-first thinking, twice-weekly briefing cadence, authority without bluster.

**Position in one line:** a Monocle-looking object containing Works in Progress-grade rigour, built around Economist-grade charts.

## What you're solving (5 components, one system)

1. **Typography pairing.** Display + body + technical/numerical. Must work for: long-form website pages, large-display masthead, small UI text, large numbers in chart annotations, social images at 1080×1350.
2. **Palette.** Primary background, primary ink, accent, plus a small data palette (3–5 hues for chart use). Must support light-on-dark *and* dark-on-light — the website has both modes.
3. **Logo system.** Wordmark + mark, plus mark-only (favicon/avatar) and wordmark-only variants. Reversed (light/dark) variants for both.
4. **Ollie's signature mark.** A small graphic for the `— Ollie` signoff. Lightweight version for captions; richer version for the masthead and about page.
5. **Masthead treatment.** "INKWELL REVIEW" as a publication banner. Must work on: website header, top of every social image, IG carousel cover, newsletter header, merch.

These are not five independent decisions. They share type, share colour, share weight. **Iterate on the system, not on each piece in isolation.**

## Constraints

- **Tone:** editorial, investigative, *Economist*-adjacent. Not playful-cartoon, not minimal-modernist, not crypto-modern, not magazine-glossy.
- **Character:** Ollie is the editor, not a mascot. The octopus is a brand element, not a costume. He should be discoverable in the system but not loud.
- **Surface dual-purpose:** the website is canonical (interactive HTML pages, full reading experience) AND the social image (1080×1350 portrait dominant) is the trailer. Both surfaces need to feel like the same publication.
- **Atlas as reference, not anchor:** an earlier piece (the Extradition Atlas) used Fraunces, Inter Tight, JetBrains Mono on navy with amber + sage + rust. That was a Claude-generated draft, not a brand decision. Treat it as one possible direction, not a constraint. Depart entirely if a better system emerges.

## What you're NOT designing here

- Chart styling — handled separately in Astro templates after this system lands
- HTML/CSS implementation — done back in Claude Code after exports
- Carousel slide design — separate Claude Design session later

## Deliverables

For each component:

- **Typography:** specimen sheet showing display + body + numerical at multiple sizes; pairing rationale; web-font sources (Google Fonts / Adobe Fonts / commercial)
- **Palette:** hex values + usage rules (background / ink / accent / data); both modes (light-on-dark, dark-on-light); accessibility contrast notes
- **Logo:** SVG export (primary, mark-only, wordmark-only, reversed)
- **Ollie's signature mark:** SVG export (caption-version, masthead-version)
- **Masthead:** mockup at three surfaces (website header, social image top, carousel cover); rules for position/scale/colour

Final outputs go into `brand/assets/` of the Claude Code project.

## How to start

Suggested first move: explore typography pairings against the mood sentence. Show 3–4 pairings with the wordmark "INKWELL REVIEW" set in each, plus a short specimen of body copy and a chart-annotation number. The pairing that best supports *insight for people who pay attention, worth repeating at dinner* leads the rest of the system.

Then: palette against the chosen typography. Then: logo concepts using the chosen type as wordmark. Then: Ollie's signature mark drawing on the logo language. Then: masthead pulling everything together across the three priority surfaces.

---

*Brief drafted 19 April 2026 in Claude Code. Source: `brand/claude-design-brief.md`.*
