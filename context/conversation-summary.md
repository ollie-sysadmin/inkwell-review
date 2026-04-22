# Inkwell Review — How We Got Here

*A structured summary of the conversation that birthed this project. Written so that a future Claude Code session (or Dene re-reading this after a long break) can reconstruct the full context without the original chat thread.*

---

## The seed: the Extradition Atlas

The project began with a request from Dene to build "a beautiful, interesting map or visual showing the data on which countries have extradition treaties in place between each other."

We explored several visualisation approaches — network graph, chord diagram, choropleth — and settled on an **interactive choropleth with a multi-country anchor selector**, built as a single self-contained HTML artefact.

The final piece (`context/the-extradition-atlas.html`) included:
- 8 anchor countries (US, UK, EU, Australia, Canada, Russia, China, UAE)
- 4-state color coding (treaty in force / reluctant partner / no treaty / fugitive haven)
- Click-to-switch anchor country
- Hover tooltips with context notes
- Zoom/pan, stats strip, legend, editorial styling

Visual direction: editorial/investigative aesthetic — *The Economist* meets *FlightRadar24*. Dark navy background, warm off-white type, amber accent, restrained serif display (Fraunces).

**Why this mattered:** the atlas became the reference point for everything that followed. It proved a particular aesthetic worked, and it became Piece #1 of what would become the publication.

---

## The pivot: from one chart to a media brand

Dene asked for ideas for a quirky/thematic data-viz website or IG account. We surveyed the landscape (Information is Beautiful, Mona Chalabi, terribledata, sunny_sotnikova, Our World in Data), identified white space for "an anthropologist with a sense of humour", and proposed roughly 28 specific piece ideas across themes: geography of human behaviour, time and decay, scale and proportion, money, dark/taboo, niche-but-addictive.

Three positioning bets were offered: "The Map of X", "Things nobody has charted", or "The numbers behind the headlines".

Dene proposed a broader theme: **"How Humans Behave."** This became the thematic anchor, later refined.

---

## The mini business plan

Dene asked for a business plan readable on a 2-hour flight. We produced a ~15-page Word document (`field-notes-plan.docx` in the original chat) covering:

- **Working name:** Field Notes on Human Behaviour
- **Three positioning pillars:** Behavioural not economic, Editorial not academic, Handsome not trendy
- **Five reusable content formats:** The Map, The Life, The Shrinkage, The Grid, The Specimen
- **A launch slate of 12 pieces** (Extradition Atlas as #1, Fugitive Destinations as #2, What's Legal Where as #3...)
- **Posting cadence:** 2x/week on IG & TikTok, daily on X/Threads/Bluesky, weekly on LinkedIn and newsletter
- **Virality ingredients:** counterintuitive flip, personal insertion point, argument starter, screenshot moment, news hook
- **Journalist flywheel** as underrated growth channel
- **Five monetisation paths:** paid newsletter, prints/posters, sponsorships, commissioned work, book deal/IP
- **Realistic revenue targets:** Y1 $60-100k, Y2 $150-300k

---

## The steel-man

Dene asked for a steel-man case for and against doing this. The honest response:

**For:** Dene is unusually well-positioned — technical chops (Framer, Claude Code, HealthDASH), partnership-building background (the journalist flywheel is literally their day-job skill applied to media), and the extradition atlas already proves the aesthetic.

**Against:** Dene already has two side projects (HealthDASH and a satirical news site) plus a demanding Sprout Global Reseller Program role, plus family. The pattern is that earlier side projects have plateaued at "exploring" rather than "shipping weekly." Data viz is a content treadmill that requires forever-production to maintain audience. Median outcomes in the space are plateau at $10-20k/year, not the plan's $60-100k.

**The reframe:** ship four pieces over eight weeks as a low-cost experiment. If three of four land, invest properly. If none do, walk away clean. Don't commit to "launching a brand" — it has sunk-cost gravity.

---

## The persona breakthrough

Dene pushed back on the initial "anthropologist with a sense of humour" framing with a crucial insight: **create a pseudonymous, fictional animal persona**. An animal character writing as a quizzical observer of the human species.

We explored candidates:
- **Aardvark** — Dene's initial suggestion. Reviewed; charming but low-energy, poor silhouette, nocturnal.
- **Ape** — too much cultural baggage (crypto, Planet of the Apes).
- **Octopus** — alien intelligence, 8 arms as a visual system, ink as a built-in metaphor. Strong.
- **Corvid, Owl, Cat, Fox** — all too crowded in branding.
- **Raccoon** — genuinely curious species, uncrowded, urban-observer vibe.
- **Armadillo** — Dene asked specifically. Honest answer: defensive rather than observational, awkward silhouette, wrong metaphor despite being uncrowded.
- **Meerkat** — good fit but Compare-the-Market / Meerkat Manor have claimed it.

First recommendation: "Prof. Teuthis" (octopus, from Greek *teuthís* = squid). Dene rejected: **name was wrong** — hard to pronounce, obscure.

Retried with more accessible names:
- Ollie (friendly, pronounceable)
- Inkwell (pun, writerly)
- Monty, Arthur, Sid (candidates)

Dene synthesised: **"Prof. Ollie Inkwell."** This was the breakthrough combination. "Prof." gives credibility, "Ollie" is warm and memorable, "Inkwell" does triple duty (surname + octopus reference + editorial craft).

---

## The voice correction

Dene flagged that the "Prof. Teuthis" voice I'd drafted was too esoteric — "One observes that the primate currently holding..." style. Reader tax too high.

**The correction:** The character is the *source* of the voice, not the voice itself. Captions should read like "a smart, funny, culturally-literate friend who happens to work with data." Character shows up as seasoning, not costume.

The "salt seasoning" analogy locked this in: too much = inedible, too little = bland, correct amount = food that tastes like something.

The final voice rules:
- 90% plain sharp English, 10% character sprinkle
- Character appears in: signature line, logo, masthead, occasional asides, "about" page, merch, annual year-in-review
- Post captions themselves stay accessible
- Open with sharpest number or fact
- Short sentences, one idea each
- Wit in word choice, not structure
- Opinions earned from data
- One-line kicker at end, signed `— Ollie`

Rewritten Pope-Trump example sample:
> *Of the Pope's 47 international trips, he has visited Ireland once and the Philippines three times. The map of his travel explains roughly 60% of the variance in his global approval ratings — the faithful were never the persuadable ones. Trump's current spat is a fight for an audience that wasn't up for grabs.*
>
> *Ollie's verdict: picking fights with the man in white rarely pays. The polling has been saying this for forty years.*
>
> *— Ollie*

---

## Brand & publication decisions

- **Brand name:** Inkwell Review (not "Field Notes by Inkwell" — Dene's final call was .com, clean, literary, sits alongside *Paris Review / The Drift / The Baffler*)
- **Domain:** inkwellreview.com ($19/yr, US$25/yr with backup) — chosen over inkwell.ink (too expensive at S$482/yr), fieldnotes.press (great but .com trust premium won)
- **Social handles:** @inkwell_reviews on Instagram and X (plural — note we considered checking singular versions but went with the chosen plural)
- **Display name on social:** "Inkwell Review" (not Ollie Inkwell — publication framing beats personality framing for the long game)
- **Ollie's role:** *fronts* the publication (editor), doesn't *be* the publication. Preserves optionality for guest contributors.
- **Email:** ollie@inkwellreview.com on Google Workspace Business Starter (~US$7/month). Aliases: hello@, press@, sponsor@.
- **Tagline options in play:** "Data visualisations of how humans behave" / "On the peculiarities of Homo sapiens"

---

## Content strategy decisions

- **Five formats** (renamed from mini-plan): **Cartography, Dispatches, Specimens, Ledger, Habits** (loosely map to Map/Life/Shrinkage/Grid/Specimen from the plan)

*Note: during migration to the Claude Code project, we simplified back to the original clearer labels: Cartography, Life, Shrinkage, Grid, Specimen. "Dispatches / Ledger / Habits" as names can return later if wanted as section categories on the website.*

- **Content mix:** 70% evergreen / 15% seasonal / 15% reactive topical
- **Cadence:** 2 pieces/week (Tue + Fri), daily fragment on X/Threads, weekly LinkedIn, weekly newsletter
- **Launch slate:** Extradition Atlas (done), Fugitive Destinations (next), What's Legal Where, Causes of Death by Age, Shrinking Chocolate Bar, Where Billionaires Sleep, Tipping Atlas, Names That Died, How the World Wakes Up, Michelin vs McDonald's, Loneliness Curve, One Day in Life of Median Human

---

## The agent system

Dene wanted an agentic system to handle research & production with ~1 hour/day of human input.

**Answers to the three design questions:**
- Runs on: **Claude Code on Mac** (manual trigger, strongest control)
- Daily hour is for: **Ideation + approve** (Dene picks angles, system executes)
- Scariest bottleneck: **Finding sharp topical angles fast enough**

**System design:**
- Four slash commands: `/scan`, `/produce`, `/voice-check`, `/retro`
- File-based workflow: everything in markdown/CSV/HTML on disk
- Voice bible loaded every session via CLAUDE.md
- Manual trigger each morning, not scheduled
- System produces assets, never posts directly
- Cooling-off rule: no topical piece ships same day drafted

This is what the current project (the one you're reading this from) implements.

---

## Identity session — progress to date

The visual identity work is structured around **six decisions** (see `brand/identity-brief.md`), not the earlier four-sub-step sketch. Each decision is tagged for the right tool: Claude Code for text/template work, Claude Design for visual iteration.

### Session 1a — 18 April 2026 (evening)

**Decision 1 — identity mood — LOCKED.**

- **Mood sentence:** *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*
- **Reference publications:** Works in Progress (editorial DNA — rigour, citation culture), Monocle (design DNA — handsome object, production quality), The Economist (data DNA — chart-first thinking, briefing cadence, authority without bluster).
- **Position in one line:** *a Monocle-looking object containing Works in Progress-grade rigour, built around Economist-grade charts.*

This is the upstream test every future piece — and every downstream design decision — is held against. If a draft doesn't feel like insight for people who pay attention, meticulously sourced, and worth repeating at dinner: revise, don't ship.

**Session process notes:** Mood sentence went through several iterations. Early options leaned naturalist ("field journal") and object-forward ("cafe table in Lisbon"); the locked version keeps the insider-briefing register while staying honest about the product (charts, not essays). Explicitly rejected "fascinating" as self-praising and "impeccably" as overclaiming — they violate the plain-and-sharp voice rule from the decisions log.

### Still to do in this identity arc

- **Decision 4 — masthead treatment** *(Claude Code)* — next up
- **Decision 6 — export standards** *(Claude Code)* — completes Session 1
- **Decision 2 — logo system** *(Claude Design, Session 2)*
- **Decision 3 — Ollie's signature mark** *(Claude Design, Session 2)*
- **Decision 5 — template library** *(mixed, Session 3)*

---

## Pick up here next session

**Start with Decision 4 — the masthead treatment.**

Question: how does "INKWELL REVIEW" render as a publication banner across the website header, the top of every chart/post image, IG carousel cover slides, the newsletter header, and merch?

Starting hypothesis (from the Extradition Atlas): `INKWELL REVIEW · VOL. 47` in JetBrains Mono, small caps, letterspaced 0.2em, in the amber accent, above a Fraunces headline. Open sub-question: should VOL. numbers count pieces or weeks? (Brief's hypothesis: pieces.)

Hold whatever we draft against the locked mood sentence — it has to feel like a briefing for people who pay attention, not a magazine cover.

After Decision 4, move to Decision 6 (export standards) — write `brand/export-standards.md` with master dimensions (hypothesis: 1080×1350 master, everything else derived).

Then — once Session 1 is done — the real test: produce Piece #2 (Fugitive Destinations Map) using the new templates, and see if it clears the 90-minute production bar set in the identity brief.

**Open the file:** `brand/identity-brief.md`, jump to Decision 4.

---

## Decisions not yet made

Worth flagging explicitly for future sessions:
- Final profile picture / avatar for social
- Substack setup (claimed or not)
- Scheduler (Buffer vs Metricool)
- Tagline — two options in play, not locked
- LinkedIn company page
- Secondary domain purchase (`ollieinkwell.com`, `inkwell.fyi`, etc.) — declined for now, can revisit
- Print-on-demand partner (deferred)
- Merchandise (deferred)

---

*Last updated: 18 April 2026 (evening), after locking Decision 1 of the identity session. Update again when the next major decision lands.*
