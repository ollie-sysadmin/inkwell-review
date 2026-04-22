# /produce — Idea to Assets Pipeline

You are producing an Inkwell Review piece. Read `daily/YYYY-MM-DD/picked.md` (today's picked angle) to get the brief.

Execute the steps in order. Do not skip any. Stop immediately if a blocker appears — especially data gaps.

## Before anything else

1. **Read `voice/bible.md`** — the voice rules.
2. **Read `voice/examples.md`** — the gold-standard examples.
3. **Read `voice/forbidden.md`** — things to avoid.
4. **Read `brand/visual-system.md`** — the visual tokens.
5. **Identify which template in `brand/templates/` fits this piece's format.**

Skipping this pre-reading is the #1 cause of drift. Do it every single time.

## Step 1 — DATA (15 min target)

Search authoritative sources (prioritise `research/sources.md`). Compile clean data into `daily/YYYY-MM-DD/drafts/data.csv`.

Requirements:
- Every row cites its source (source column)
- Units are consistent (specify in a header comment)
- Missing values are explicit (use `NA`, not 0)
- If data is thin (fewer than ~10 data points, or sources disagree significantly), **stop and report to Dene** — don't fabricate or extrapolate.

## Step 2 — CHART (30 min target)

Start from the appropriate template in `brand/templates/`. Output to `daily/YYYY-MM-DD/drafts/chart.html`.

Every chart must include:
- Masthead (`INKWELL REVIEW · VOL. N`)
- Headline (Fraunces display, descriptive not clever)
- Italic deck (one sentence setup)
- The visualisation itself
- Legend (if needed)
- Footnote block with sources in small mono type
- Signature line at end

Do not invent new layout patterns. Use the template. If the template doesn't fit, flag it as a template-improvement task rather than bypassing.

## Step 3 — SOCIAL CAROUSEL (20 min target)

Produce a `socialCards` array for the piece. One 4:5 card per editorial split. Cards post as an Instagram / LinkedIn / Threads / Bluesky carousel, each linking back to `inkwellreview.com/pieces/[slug]`.

**Write to `site/src/pieces/[slug].ts`**, alongside the piece's stamp SVG and shared chrome. The dynamic route at `/pieces/[slug]/social/[index]` renders each card; the `.png.ts` endpoint exports PNGs at build time. Do NOT write one HTML file per slide — that was the pre-Session-5 model and is superseded.

### Choosing the splits

The "split" is the axis the carousel walks the reader through. Default one card per split:

- **Cartography** — one card per anchor. Extradition Atlas = 8 cards (US / UK / EU / AU / CA / RU / CN / AE). Fugitive Destinations = 3 cards (US / UK / EU). The map, headline, and footer stat change per card; chrome stays fixed.
- **Life** — 4–6 cards. One per life-stage band. Chart crop or highlight moves; the single variable stays named.
- **Shrinkage** — 4–6 cards. One per decade, or one per item in the shrinkage set. Use the same frame; change the highlighted data point.
- **Grid** — 3–6 cards. One per column or row cluster of the small-multiples matrix. Never try to fit the full grid into 4:5; zoom in on coherent subsets.
- **Specimen** — 4–8 cards. One per aspect of the single specimen being dissected. Each card features a different cut of the same data point.

If a piece doesn't naturally split into 3+ coherent cards, flag it to Dene — the piece may want a different format, or may be a single-card post rather than a carousel.

### Per-card rules

Every card in the array must carry:

- **Shared chrome** (all cards on the same piece identical): `desk`, `issueTag`, `kicker`, `figNumber`, `sourceLine`, `ctaUrl`, `stampSvg`, `legend`, global data sets (`havens`, `euMembers` where relevant).
- **Per-card edit**: `headline`, `emphasis` (one circled or highlight mark per headline, editor's choice), `plateTitle`, `footerStat` (value + caption), plus the piece-specific axis (e.g. `anchor` on Cartography pieces).
- **Headline-stat ≠ footer-stat** (locked). The headline number and the big misreg footer number must speak to each other, never duplicate. The pair is the card's idea.
- **One emphasis per headline.** Circled (pencil-ring) or highlighted (reversed-ink block), not both. Shorter phrases read better at carousel scale.
- **Footer caption** is HTML — `<em>` and `<br>` allowed. Use `<em>` for rhythm and contrast against the display ink.

### Drafting approach

1. Read the piece's data module (e.g. `site/src/lib/cartography/<slug>-data.ts`) to see the shape.
2. Read the article's long-form prose to understand the voice Dene has already set.
3. Draft each card's headline + footerStat together — they're a pair. Don't draft all headlines first then all stats; the pair is the unit.
4. Check every numeric claim against the data module. If the data module's counts change later, interpolate via template literals in the `.ts` file so the card stays accurate.
5. Add a `/* Draft — for editorial review */` banner at the top of the DRAFTS array. Remove only when Dene signals the card is ready for PNG export.

### Pre-check before exit

- `pnpm --dir site astro check` passes (types align with `SocialCardProps`).
- `/pieces/[slug]/social/0` renders in the dev server and the map loads.
- Every card has a complementary headline/footer pair (no duplicated numbers).
- Every card has a non-empty `emphasis.word` that exists verbatim in the headline string.

Do not run Satori / the PNG pipeline from `/produce`. PNG export happens at build time on Dene's signal, after the draft review.

## Step 4 — CAPTIONS (20 min target)

Write three caption versions. Output to `daily/YYYY-MM-DD/drafts/captions.md`.

### Instagram (target 100–150 words)
- Follows the formula in `voice/bible.md`: Hook / Context / Kicker / `— Ollie`
- No hashtag spam; 3–5 specific hashtags maximum
- No emoji in body

### LinkedIn (target 200–300 words)
- Slightly more analytical register
- Can include a "why this matters for" framing at the end
- Still signed `— Ollie`

### X thread (5–7 posts)
- Each post stands alone (readable without context)
- First post is the hook; last post is the kicker
- No thread 🧵 emoji — just number them inline if needed

## Step 5 — ALT TEXT (5 min target)

Write accessibility alt text for the main chart and each carousel slide. Output to `daily/YYYY-MM-DD/drafts/alt-text.md`.

Good alt text:
- Describes what the chart shows, not what it looks like
- Leads with the key finding
- Mentions the data type and time range
- 150 characters ideal, 250 maximum per image

## Step 6 — NEWSLETTER DRAFT (25 min target)

Write a 400–600 word piece expanding the chart for the Substack audience. Output to `daily/YYYY-MM-DD/drafts/newsletter.md`.

Structure:
- Headline (same as the chart)
- Lead paragraph (the caption's hook, expanded to 2–3 sentences)
- Body (3–4 paragraphs unpacking the data)
- "Sources" section at the end with proper citations
- "What I'm working on next" one-paragraph aside, in Ollie's voice
- Sign-off: `— Ollie`

## Step 7 — SELF-CHECK

Before declaring the job done, internally run a lightweight voice check on all captions:
- No first-person "I" (except in the newsletter aside)?
- No generic openers?
- No forbidden phrases?
- One specific number in each opening line?
- Correct `— Ollie` signature?

Note anything uncertain in `daily/YYYY-MM-DD/drafts/self-check.md` for Dene's attention.

## Step 8 — SUMMARY

End with a short summary in chat telling Dene what you produced, where the files are, and anything that needs their judgement. Be specific about:
- Any data gaps or caveats
- Any sentences you're unsure about
- Any claims that warrant a second read
- Whether `/voice-check` is recommended before publishing

## Rules

- Never fabricate data. Kill the piece or revise the angle before inventing.
- Never post. Only produce assets for review.
- Never skip the pre-reading in the "Before anything else" section.
- Never extend the character voice into the chart itself — Ollie lives in captions, not headlines.
- If the piece makes you uncomfortable (taste, accuracy, legal), stop and raise it with Dene.

## Time budget

Total target: 2 hours of agent time. If you find yourself taking longer than 3 hours, something's wrong — stop and flag it.
