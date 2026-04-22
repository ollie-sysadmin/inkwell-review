# Inkwell Review — Decisions Log

*Every locked decision. Flat reference. Add new decisions at the top with date.*

---

## 2026-04-22 — Session 8 wrap: gallery rewrite, voice-check HARD FAIL → PASS, productisation direction noted

After shipping Piece #3 and the initial gallery (separate entry below), the session ran a second pass of live feedback that tightened several things and surfaced one major long-term direction.

### 1. Contact-sheet gallery rewritten as horizontal scroll strip

Dene flagged that ragged-row behaviour on 5- and 7-card pieces read as sloppy. Replaced the `grid-template-columns: repeat(auto-fit, 260px)` grid with a flex horizontal scroll strip + prev/next arrow buttons in the section header. Works cleanly for 3, 5, or 8 cards — one continuous row, no orphans. Arrows auto-hide when the strip fits without scrolling (ResizeObserver + iframe-load + timed re-check) and on touch / narrow viewports. Copy updated to **"THE INSIGHTS" / "Here's what stood out from the data. Click a card to open it full size."**

Implementation notes:
- `scroll-behavior: smooth` in CSS and `scroll-snap-type: x mandatory` both turned out to fight programmatic `scrollBy()` in this Chromium + iframe context. Removed both. Smooth paging now comes from a setTimeout-driven easeOutCubic animation in the arrow-click handler (13 lines).
- `requestAnimationFrame` similarly unreliable in headless/backgrounded contexts — avoided.

### 2. Lightbox rewritten — centered, fit-to-viewport, no scroll

Previous lightbox was stuck in the top-left of the viewport and required scrolling. Now:
- Centered via dialog's natural `inset: 0; margin: auto`.
- Card scaled by a JS-computed `--scale` = `min(0.85 * vh / 1350, 0.9 * vw / 1080)` — binding dimension picks whichever fits. Applied on open + on resize.
- Close button floats top-right over the dimmed backdrop (not the card itself).
- Label + "Open standalone ↗" link sit in a footer strip below the card, on the backdrop.
- Verified on 1280×900 desktop and 375×812 mobile. Both fit without scrolling.

### 3. One-flagged UI refinement deferred

Dene noted the arrow buttons should flank the card strip L/R (not cluster in the header top-right) for better intuition. Spawned as a separate task rather than inline; prompt committed.

### 4. `/voice-check` run — HARD FAIL → PASS after seven fixes

First-pass verdict was HARD FAIL. Four fact violations (Italy listed as "ahead of the US" in three text surfaces + the France social card itself) and three voice-refinement soft items. Root cause: original drafts over-reached "every major European economy is ahead" when Italy (27.8%), Czech Republic (27.8%), Bulgaria (27.3%), Finland (27.3%), Jordan (27.0%), and Costa Rica (26.5%) all sit below the US (28.3%).

All seven fixes applied:
- **H1–H3:** IG, LinkedIn, newsletter, X thread — "Behind Italy" replaced with "Behind Poland / Behind Germany"; "every other high-income" → "most other"; "worst rank in the rich world" → "bottom half".
- **H4 (shipped code):** France social card caption in `site/src/pieces/ai-adoption-gap.ts` rewritten from *"Every major European economy is ahead of the US"* to *"France, the UK, Germany — all ahead of the US."* Same fix applied in `daily/2026-04-21/drafts/alt-text.md`.
- **S1:** "Barely above Costa Rica" → "Just above Costa Rica."
- **S2:** Prediction-dressed-as-observation in newsletter → aphorism: *"A race you invent and don't run is not a race you win."*
- **S3:** Alt-text card 0 rewritten to lead with finding, not visual description.

Final voice-check verdict: **PASS.** Report at `daily/2026-04-21/drafts/voice-check.md`.

### 5. PNG export complete — 16 cards in 17s

`pnpm --dir site cards:export` ran clean: 5 AI Adoption + 8 Atlas + 3 FD = 16 PNGs. Both `social-output/<slug>/` (upload staging) and `site/public/pieces/<slug>/social/` (Vercel OG mirror) populated. File sizes 225–257KB per card, all 1080×1350.

### 6. Productisation direction — long-term, noted

Dene articulated a long-term plan during session wrap: **productise the Inkwell workflow as a multi-tenant editor SaaS with a web UI.** The file-based `/scan` → `/produce` → `/voice-check` → `/retro` pipeline becomes a hosted editor experience. `context/workflow.md` becomes the starting UX blueprint.

Not Session 9's work, but **Session 9+ architectural decisions should keep the product direction in mind** — bias toward portability, avoid unnecessary Dene-specific hardcoding. Saved to memory as `project_productisation_long_term.md` for future sessions.

### 7. Pre-launch walkthrough is Session 9's mission

Current state: one real article drafted (AI Adoption Gap), two test pieces (Atlas + FD) still provisional per the "disposable test pieces" memory, **website not deployed live**, SEO/AEO incomplete. Session 9 steps through `context/workflow.md` and `strategy/content-selection.md` and closes every pre-launch gap. Reference for the AEO layer: [https://aminforoutan.com/blog/what-is-ai-info-or-llm-info-page/](https://aminforoutan.com/blog/what-is-ai-info-or-llm-info-page/) — saved to memory as `reference_aeo_llm_info_page.md`.

---

## 2026-04-22 — Content-selection ruleset consolidated into `strategy/content-selection.md`

Operational rules for *what* Inkwell covers — previously scattered across six files — now live in a single canonical document: **`strategy/content-selection.md`**. Three sections mirror the WHERE / HOW / WHY framing Dene asked for: sourcing (the three streams + queues + capture rule), identification (five formats, sharpness score, five-question gate, freshness windows, cooling-off), validation (source gate, earned opinion, six hard stops, taste bar).

The file also spells out the **Claude / Dene split** for the first time as an explicit table (§ 6): who picks the angle, who owns format and desk assignment, who enforces source rules, and what hands-off safety checks Claude does silently. Previously implicit; now written down.

### Other files changed to point at the new canonical ruleset

- `CLAUDE.md` — "Content formats" and "Content mix" sections replaced with a short summary + pointer. "Useful context files" list gained an entry for the new ruleset.
- `research/evergreen-queue.md` — header gained a one-line pointer.
- `research/topical-queue.md` — same.
- `.claude/commands/scan.md` — prepended a pointer note. The skill stays self-contained (coverage, rejection rules, scoring calibration reproduced inline) because skills need to run without assuming other files are loaded.

### Three things newly committed to paper in the consolidation

Each was implicit before; each is now an explicit rule:

1. **Seasonal calendar** — nine named beats (Valentine's, IWD, tax season, etc.) listed in § 1.4. File `strategy/seasonal-calendar.md` earmarked to hold the detailed schedule once populated.
2. **"Five questions before picking an angle"** — a gate Dene applies to every candidate, from any stream. Previously scattered as evaluation criteria inside `/scan`; now a checklist that governs all three streams.
3. **Claude / Dene split table** — synthesised from memory entries (`feedback_human_owns_desk_classification.md`, `feedback_act_dont_ask.md`) plus `CLAUDE.md`. No new rules, just the first time it's been written down as one object.

### Why this matters

Strategy living in six files means future sessions re-derive rules from fragments and drift. The consolidation is a guardrail against drift. Same pattern as `strategy/distribution.md` for distribution — one file, one source of truth, skills and queues point at it.

---

## 2026-04-22 — Session 8: Piece #3 (AI Adoption Gap), social-card units, card gallery on every Cartography piece

Session split across two fronts: shipped Piece #3 end-to-end through `/scan` and `/produce`, then two rounds of live-preview feedback from Dene tightened the card grammar and expanded the canonical page.

### 1. Piece #3 — AI Adoption Gap — shipped through the Cartography template

Live at [http://localhost:4321/pieces/ai-adoption-gap](http://localhost:4321/pieces/ai-adoption-gap). Data desk (paper-blue, provisional — pending Dene's final confirmation), Cartography format, Figure III.

**Angle**: the United States ranks 24th of 30 measured economies at actually using generative AI (28.3%), despite leading every supply-side metric in Stanford's 2026 AI Index. The UAE is first at 64.0%; Singapore second at 60.9%; every major European economy is ahead of the US.

**Source**: Microsoft AI Economy Institute 2025, via Stanford University AI Index 2026 Report, Chapter 4 Economy, Figure 4.3.12 (p. 201). PDF archived at `daily/2026-04-21/ai_index_2026.pdf`.

**Five-card carousel** (US / UAE / Singapore / France / South Korea) declared in `site/src/pieces/ai-adoption-gap.ts`. Drafts for IG / LinkedIn / X / newsletter / alt-text under `daily/2026-04-21/drafts/`.

### 2. Cartography template — three extensions landed in this session

All backward-compatible. Atlas + FD re-verified to render unchanged.

1. **Per-anchor `statTiles?: StatTile[]` override.** The four-tile stats strip can now carry bespoke values per anchor (adoption %, global rank, half-on-half delta on the AI Adoption piece) instead of the Atlas-style computed counts. If `statTiles` is absent, the template falls back to the original partners/reluctant/noTreaty compute. Declared in both `src/components/cartography-anchor.ts` and `src/lib/cartography/treaty-data.ts`.

2. **`showHavensToggle?: boolean` prop.** Hides the haven-highlight toggle automatically when a piece doesn't use havens (AI Adoption passes `havens = new Set()`). Saves the template from rendering a dead button. Defaults to `havens.size > 0`.

3. **`legendLabels.suspended` / `legendReferents.suspended` support.** Legend table now renders a suspended-tier row when the anchor's `suspended` set is non-empty. Also fixes the no-treaty count: was `195 − partners.size` (which undercounted when a piece uses multiple tier classes); now `195 − (partners + reluctant + suspended + bloc).size`, which is accurate for any tier scheme.

### 3. Social card: optional `footerStat.unit`

Dene flagged that the AI cards rendered "28.3" / "64" without their % — meaningless in isolation. `SocialCardProps['footerStat']` now accepts an optional `unit?: string`, rendered as a DM Serif Display span at 100px (~0.38× the 260px value), baseline-shifted. Used as "%" on the AI ratio cards, "pp" on the South Korea delta card, omitted on Atlas / FD (counts). Matches how the article page's stats strip already handles units.

### 4. Contact-sheet card gallery — every Cartography piece, automatically

Dene's second round of feedback: the per-country headlines on the cards are "catchy & gold" and were being wasted on social-only exposure. Pulled them back onto the canonical page.

**Pattern** (locked): below the plate, above the first `<h2>`, a section titled *"The cards"* renders every declared social card as a contact-sheet of iframe thumbnails. Click a thumbnail → `<dialog>` lightbox with the full 1080×1350 card at ~0.68× viewport scale, plus an "Open standalone ↗" link to the `/pieces/[slug]/social/[index]` route.

- **Visual pattern**: contact-sheet grid (chosen over horizontal scrollable strip to fit the existing "naturalist's tray of specimens" aesthetic on the homepage). Fixed 260×325 thumbnails; `grid-template-columns: repeat(auto-fit, 260px); justify-content: start` so 3-card, 5-card, and 8-card pieces all flow cleanly.
- **Freshness**: live iframes of `/pieces/[slug]/social/[index]` at `transform: scale(260/1080)`. The gallery always reflects the source of truth in `src/pieces/[slug].ts` with zero export step — writing a card updates the canonical page automatically.
- **Scope**: template-level. Atlas (8 cards), Fugitive Destinations (3), AI Adoption Gap (5), and all future Cartography pieces get it without per-piece work. Verified live on all three today.
- **Responsive**: breakpoints at 820px (drop to 200×250 thumbnails) and 480px (single-column, max 280×350).

### 5. Publishing-workflow implication

The `socialCards` array in `src/pieces/[slug].ts` is now dual-purpose: social distribution (via `pnpm cards:export` → PNGs → SMM tool) **and** permanent canonical artefact on the piece page. No new authoring step; the same array drives both.

One editorial consequence worth noting: per-card headlines now carry archival weight on the published page, not just 24-hour social presence. The "1-2 punch" grammar (clear headline / clever footer caption) already enforces the quality bar; `/voice-check` should sweep the card strings too when it runs over a piece — minor skill amendment queued.

### 6. Feedback that expanded the template

Today's session proved a working pattern for template evolution: shipping a real piece (Piece #3) surfaced two template gaps (no unit slot on big stats, cards wasted on social-only) that generic prototypes would not have caught. Fix both at the template level — backward-compatible — so every future piece benefits.

---

## 2026-04-21 — Session 7b: Satori dropped, Playwright adopted for PNG export

Dene A/B'd the HTML and PNG versions after Session 7's Satori wiring and found the gap wider than "within tolerance." Ink-jitter, speckle, proper misregistration, and fine typographic details were all missing or wrong because Satori is a partial CSS renderer, not a browser. Decision: abandon Satori, adopt Playwright.

### 1. Satori retired; Playwright is the PNG engine

- Removed: `src/pages/pieces/[slug]/social/[index].png.ts`, `src/lib/social-card-satori.ts`, the Satori/resvg/wawoff2/d3-geo/topojson-client/world-atlas/@fontsource devDeps.
- Added: `playwright` (devDep) + Chromium via `pnpm exec playwright install chromium`.
- The HTML card at `/pieces/[slug]/social/[index]` is now the **sole** source of truth. The PNG is a screenshot of it — pixel-perfect by construction.

### 2. Export is a local script, not a build step

New `pnpm cards:export` (defined in `site/package.json` → `scripts/export-social-cards.mjs`):

1. Fetches `GET /api/cards.json` to learn what cards exist.
2. Launches headless Chromium at 1200×1450 viewport, `deviceScaleFactor: 1`.
3. For each card: navigates to the HTML route, waits for the map to finish drawing (d3 + topojson load from CDN client-side), screenshots the `.card` element.
4. Writes to two places:
   - `social-output/<slug>/<index>-<short>.png` — staging folder for upload.
   - `site/public/pieces/<slug>/social/<index>.png` — mirrored so the canonical OG URL (`inkwellreview.com/pieces/.../social/0.png`) serves the real PNG.

Runtime: ~12 seconds for all 11 cards. Dev server must be running.

**Why a script, not a build step:** Dene's review-then-approve flow separates deciding from generating. Build-step generation fused the two. Script keeps them distinct, and the output folder becomes the natural handoff point for any downstream automation (Buffer API, rsync, etc.).

### 3. New API endpoint: `/api/cards.json`

Returns the flat list of every declared social card across every piece (slug, index, short code, headline, desk). Used by the export script; also a useful diagnostic for humans.

### 4. Why Playwright over other full-fidelity options

- **Playwright at runtime on Vercel** — ruled out: needs `@sparticuz/chromium` shim, 50MB fn limit, cold-start penalty.
- **Playwright at build time on Vercel** — possible but couples PNG generation to deploys. Not what Dene wanted.
- **Browserless / htmlcsstoimage SaaS** — works, but adds a paid external dependency.
- **Playwright locally, PNGs committed to repo** — chosen. Zero Vercel impact; Vercel just serves static files. Fits the existing git-based editorial workflow.

### 5. Workflow diagram owed

Session 7 has been dense and the pipeline has changed shape. Dene asked for a visual + plain-English explanation of the full flow from ideation → published post, aimed at a zero-context reader. Saved to memory; due this session or next.

---

## 2026-04-21 — Session 7: Social-card 1-2 punch grammar locked, Satori PNG pipeline wired end-to-end

Continuation session, same day. Two things landed: (1) editorial voice rule for every future social card, and (2) the full Satori → PNG pipeline the social-card architecture was designed around.

### 1. Social-card 1-2 punch grammar — locked

**Headline**: clear, draws the reader in, sets the subject and stakes. **Footer caption**: the clever data-driven payoff. They work as a pair; never reversed.

**Why:** Session 6 drafted all 11 cards with "clever first" headlines ("Twenty-seven states share a single warrant"), which Dene flagged as obscure at first read. Instagram / LinkedIn carousel readers scroll fast — a headline that takes a beat to decode costs the swipe. The clear-hook / clever-payoff split earns the eyes then rewards them.

Gold-standard examples (Dene wrote, Session 7):
- *"American criminals: here are 78 countries that will not send you home."* → *"117 countries with no treaties, and 10 safest places to run."*
- *"European on the run from the law?"* → *"27 countries to avoid, 4 to consider."*

All 11 draft cards rewritten under this rule. Rule saved to memory (`feedback_social_card_headline_footer_grammar.md`) and `/produce` Step 3's pre-check references it. The Session 5 **headline-number ≠ footer-number** rule still applies on top — the pair is both *complementary on data* and *narratively 1-2*.

### 2. Considered emphasis distribution, not per-card guess

The `emphasis.type` field is `'circled' | 'highlight'`. Atlas 8-card carousel now uses 5 highlights + 3 circled, chosen deliberately: highlights for the punchy / edge-first cards (US, EU, AU, RU, AE), circled for the reflective / narrower-frame cards (UK, CA, CN). FD uses 2 highlights + 1 circled over its 3 cards.

Previous approach (pick whatever feels natural per card) drifted into all-same. Fixed.

### 3. `/review/social-cards` — one-page holding view

New route at `site/src/pages/review/social-cards.astro`. Shows every card for every piece on one page as a grid of live iframes of the `/pieces/[slug]/social/[index]` routes. Each tile labels its index, anchor code, and emphasis type; clicking "open ↗" jumps to the full-size card. No auth — internal-only, `noindex`.

**Why:** 11 cards across 2 pieces was already hard to scan via individual URLs; at the launch pipeline of 5+ pieces × 4-8 cards each, a central review page stops being optional.

### 4. Satori + resvg PNG pipeline — wired end-to-end

The Session 6 501 stub at `site/src/pages/pieces/[slug]/social/[index].png.ts` is now a working endpoint.

- **Deps**: `satori`, `@resvg/resvg-js`, `topojson-client`, `d3-geo`, `world-atlas`, `@fontsource/dm-serif-display`, `@fontsource/atkinson-hyperlegible`, plus type packages. All pinned via pnpm.
- **Fonts**: loaded from `@fontsource/*/files/*.woff` buffers at cold-start, cached module-scope. Satori supports woff (not woff2, which Fontsource also ships).
- **Atkinson substitution**: HTML card uses Atkinson Hyperlegible *Soft* (woff2-only locally); PNG pipeline uses Atkinson Hyperlegible *classic* from Fontsource. Visually near-identical at card scale; minor metric drift on weights above 700. Flagged here for future consolidation.
- **Map paths**: `world-atlas/countries-110m.json` loaded once, features computed once, `d3.geoPath(d3.geoNaturalEarth1().scale(175).translate([480, 270]))` applied per feature. Same classify logic as the HTML card, extracted to `src/lib/social-card-classify.ts` so both sides stay in lockstep.
- **Tree builder**: `src/lib/social-card-satori.ts` constructs the Satori node tree as plain `{ type, props }` objects via a small `h()` factory — no React, no JSX transform.
- **Ink-jitter filter dropped** in the PNG version (Satori doesn't support CSS `filter`). Speckle overlay dropped (no `mix-blend-mode`). The photocopy-hand reads acceptably without these at social-card scale; if it starts feeling clinical in practice, a pre-composited flat-paper asset can be layered in later.
- **Verified**: all 11 endpoints return 200 image/png, ~200-220KB each, 1080×1350 dimensions. Three cards (US-anchor Atlas, RU-anchor Atlas, US-anchor FD) visually compared against HTML preview — match.

### 5. Per-piece OG image auto-wired

`Cartography.astro` now auto-derives `ogImage` from `Astro.url.pathname` when the caller doesn't supply one: `/pieces/<slug>/social/0.png`. The two article pages pick this up without code changes, and their `og:image` / Schema.org `image` fields now point at a real per-piece PNG. The `/og/default.png` placeholder only serves non-piece pages (home, index) — kept as a Session 8 task.

### Known minor visual items (Session 8 polish)

- Circled-emphasis span after-space is slightly off — a trailing period on the next text fragment renders with extra kerning. Visible on the CA card ("narrow corridor .").
- Caption fragments between `<em>` tags sometimes render with flex-gap where a tight join is wanted. Visible on RU / CN / AE cards.

None block shipping.

### Fix landed same session — PNG font + misreg match HTML

Dene A/B'd HTML vs PNG and flagged the PNG as visibly off (fonts different, overall quality lower). Two fixes:

1. **Atkinson Hyperlegible Soft wired into Satori.** Fontsource only ships Atkinson classic, and the design uses Soft. Local `public/fonts/AtkinsonHyperlegibleSoft-*.woff2` files are now decompressed to TTF via `wawoff2` at cold-start and fed to Satori. ExtraBold 800 is the primary display weight; previous 700 substitution was a major visible downgrade.
2. **Misregistration shadow on the big stat** now visible. The HTML version uses `-webkit-text-stroke` to outline a desk-coloured shadow glyph — without the stroke, the shadow is the same tone as the card background and disappears. Satori honours `WebkitTextStroke`; shadow now renders.

Also fixed the stale "Atkinson classic substitution" doc comment and the tooling-backlog entry.

The two remaining HTML features that **can't** land in the PNG are the speckle overlay (needs `mix-blend-mode: multiply`) and the ink-jitter filter on headlines (needs CSS `filter`). Both are Satori-unsupported. Acceptable trade-off at 1080×1350.

---

## 2026-04-21 — Session 6: Social-card component + route landed, Satori scaffolded

Session 6 executed A → C + E of the Session 5 plan. Step D (Satori PNG export) is scaffolded but not wired — font and map-rendering constraints make it a proper next-session task rather than a last-hour squeeze.

### 1. `SocialCard4x5.astro` component + types in a sibling `.ts` file

Port of `brand/mockups/atlas-social-4x5.html`. Receives `SocialCardProps`, renders the 1080×1350 portrait card with masthead / kicker / headline / plate / big misreg stat / footer. Map uses the locked Session 5 Cartography grammar (charcoal ocean, solid paper fills, photocopy-white anchor, photocopy-white borders at 0.7 opacity).

**Type split** — `SocialCardProps` and `CartographyAnchor` both live in standalone `.ts` files under `site/src/components/`, not inside the `.astro` frontmatter. Reason: esbuild can't parse `.astro` when a pure-`.ts` module tries to `import type` from it (fails at the first union type). Any future shared interface faces the same rule.

**Stamp model** — passed as `stampSvg: string` (HTML fragment rendered via `set:html`), not as a slot. Slots don't survive props-through-glob; a string is clean. The article template still uses `<slot name="stamp">` — the two contexts are unrelated.

### 2. Per-piece card metadata lives in `site/src/pieces/<slug>.ts`

Not in the article `.astro` frontmatter. Reason: `export const socialCards = DRAFTS.map(...)` from frontmatter failed at runtime (`DRAFTS is not defined`) — Astro's compiler does something with exported declarations that broke the reference to local consts. Sibling `.ts` files are cleaner anyway:

- `site/src/pieces/extradition-atlas.ts` — 8 cards, one per anchor (US / UK / EU / AU / CA / RU / CN / AE).
- `site/src/pieces/fugitive-destinations.ts` — 3 cards, one per anchor (US / UK / EU).

Each file exports `stampSvg` (inline SVG string) and `socialCards` (`SocialCardProps[]`). The dynamic route globs this directory; slug = filename stem.

### 3. Dynamic route serves each card as HTML

`site/src/pages/pieces/[slug]/social/[index].astro` — `getStaticPaths` walks `src/pieces/*.ts` and emits one path per (piece × card). Renders `<SocialCard4x5 {...card} />` in a minimal page shell (no masthead / footer chrome). Both Atlas and FD verified rendering end-to-end; map loads, anchor switches per card, emphasis marks (circled + highlight) render, paper-blue / paper-purple grounds both correct.

### 4. Satori PNG endpoint scaffolded, not wired

`site/src/pages/pieces/[slug]/social/[index].png.ts` — stub returns 501 with a detailed implementation plan inline. Blockers that make this a Session 7 task:

- **Fonts** — Satori needs TTF/OTF buffers; we ship only Atkinson Hyperlegible Soft as woff2. DM Serif Display isn't bundled at all. Need to download TTFs to `site/src/assets/fonts/` before wiring.
- **Map rendering** — d3 runs client-side on the HTML card; Satori can't execute JS. Need to bundle `world-atlas/countries-110m.json`, pre-compute SVG paths via `d3-geo` + `topojson-client` in Node.
- **Satori CSS constraints** — no `filter`, no `mix-blend-mode`. The headline ink-jitter and stat-misregistration effects need alternatives; speckle overlay needs a pre-composited flat paper asset.

Installing `satori` + `@resvg/resvg-js` + `d3-geo` + `topojson-client` is the first Session 7 move. Full plan in the endpoint file.

### 5. `/produce` Step 3 rewritten for the new carousel model

Old Step 3: "produce 9 slides as `carousel-01.html` through `-09.html`." Superseded. New Step 3 writes a `socialCards: SocialCardProps[]` array into `site/src/pieces/[slug].ts`, following editor splits (one per anchor for Cartography; 4–6 per life-stage band for Life; etc.). Headline-stat ≠ footer-stat rule codified in the pre-check.

### Known follow-ups for the draft Atlas + FD cards

Claude drafted headlines + footer stats from the data modules. These are editorial drafts — Dene reviews before PNG export. A few that want an eye:

- Atlas EU card (`socialCards[2]`) — "Twenty-seven states share a single warrant" is dull; the EU's bloc-paint story deserves a sharper line.
- Atlas CA card — "single border" is literal but not emblematic; the Canada story is really about proximity dominance.
- FD UK footer caption — "Spain and Cyprus carry most of it" works but could be more specific (frequencies in the data support a stronger claim).

All three are safe to ship as-is; sharpening is a polish pass before launch, not a correctness fix.

---

## 2026-04-21 — Session 5: Fugitive Destinations shipped, map grammar relocked, social-card production model settled

Long session. Three meaningful shipments and one production-workflow decision that settles a thing we'd been circling.

### 1. Piece #2 — Fugitive Destinations Map — shipped through the Cartography template

Cover desk, purple accent, passport-stamp motif. Live at `/pieces/fugitive-destinations`. Three anchors (US / UK / EU), two tiers (top destination / secondary destination) plus a shared quiet-havens set. ~50 minutes end-to-end through the template — **passes the 90-minute production-bar test** the Session 4 brief set.

Template tweaks the production test surfaced and landed: (a) `anchors`, `havens`, `countryNames`, `euMembers` all prop-overridable (Atlas still inherits defaults); (b) new `statLabels`, `tooltipNotes`, `havensToggleLabel`, `mapAriaLabel` props; (c) `reluctantCount` no longer zero-cased on EU anchor so EU-anchored pieces can carry a real secondary tier.

**Why:** validated that the Cartography template handles a different desk + different tier semantics + different motif without structural rework. Five more Cartography pieces feasible from here without template surgery.

### 2. Cartography map grammar relocked — Variant A · black plate · all six paper colours free for data

Prior Session 4 spec (desk-coloured chart card, paper-coloured hatch fills, ink borders) is **superseded**. New locked spec:

- **Plate background ("ocean")** — `#1F1F1F` charcoal, constant across every desk. A tone lifted slightly above `var(--photocopy-black)` (`#111111`, now reserved for no-record / no-treaty country fills). The two-tone distinction keeps the country lattice readable inside the no-record ink mass (Africa, Russia, etc.) while letting a photocopy-white anchor still pop.
- **Countries** — solid paper colours, no hatching. **All six brand paper colours** (green, yellow, pink, brown, purple, blue) are available for tier work; none reserved for anchor.
- **Anchor** — solid `var(--photocopy-white)` with a 1px ink stroke. The only light-toned country on the map.
- **Country borders** — photocopy-white at `stroke-opacity: 0.7`, `stroke-width: 0.6`. Bumped up from earlier 0.55/0.55 so borders inside the no-record ink mass are clearly readable.
- **Desk colour stays in chrome only** — kicker swatch, masthead, headline marks, stat-strip misregistration. It never enters the chart.

**Why:** the Session 4 "photocopy-white body, desk colour as accent" flip had already moved the brand toward desk-colour-as-accent. Pushing the chart background to a constant dark plate was the last step — every map artefact now reads as a sibling regardless of desk. Paper colours pop cleanly against dark. The previous hatch system was over-textured against the rest of the photocopy-hand grammar already carried by chrome (wobble rules, ink-jitter, speckle, misregistration).

Long anchor-treatment exploration (~12 rejected sub-variants over six rounds: misreg shadow, circled emphasis, per-piece stamp, wordmark, speckle fill, paper-blue hatch, solid paper-blue, motif-tiled, carved-frame, "USA" tiled, Ollie tiled, Victorian-curiosity tiled). **Final answer: anchor is solid photocopy-white, no overlay mark.** The simplest thing that works.

Exploration artifact saved at `brand/mockups/maps-black-background.html` — Variants A / B / C / D and all sub-variants preserved as decision history, same pattern as Session 4's rejected direction mockups.

### 3. Article header widened to match the plate

Earlier: `.ah { max-width: 48ch }` — narrow. Updated: `max-width: 1100px` — matches the plate width below. The long-prose body (`.prose`) stays narrow at `max-width: 36rem`. The header frames the chart; the prose is its own object underneath.

### 4. Social card production model — N 4:5 cards per piece, carousel, no custom admin UI

Dene's original vision ("Claude skills invoked manually, not a custom admin UI") now has a concrete implementation path:

- **Each piece's Astro source declares a `socialCards` array** alongside its article props. Editor (Dene) controls every slot — headline text, emphasis, plate title, stamp motif, footer stat value + caption, CTA URL.
- **Each array entry = one 4:5 card in the carousel.** For the Atlas that's one per anchor (US / UK / EU / AU / CA / RU / CN / AE).
- A reusable `SocialCard4x5.astro` component takes the entry's props and renders the card.
- A dynamic route `/pieces/[slug]/social/[index]` serves each card as HTML; Satori (tooling-backlog trigger arguably now fired) converts to PNG at build time.
- The `/produce` skill (already listed, unspecced) drafts the `socialCards` array from the piece's data and tier sets; Dene reviews and edits in Claude Code.
- **Posting stays manual** — export PNG, drop into Buffer / Sprout / native composer. No auto-posting.

A working 4:5 HTML mockup shipped at `brand/mockups/atlas-social-4x5.html`. Session 6 productionises it.

**Why:** hand-coded HTML per card won't scale. But a custom admin web UI was explicitly off the table. The Astro-source + Claude-skill split keeps editorial control in Dene's hands, keeps everything version-controlled, and avoids any new hosted surface.

**Headline-stat ≠ footer-stat rule.** The number in the headline and the number in the footer big stat must be **complementary**, never duplicated. They speak to each other. Applied in the Atlas prototype (headline: 78 won't; footer: 117 will).

### 5. Test pieces (Atlas + Fugitive Destinations) are disposable

Dene clarified: both Piece #1 and Piece #2 exist to validate tech / brand / strategy. If either fits the launch lineup, great; if not, no obligation to keep. The initial 10 published pieces should be drawn from `research/evergreen-queue.md` based on editorial fit.

Related: **desk and format classification are human-editor decisions, period.** Claude never assigns a desk for a piece. If a brief pre-assigns one (as Session 4's handoff did for Piece #2), Claude treats it as provisional and confirms with Dene.

Both saved to memory: `feedback_human_owns_desk_classification.md`, `project_test_pieces_are_disposable.md`.

### 6. Ocean curiosities pattern — parked pending a hand-drawn source

Explored adding a Victorian-curiosity tile pattern to the ocean (key, magnifying glass, pocket watch, compass, anchor, top hat, quill, etc., tiled diagonally across the charcoal plate) — similar to a WhatsApp chat background. SVG-coded attempts didn't hit the "hand-drawn" feel. Parked in `strategy/tooling-backlog.md`; trigger is a hand-drawn source image from Dene.

---

## 2026-04-20 — Session 4: Cartography template locked (big session)

Long, back-and-forth session that landed four significant rule changes alongside the Cartography template build. In order of dependency:

### 1. Body surface rule flipped — photocopy-white across the site, desk colour becomes an accent

The earlier "one pastel paper per page, wall-to-wall" rule is **superseded**. New rule: **all pages have a photocopy-white body; the six pastel papers live as accents, not page backgrounds.** The desk colour shows up on the masthead/footer text, kicker swatches, chart-card fills, and stat-tile misregistration — never as the page surface itself.

The mechanism is a CSS custom property `--desk` that resolves per page:
- `.home` → `var(--paper-purple)` (home default)
- `.cat-data` → `var(--paper-blue)`
- `.cat-voice` → `var(--paper-yellow)`
- `.cat-cities` → `var(--paper-green)`
- `.cat-archive` → `var(--paper-brown)`
- `.cat-cover` → `var(--paper-purple)`
- `.cat-interviews` → `var(--paper-pink)`

Every component that needs the accent (masthead wordmark/strap/rule/nav, footer text, kicker swatch, chart-card fill, misreg shadow) reads `var(--desk)` — adding a new desk is a one-line change. Implemented in `site/src/styles/global.css`; documented in `brand/visual-system.md` § Core rules.

**Why:** wall-to-wall paper-blue on a Data piece visually clashed with the ink-black masthead carrying purple text. The Namesake precedent (masthead/footer chrome adopts each page's accent) felt tighter. Dene: *"I hate the way the page background is now blue ... I think we should dynamically change the colour on the masthead & footer text to match the page background."*

### 2. Two-headline-moves rule relaxed — both marks now general-purpose, one per headline

Earlier rule: "circled emphasis on Voice / Ollie surfaces only." Updated rule: **one mark per headline, editor's choice per piece, never both in the same block.** Both marks available on any desk; the choice is editorial. Rough guideline: reversed-highlight for hard-news / data / archive (emphasis on a specific noun or number); circled for editorial / voice / specimen / feature (emphasis on a phrase the piece is *about*). Updated `brand/visual-system.md` § Two headline moves.

**Why:** the reversed-highlight had become a monoculture — used on every headline across the Atlas, home lead, Recent Curiosities cards. Dene: *"Somewhere along the line the text highlight effect ... seems to have taken over every headline. What happened to the circle effect?"*

### 3. Primary social asset format locked — 4:5 portrait (1080×1350)

No single ratio works across every platform, so:

| Surface | Ratio | Size | Role |
|---|---|---|---|
| Primary social asset | 4:5 portrait | 1080×1350 | IG feed, LinkedIn feed, Twitter feed — this is what we design for |
| OG / link preview | 1.91:1 | 1200×630 | Twitter cards, Substack, FB link previews — cropped / relaid from the 4:5 |
| Stories / Reels | 9:16 | 1080×1920 | Pad the 4:5 with an ink strip above and below carrying wordmark + byline — no redesign |

The website's plate is wide (map + prose gutter); the **social card is its own composition**, 4:5 portrait, using the same grammar (cartouche, hatched pastels, per-piece stamp, misreg). Two layouts, one visual language — not auto-cropped from the site. Social-card prototype is a Session 5 task.

### 4. Cartography template grammar locked — "The Plate × Photocopy Hand"

After building three style-exploration mockups (`brand/mockups/atlas-direction-{a,b,c}.html`), Dene's three favourite references — Coralie Bickford-Smith (Penguin Clothbound Classics), Federica Fragapane (La Lettura), Nicholas Rougeux (Byrne's Euclid) — pulled toward a hybrid. The locked spec: Direction A's typographic chrome + Direction C's photocopy textures; Direction B's (Fragapane) bespoke-glyph network was dropped as incompatible with the 70%-evergreen batch workflow and the format's need to support small-multiple Grid pieces.

**Cartography grammar (see `brand/visual-system.md` § Plate for full spec):**
- Cartouche top-left overhanging the frame: `Fig. N` (Atkinson caps + vertical divider) + plate title (italic DM Serif)
- Per-piece stamp top-right overhanging the frame, ink-jittered — Bickford-Smith's "one motif per piece" move. Extradition Atlas gets a suitcase; future Cartography pieces pick their own motif per piece
- 1.5 px ink plate frame, square corners; wobble rules inside as row dividers
- Two-column body: map (2.15fr) + plate-intro gutter (1fr). 300-500 word long prose continues *below* the plate
- Classifying legend as a table — Werner's Nomenclature grammar: glyph / NAME / count (mono) / italic referent
- Stats strip with two-plate misregistration: `var(--desk)`-coloured shadow offset 2 px behind each ink glyph, ink-jittered. Pink misreg (from the initial prototype) was rejected as a second-pastel violation on Data-desk pages
- Map countries use SVG `<pattern>` hatched fills (paper-green 45° for treaty, paper-yellow −45° for reluctant, paper-pink cross-hatch for haven, paper-brown stipple for suspended, paper-purple 45° for EU-bloc), photocopy-white for no-treaty, ink for anchor
- Ink-jitter filter applied to the path group (`<g>`) so borders read photocopied but the tooltip (outside the SVG) stays crisp
- Controls (chips + haven toggle) live **outside** the plate

Reference implementation: `site/src/templates/Cartography.astro`. Piece implementation: `site/src/pages/pieces/extradition-atlas.astro`. Prototype history: `brand/mockups/atlas-direction-{a,b,c}.html` (rejected variants) + `brand/mockups/atlas-hybrid.html` (locked spec).

### 5. Data correction: 115 → 78 countries without a US extradition treaty

Homepage mockup claimed "115 countries that will not send you home / 79 treaties · 115 without." Ported POC data + State Department current figures give 117 treaty partners / ~78 no-treaty. Per the CLAUDE.md rule (never fabricate data), the headline was rewritten. All copies updated:
- `site/src/pages/index.astro` — lead headline + stat card + breakdown
- `site/src/pages/pieces/extradition-atlas.astro` — headline + highlight span + prose

### Memory additions

Three new feedback memories saved during this session:
- **Design decisions — show, don't describe** — the landing page is the baseline; for visual calls, prototype and compare visually rather than offering abstract A/B/C menus
- **Act, don't ask within a scoped task** — once a task is agreed, keep moving; no permission asks for in-project file writes, deps, or equivalent implementation picks

### Files exercised / created today

- `site/src/styles/global.css` — added `--desk` token; dropped wall-to-wall background on `.cat-*` classes
- `site/src/components/Masthead.astro` + `Footer.astro` — all `var(--paper-purple)` → `var(--desk)` so chrome adopts per-page accent
- `site/src/templates/Cartography.astro` — rewritten to the Plate × Photocopy Hand spec; restored interactivity (chips, haven toggle, URL state, tooltip) + dynamic legend table + misreg stats
- `site/src/pages/pieces/extradition-atlas.astro` — passes `figNumber`, `plateTitle`, `emphasis` (circled), `sourceLine`; slots the suitcase SVG stamp + plate-intro prose; default slot carries the SEO long prose
- `site/src/pages/index.astro` — headline 115→78, stat card fixed, lead linked to Atlas
- `site/src/layouts/ArticleLayout.astro` — new (from earlier in the session)
- `site/src/lib/cartography/treaty-data.ts` — new (ported from POC, TypeScript, deduped)
- `brand/mockups/atlas-direction-{a,b,c}.html` — three style-exploration mockups (reference / rejected variants)
- `brand/mockups/atlas-hybrid.html` — the locked spec, with circled emphasis applied
- `brand/visual-system.md` — updated Core rules, Desk mapping, Two-headline-moves; added Plate component spec

### Fix worth logging

The first port of Cartography.astro silently dropped its entire `<style>` block because `:not()` inside `:global()` selectors (e.g. `:global(.toggle:hover:not(.is-active))`) broke Astro's scoped-CSS transformer. Also `:global(.circ::before)` should be `:global(.circ)::before` — pseudo-element lives outside `:global()`. Both fixed; worth remembering as Astro constraints.

### Open carry-overs

- **Sprout Social SMM licence** — still Dene's action.
- **Lead-story visual pattern** on the home page right column — still undecided. Current: paper-blue stat card with `78`. Dene said earlier he doesn't know what goes there.
- **Auto-generated OG image** — still placeholder at `/og/default.png`.
- **Favicon** — still the Astro scaffold default at `site/public/favicon.svg`.
- **4:5 social-card prototype** for the Atlas — Session 5.

## 2026-04-20 — Session 3: Astro stack setup

The Astro site now lives inside this repo at `site/` — **not** in a separate `~/projects/inkwell-review-site/` codebase as yesterday's brief suggested. Dene's call: keep everything under the Inkwell Review project folder. The 19 April "keep separate from HealthDASH" decision is preserved (HealthDASH remains fully separate); only the "separate from Inkwell Review's own repo" part was overridden.

### Stack

- **Astro 6.1.8**, minimal template, TypeScript strict, pnpm.
- **Tailwind v4** via `@tailwindcss/vite` (CSS-first config — fits the token-driven approach).
- **Vercel adapter** (`@astrojs/vercel`).
- **Sitemap integration** (`@astrojs/sitemap`). Requires `site: 'https://inkwellreview.com'` in `astro.config.mjs` — set.
- **RSS helper** (`@astrojs/rss`). Endpoint at `site/src/pages/rss.xml.ts` publishes an empty feed stub (title, description, language) until content collections land in Session 4+.

### Files in place

```
site/
├── astro.config.mjs              site URL + Vercel adapter + Tailwind + sitemap
├── public/
│   ├── fonts/                    14 Atkinson Hyperlegible Soft woff2 files
│   ├── assets/                   speckle-{dark,light}.svg, masthead-tray-ink.png,
│   │                             ollie-portrait-ink.png
│   └── robots.txt                allows everything, cites sitemap-index.xml
├── src/
│   ├── styles/
│   │   └── global.css            full port of colors_and_type.css plus the
│   │                             mockup's system patterns (wobble rules,
│   │                             speckle overlays, ink-jitter selector)
│   ├── layouts/
│   │   └── BaseLayout.astro      meta, OG, Twitter, canonical, Schema.org
│   │                             Article (optional), favicon, RSS link,
│   │                             sitemap link, Plausible script, ink-jitter
│   │                             SVG <defs>, category body-class wrapper
│   ├── components/
│   │   ├── Masthead.astro        Monocle-style, type-only, locked spec
│   │   ├── Footer.astro          4-column Namesake-pattern footer
│   │   └── CuriosityCard.astro   typed props: category / kicker / headline
│   │                             with optional highlight / standfirst / etc.
│   └── pages/
│       ├── index.astro           homepage — 1:1 port of the mockup
│       └── rss.xml.ts            empty RSS feed stub
```

`site/.claude/launch.json` is at repo root (`.claude/launch.json`) because Claude Preview expects launch configs there; `pnpm dev` server is run with `pnpm --dir site dev`.

### Analytics

Plausible tag: `<script defer data-domain="inkwellreview.com" src="https://plausible.io/js/script.js"></script>` in BaseLayout. Hosted at plausible.io (not self-hosted). Ignores localhost automatically, so dev is clean. The site is **not yet** registered in the Plausible dashboard — Dene to do that when the domain is live.

### SEO essentials shipped

- Per-page title + description (defaults on `BaseLayout.Props`)
- Canonical URL (derived from `Astro.site` + `Astro.url.pathname`)
- OG + Twitter Card meta (image: `/og/default.png` placeholder — auto-OG is deferred)
- Schema.org Article JSON-LD — emitted only when `article={…}` prop is passed
- RSS endpoint (empty feed, correct meta)
- Sitemap (generated by integration)
- robots.txt

### SEO deferred

- **Auto-generated OG image** — `/og/default.png` is a placeholder path. Real auto-OG (probably via Satori or similar) is its own session.
- **Custom favicon** — still the Astro default scaffold SVG at `site/public/favicon.svg`. Wordmark-favicon belongs with a Claude Design pass.

### One fix worth logging

Tailwind v4's `@import "tailwindcss"` expands inline, which pushes any later `@import url(...)` statements past "other statements" and trips the CSS spec rule (PostCSS warns). Fix: put the two Google Fonts `@import url(...)` statements **before** `@import "tailwindcss"` in `site/src/styles/global.css`. Remote fonts must come before everything else.

### Homepage — renders 1:1 with the mockup

Verified visually in Chrome at `http://localhost:4321/` (screenshot also captured via Claude Preview). Matches `brand/mockups/inkwellreview-home.html`:

- Masthead: ink-reversed, type-only, centred wordmark, italic strap, purple double-rule, centred nav (Latest underlined active)
- Lead: kicker with blue swatch + wobble rule, ink-jittered `.hl` highlight on "115 countries", italic DM Serif standfirst, caps meta row, stat card on paper-blue with "115" in DM Serif Display
- Recent Curiosities: six-card 3-col grid over the `masthead-tray-ink.png` 18% atmospheric wash
- Editor's letter: portrait left / text right, drop-cap lede, `— Ollie` signoff, role line
- Subscribe strip: paper-purple panel with email input + submit
- Footer: four columns on ink, mono copyright, social pills, italic colophon

Wobble rules, speckle overlays, and ink-jitter all active. Plausible silently ignores localhost pings in console (expected behaviour).

### Open carry-overs (still Dene)

1. **Sprout Social SMM licence** — unchanged from yesterday. Still to be checked with manager / HR / IT.
2. **Lead-story visual pattern** — confirm the "big-number stat card on Data-blue" is the right default, or swap to a miniature of the real interactive. Unchanged from yesterday.

### Tooling-backlog scan result

Scanned at session start. Astrotypes, Keystatic/Morrisson/TinaCMS, Bearnie — none of the trigger conditions fire. Skipped as expected.

## 2026-04-20 — Wrap pass: masthead, atmosphere, woodcut register

End-of-day pass after a long iteration on the homepage and brand-style direction. Major architectural reset on the masthead; codification of the woodcut-register tweaks; first AI-generated tableau illustration landed. State of `brand/mockups/inkwellreview-home.html`:

### Masthead — fully re-architected (Monocle-style, type-only)

The earlier "ink-reversed Option A with right-column purple Ollie" landed during the morning iteration is **superseded**. Final state:

- **Type-only, centred.** Wordmark on a single line (`Inkwell` + italic `Review`, DM Serif Display, `clamp(48px, 10vw, 132px)`, `white-space: nowrap`) — no longer stacked.
- **Italic strap** ("Statistical peculiarities of human behaviour.") centred beneath the wordmark, 17 px DM Serif Display italic, paper-purple.
- **6 px purple double-rule** beneath the strap.
- **Centred section nav** below the rule (Latest / Archive / Subscribe), 12 px Atkinson 800 caps, 28 px gap between items, **active state is a 2 px paper-purple underline — *not* a reversed chip.**
- Caps line ("Vol. I · No. III · Edited by Ollie · Twice weekly") **removed**. No vol/issue/byline rail in the masthead.
- **No image of any kind in the masthead.** Right-column Ollie variants (purple portrait, purple horizontal crawling, AI-generated tray cluster) all explicitly tested and rejected — they made the masthead read as stilted (vertical stack of unrelated elements). Reference implementation moved away from "decorate the masthead" and toward "type-only, decoration goes elsewhere."

Reasoning captured for next session: most editorial mastheads worth copying (NYT, Economist, Monocle, FT) are type-only. The publication's illustrative register lives in section ornaments, atmosphere washes, and chapter breaks — not in the chrome.

### Atmospheric tray-wash behind Recent Curiosities

A new system pattern. The Recent Curiosities section now carries a full-viewport-width atmospheric wash of the tray-of-specimens illustration:

- Asset: `brand/assets/masthead-tray-ink.png` (1536 × 410, photocopy-ink `#111` tint, transparent background).
- Implementation: `.recent::before` pseudo-element, `position: absolute; left: 50%; transform: translateX(-50%); width: 100vw;` for full viewport breakout, `background-size: 100% auto; background-position: center; opacity: 0.18`. Body needs `overflow-x: hidden` to suppress the breakout's horizontal scrollbar.
- Why ink not purple: at 0.15–0.20 opacity, paper-purple reads as a near-invisible pinkish ghost; ink reads as a clean grey watermark that actually communicates "atmosphere." Codified in `brand/visual-system.md` § "Atmospheric tray-wash."

### From-the-desk section restructured

- Image swapped from horizontal crawling Ollie back to portrait. New asset `brand/assets/ollie-portrait-ink.png` (clean alpha extraction of the portrait JPG; the source has no baked-in frame, unlike the crawling source).
- Layout flipped: **portrait on the left, text on the right** (was text-left / image-right in the morning iteration).
- No frame, no border, no background fill on the portrait — sits naturally in the column.
- Copy tightened to three lines: head + one paragraph + sign-off.
- `Editor · Common octopus · Since issue 01` role line restored beneath signature.

### Reinforcement moves codified (woodcut register)

Three small treatments added to the system as reusable patterns. All three live on the homepage and are documented in `brand/visual-system.md` § "Reinforcement moves":

1. **Hand-stamped wobble rules.** SVG `<path>` background-image rendering a slightly wavy hand-stamped rule, three weights as CSS custom properties (`--rule-wobble`, `--rule-wobble-heavy`, `--rule-wobble-double`). Applied via `.rule-wobble-bottom` / `.rule-wobble-top` utility classes to lead kicker, Recent Curiosities head, editor's-letter top/bottom and h3.
2. **Drop cap on long-form lede paragraphs.** First paragraph after editor's-letter standfirst gets a 5.4 em DM Serif Display capital, floated.
3. **Ink-jitter on highlight bars.** SVG `<filter>` with `feTurbulence` + `feDisplacementMap` (scale 1.4, baseFrequency 1.4, fractalNoise) applied to all `.hl` reversed-highlight bars.

### Removed from earlier in the day

Items that landed during morning iteration but were rejected by end-of-day (do not re-introduce without explicit Dene approval):

- Roman numeral "§ II" marker before "Recent Curiosities" head — removed.
- Three-fleuron section ornament "❦ ❦ ❦" between Recent Curiosities and editor's letter — removed.
- Printer's-mark endpiece (small purple Ollie portrait + italic "Printed in ink, twice weekly." line above the footer bottom bar) — removed.
- Caps line "Vol. I · No. III · Edited by Ollie · Twice weekly" in the masthead right column — removed.

The `.ornament` and `.foot__mark` CSS rules remain in `inkwellreview-home.html` as inert utility classes — left in case the patterns get re-used elsewhere; safe to delete on Astro port.

### Recent Curiosities renamed and grown

- Section title changed from "This week's desks" → **"Recent Curiosities."**
- Card grid grown from 3 to 6 cards (2 rows × 3 cols), covering all six desk colours: Voice (yellow), Cities (green), Archive (brown), Cover (purple), Data (blue), Interviews (pink).

### Brand register — illustration anchors expanded

Visual reference set for any commissioned or AI-generated illustration:

- **Existing:** Namesake (namesake.fyi), the linocut snail mark.
- **Added today:** Penguin Classics cover engravings, plates from Diderot's *Encyclopédie*, plates from Buffon's *Histoire Naturelle*.
- All five together define the illustration register: 19th-century natural history woodcut, heavy black ink linework, hatching and cross-hatching for shading, hand-printed imperfection. Codified in `brand/visual-system.md` and `brand/asset-prompts.md`.

### Asset processing recipe codified

The luminance-driven alpha extraction we've been using ad-hoc (originally for the Ollie variants, today for the AI tray) is now documented as the canonical pipeline for converting any white-background linocut source into transparent tinted PNGs. See `brand/visual-system.md` § "Asset processing recipe."

Standard thresholds: `HI = 200, LO = 60` for clean linocuts; `HI = 220, LO = 90` for sources with significant grey midtones.

**Critical step**: always inspect the source for a baked-in printed frame (10–20 px black border inside the image edge — the original `ollie-crawling.png` had one at ~14 px thick). Crop past it before processing, or the frame survives as a black plate around the silhouette.

### New file: `brand/asset-prompts.md`

Captures the AI image generation prompt templates that produced usable Inkwell illustrations. Two compositional flavours documented (single specimen / portrait, naturalist's tableau / tray), plus the canonical style block, aspect-ratio gotchas (most chat-based generators force square; use Midjourney `--ar 5:1` or Ideogram for true banner shapes), and the post-processing handoff steps.

### Assets landed today

In `brand/assets/`:
- `masthead-tray-raw.png` — AI-generated source (1536 × 1024, ChatGPT image gen, naturalist's tray, three iterations to get composition right; first kept).
- `masthead-tray-banner.png` — paper-purple, full-width banner crop (1536 × 410).
- `masthead-tray-cluster.png` — paper-purple, dense right cluster only (976 × 410).
- `masthead-tray-ink.png` — photocopy-ink, full-width banner crop. **In production use** as the Recent Curiosities atmosphere wash.
- `ollie-portrait-ink.png` — clean ink alpha extraction of the portrait JPG.
- `ollie-crawling-ink.png` — clean (frame-cropped) ink alpha extraction of the crawling source. Supersedes `ollie-crawling-trans.png` for new uses.
- `ollie-crawling-purple.png` — re-generated from the cropped source (1876 × 1100 horizontal band, paper-purple). Supersedes the earlier framed version.

### Files exercised today

- `brand/mockups/inkwellreview-home.html` — final canonical state of the homepage. The Astro port in Session 3 should model on this file plus `brand/design-system/project/ui_kits/website/index.html`.
- `brand/mockups/masthead-tray-options.html` — exploration file for the rejected right-column-tray architecture. Kept for reference; not referenced from anywhere; safe to delete or leave.
- `brand/visual-system.md` — added illustration register, reinforcement moves, atmospheric tray-wash, asset processing recipe sections; updated masthead component spec; updated Ollie crawling derivative list; added tray-of-specimens entry.
- `brand/asset-prompts.md` — new file (see above).

## 2026-04-20 — Home-page mockup locked after full iteration

End of the homepage design pass. State of `brand/mockups/inkwellreview-home.html`:

- **Masthead** — ink-reversed (Option A), 6 px double-rule bottom in purple.
  - Top rail REMOVED (no more Vol./Iss./URL fluff).
  - Wordmark (stacked "Inkwell / Review" in DM Serif Display, 72–140 px clamp) on the left.
  - Right column: "Edited by Ollie · twice weekly" caps line → horizontal purple Ollie (`brand/assets/ollie-crawling-purple.png`, 130 px tall) → nav with three items (Latest → `#recent` / Archive / Subscribe → `#subscribe`).
  - Bottom strap: italic "Statistical peculiarities of human behaviour." in DM Serif Display, 15 px, above the double-rule.
- **Lead story** — two-column grid. Text left (kicker + reversed-highlight headline + standfirst + meta), stat card right on Data-blue paper with `115` in DM Serif Display (~200 px) and a source line. Visual pattern pending confirmation: big-number card vs reduced map/chart vs actual-interactive miniature.
- **Desks grid** — three-card row using Voice-yellow / Cities-green / Archive-brown swatches.
- **Editor's letter** — two-column: Ollie portrait (`brand/assets/ollie-portrait.jpg`, `mix-blend-mode: multiply`) + copy + `— Ollie` signoff.
- **Subscribe strip** — purple panel between content and footer. Stays outside the footer per Dene's feedback.
- **Footer** — four link columns (Branding / About / Legal / Read), bottom bar with social pills. No giant wordmark. No crawling Ollie. `overflow: hidden` no longer needed.
- **Speckle** — two SVG files at `brand/assets/speckle-{dark,light}.svg`. Each with ~90 dots placed at fully random coords in a 720–780 px tile. `body::before` dark + multiply blend for light surfaces; `body::after` light + screen blend for ink surfaces. This replaces the earlier radial-gradient stack, which was reading as a grid.

### Ollie crawling assets — corrected source

The raw side-profile octopus Dene attached on 2026-04-19 was initially extracted from the wrong position in the session transcript (a Namesake reference screenshot was grabbed instead). Corrected 2026-04-20 by re-scanning the JSONL and identifying the 2000×2000 JPEG at line 275. Processed into:
- `ollie-crawling.png` — the raw source (renamed JPEG; browsers don't care about extension).
- `ollie-crawling-trans.png` — transparent PNG using a strict alpha curve (luminance ≥ 220 → transparent, ≤ 90 → opaque, smooth ramp between). Alpha distribution verified: 80% transparent, 15% opaque, 5% edge anti-alias.
- `ollie-crawling-purple.png` — same alpha with paper-purple `#CDA5EF` fill for the masthead.

### Masthead variants file retained

`brand/mockups/masthead-variants.html` still shows all three options (A ink-reversed locked, B broadsheet giant, C purple paper + Ollie up top). Kept as reference; B and C remain unused. Don't re-open the question unless explicitly asked.

## 2026-04-20 — Home-page surface tuned

Iteration on `brand/mockups/inkwellreview-home.html` after first live review:

- **Masthead direction locked: Option A (ink-reversed).** Black background, paper-purple wordmark at `clamp(72px, 10vw, 124px)`, purple caps nav with inverted active chip, 6 px double-rule in purple separating from content below. This is the locked home-page masthead treatment; variants B (broadsheet giant) and C (purple paper + Ollie up top) remain in `brand/mockups/masthead-variants.html` as unused alternatives. The ink masthead + ink footer frame the pale content as a photocopy page.
- **Giant footer wordmark removed from home page.** The "closing chord" giant wordmark is no longer used on the home surface. It remains an available system move for other surfaces (end of article, about page) but is no longer required on the footer by default.
- **Side-profile Ollie landed as `brand/assets/ollie-crawling.png`.** Horizontal linocut, same register as the portrait, used for the crawling animation at the top edge of the footer. Rendered with `filter: invert(1)` + `transform: scale(1.1)` to hide the source image's thin black border and reverse the ink for the dark footer.
- **Speckle tuned.** Previous density was too uniform and too many. Now eight differently-sized, irregularly-positioned radial gradients at 251–589 px tile pitches with `opacity: 0.45` and `mix-blend-mode: multiply`. Reads as random photocopy grain rather than a visible grid.

## 2026-04-19 — Three reconciliations resolved + Ollie portrait landed

Following Claude Design Session 2 handoff:

- **Desks + formats → orthogonal (Option a).** Every piece has a **desk** (determines paper colour — Cover/Data/Voice/Cities/Archive/Interviews) and a **format** (determines template shape — Cartography/Life/Shrinkage/Grid/Specimen). Example: Extradition Atlas = Data desk (blue paper) + Cartography format. The two axes do not collapse.
- **Namesake added as the visual anchor.** The editorial reference trio (Works in Progress / Monocle / Economist) stays as the *positioning* frame. Namesake (namesake.fyi) is now explicitly the *visual* inheritance anchor, not implicit.
- **Ollie portrait landed at `brand/assets/ollie-portrait.jpg`.** Fine-line linocut in the Namesake-snail register. Used on about page, homepage "from the desk", and near signoffs on Voice-desk pieces. Does **not** appear in masthead, logo, or chrome. Always rendered with `mix-blend-mode: multiply` so the JPEG white background disappears on any paper. The "commission placeholder" framing is dispensed with.
- **Speckle texture locked as a required rule.** Both photocopy-white and pastel-paper page backgrounds must carry the subtle dot imperfection via `.speckle` or a fixed overlay. Aligns with Namesake. Reference implementation: `brand/mockups/inkwellreview-home.html`.
- **Homepage mockup at `brand/mockups/inkwellreview-home.html`.** First tangible render of the full home surface — masthead, lead story, three-card desk grid, editor's letter with Ollie portrait, subscribe strip, giant wordmark footer. Visual direction confirmed; tweaks expected as real pieces get built.

## 2026-04-19 — Visual system locked (Decisions 2–5)

Via Claude Design Session 2. Full handoff bundle at `brand/design-system/`; canonical brand book at `brand/visual-system.md`.

- **Typography locked:** Atkinson Hyperlegible Soft (everywhere readable, 200–800 weights) + DM Serif Display (wordmark + italic voice) + JetBrains Mono (numerals only). Atkinson ships locally from `brand/design-system/project/fonts/`; DM Serif + JetBrains Mono load from Google Fonts.
- **Palette locked:** photocopy ink `#111111` + photocopy paper `#E1E1E1` (never move). Six pastel papers mapped to six editorial desks: Cover=purple `#CDA5EF`, Data=blue `#96C7F2`, Voice=yellow `#ECDD85`, Cities=green `#97CF9C`, Archive=brown `#DDB896`, Interviews=pink `#ECADD4`. Home and index surfaces are photocopy-white with purple as the single accent, used sparingly.
- **Logo locked:** no bespoke icon mark. No monogram. No octopus silhouette in the chrome. Wordmark (stacked "Inkwell / Review" in DM Serif Display, italic second line) is the entire brand. An illustrated Ollie portrait is reserved as a future commission in the fine-line Namesake-snail register.
- **Ollie's signature mark locked:** typographic — em-dash + italic "Ollie" in DM Serif Display. No drawn mark.
- **Masthead locked:** three tiers (caps rail · wordmark + nav · italic serif strap) bounded by 6 px double-rules top and bottom. Active nav chip reverses to current paper colour. Implementation in `brand/design-system/project/ui_kits/website/`.
- **Two signature moves:** reversed-highlight (ink bar behind text, text in current paper colour) and circled emphasis (rotated hand-drawn oval). Never both in same block, never on body copy.
- **Visual reference anchor:** Namesake (namesake.fyi). Adopted during Session 2 iteration. The Works in Progress / Monocle / Economist trio from Decision 1 remains the *editorial* positioning anchor.

**Open reconciliations** (see `brand/identity-brief.md` §"Open reconciliations"):
1. Desks (six from the design system) vs formats (five from content strategy locked 18 April) — two orthogonal classification systems. Needs explicit mapping before Session 4 template work.
2. Whether to add Namesake explicitly to the reference trio or keep it implicit.
3. Timeline and budget for the deferred Ollie portrait commission.

**Ollie's role in CLAUDE.md updated:** he is a column, not a mascot; signs off `— Ollie` in italic DM Serif. Does not appear in the logo, masthead, or chrome.

## 2026-04-19 — Distribution strategy locked

Captured in `strategy/distribution.md`. Eight decisions:

- **Channels:** IG, X, LinkedIn, Threads, Bluesky, weekly newsletter. TikTok deferred (revisit at month 6).
- **SMM tool:** Dene to check Sprout Social employee licence first; Claude to recommend 2–3 free alternatives if unavailable.
- **Site role:** canonical. inkwellreview.com is the home of every interactive piece; social posts are trailers driving traffic back.
- **Newsletter:** Substack at newsletter.inkwellreview.com for 6 months, then re-evaluate (migrate to own infra if ≥1,000 engaged subscribers).
- **Growth bets:** journalist flywheel (press kit at /press) + SEO from Day 1. Selective collabs from month 3+. No paid.
- **Stack:** Astro + Tailwind + Vercel + Plausible. Completely separate codebase and design system from HealthDASH.
- **Pipeline:** publish-once on the site → auto-generated social variants (1080×1350 / 1080×1080 / 1200×675 / 1080×1920 / OG card) → SMM tool weekly approval. RSS feeds Substack.
- **Analytics:** Plausible from Day 1 (required for the 6-month Substack migration test).

## 2026-04-19 — Identity brief de-fabricated

Earlier "LOCKED" claims in `brand/identity-brief.md` for typography (Fraunces / Inter Tight / JetBrains Mono), palette (navy / amber / sage / rust), and masthead format (`INKWELL REVIEW · VOL. 47`) were lifted from the Extradition Atlas — a Claude-generated artefact that Dene had not weighed in on. Stripped from locked status. Now treated as starter hypotheses for the Claude Design exploration in Session 2. Decision 1 (mood + reference publications) remains the only true Session 1 lock. Brief at `brand/claude-design-brief.md` is the paste-ready prompt for the Claude Design session.

## 2026-04-18 — Identity mood locked (Decision 1, full)

- **Mood sentence:** *"Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner."*
- **Role:** The upstream test every future piece is held against. If a piece doesn't feel like insight for people who pay attention, meticulously sourced, and worth repeating at dinner — revise, don't ship.
- **Reference publications (2–3 picked):** Works in Progress, Monocle, The Economist.
  - *Works in Progress* — editorial DNA: essayistic rigour, citation culture, readership flattered into paying attention.
  - *Monocle* — design DNA: handsome object, confident grid, production quality.
  - *The Economist* — data DNA: chart-first thinking, twice-weekly briefing cadence, authority without bluster.
- **Position in one line:** a Monocle-looking object containing Works in Progress-grade rigour, built around Economist-grade charts.

## 2026-04-18 — Tooling split locked

- **Claude Code:** operating system, templates, voice files, research, version control. Primary daily workspace.
- **Claude Design:** visual iteration only — logo, Ollie's signature mark, carousel design, profile pictures, future sponsor pitch decks.
- **Bridge:** Claude Design exports (SVG, HTML) drop into `brand/assets/` and `brand/templates/` in the Claude Code project.
- **Rationale:** Claude Code is better for version-controlled, text-and-working-code tasks. Claude Design (launched as research preview 17 April 2026) is better for visual exploration. Each tool does what it's best at.
- **Budget awareness:** Claude Design has separate weekly usage limits. Plan for ~60% of a weekly budget on identity work alone.

## 2026-04-18 — Project initialised in Claude Code

- Project migrated from chat thread to local Claude Code project at `~/projects/inkwell-review/`

## 2026-04-18 — Infrastructure locked

- **Domain:** inkwellreview.com (purchased, ~$19/yr)
- **Email:** ollie@inkwellreview.com (Google Workspace Business Starter, ~US$7/month)
- **Aliases:** hello@, press@, sponsor@ (all route to ollie@)
- **Instagram handle:** @inkwell_reviews (secured)
- **X/Twitter handle:** @inkwell_reviews (secured)
- **Social display name:** "Inkwell Review" (not "Ollie Inkwell")

## 2026-04-18 — Brand identity locked

- **Publication name:** Inkwell Review
- **Character:** Prof. Ollie Inkwell — a common octopus, editor of the publication
- **Ollie's role:** Fronts the publication (editor), does not *be* the entire publication
- **Tagline:** Not locked. Two candidates:
  - "Data visualisations of how humans behave"
  - "On the peculiarities of Homo sapiens"

## 2026-04-18 — Voice rules locked

- **Register:** Plain, sharp English — 90% of caption. Character is 10% seasoning.
- **Opening line:** Sharpest number or fact. Hook first, context second.
- **Sentence rhythm:** Short. One idea each.
- **Wit:** In word choice, not sentence structure.
- **Kicker:** One-line closer signed `— Ollie`.
- **First-person "I"** in captions: forbidden. Ollie can say "I" only in the "about" page or an occasional Ollie's verdict aside.
- **No generic openers** — "Did you know…", "It's fascinating that…", "In today's world…"
- **No moralising** — state the finding, let readers draw the lesson.
- **Opinions** — earned from data, not projected onto it.
- **Character appears in:** signature, logo, masthead, occasional "Ollie's verdict" asides, about page, replies, merch, year-in-review posts.

## 2026-04-18 — Content strategy locked

- **Formats (5):** Cartography, Life, Shrinkage, Grid, Specimen
- **Content mix:** 70% evergreen / 15% seasonal / 15% reactive topical
- **Cadence:** 2 pieces/week on IG & X (Tue + Fri). Daily fragment on X. Weekly LinkedIn. Weekly newsletter.
- **Cooling-off rule:** No topical piece ships the same day it's drafted. 4-hour minimum.
- **Launch slate order:** Extradition Atlas → Fugitive Destinations → What's Legal Where → Causes of Death by Age → Shrinking Chocolate Bar → Where Billionaires Sleep → Tipping Atlas → Names That Died → How the World Wakes Up → Michelin vs McDonald's → Loneliness Curve → One Day in Life of Median Human

## 2026-04-18 — Non-negotiables locked

- Every factual claim has a cited source
- Never fabricate data
- No mockery of named private individuals (public figures/institutions fair game)
- `/voice-check` passes before anything ships
- Hard stops: child safety, health misinformation, electoral disinformation

## 2026-04-18 — Piece #1 published

- **The Extradition Atlas** — built as interactive HTML, 8 anchor countries, 4-state colour coding. Archived at `context/the-extradition-atlas.html`.

## 2026-04-18 — Operating system locked

- **System:** Claude Code on Mac, manual trigger each morning
- **Four commands:** `/scan`, `/produce`, `/voice-check`, `/retro`
- **File-based workflow:** markdown, CSV, HTML on disk. No direct posting.
- **Scheduler:** Buffer or Metricool (not yet chosen)
- **Substack:** claimed or not — TBC

## Decisions explicitly deferred

- Profile picture / avatar design
- Substack setup
- Scheduler choice (Buffer vs Metricool)
- LinkedIn company page
- Secondary domain purchase
- Print-on-demand partner
- Merchandise store
- Trademark registration
- Legal entity formation
