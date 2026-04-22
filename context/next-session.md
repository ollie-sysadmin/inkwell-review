# Opening brief — next session (Session 9)

*Written 22 April 2026 wrapping Session 8. Read this first. Overwritten at the end of every session.*

---

## Where we ended

Session 8 shipped a lot. Net:

- **Piece #3 — AI Adoption Gap — drafted, voice-checked, PNGs exported.** The first *real* evergreen piece. Live in dev at [http://localhost:4321/pieces/ai-adoption-gap](http://localhost:4321/pieces/ai-adoption-gap). 16 PNGs ready at `social-output/` (5 AI Adoption + 8 Atlas + 3 FD). Voice-check PASSed after seven fixes (details in decisions-log Session 8 wrap).
- **Cartography template got three extensions** — per-anchor `statTiles` override, `showHavensToggle`, legend suspended-row support. Plus the social card gained an optional `footerStat.unit` slot (used as "%" on AI Adoption, "pp" on South Korea).
- **Contact-sheet card gallery + lightbox** — every Cartography piece now shows its social cards as a horizontal scroll strip below the plate, with a centered fit-to-viewport lightbox on click. Rewrote once after Dene's first review (grid → scroll strip). One open refinement: arrow buttons should flank the strip L/R, not cluster top-right — spawned as a separate task.
- **Content-selection strategy consolidated into `strategy/content-selection.md`.** Single canonical ruleset. CLAUDE.md, queue files, and the `/scan` skill now point at it.
- **Workflow diagram doc** — `context/workflow.md` — exists now as the pipeline blueprint (and the starting UX for the productised version, see below).

## Session 9 mission — **PRE-LAUNCH WALKTHROUGH**

Dene's direction for Session 9: *"A general walkthrough of our entire workflow needs to happen... step through all setup & optimisation tasks before we go live."* Step through [context/workflow.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/context/workflow.md) and [strategy/content-selection.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/strategy/content-selection.md), close every gap.

### Pre-launch checklist (Session 9 targets)

- [ ] **Website deployment to Vercel + domain live at inkwellreview.com.** Not deployed yet. DNS, env vars, Vercel project config all pending.
- [ ] **SEO + AEO / LLM-info page implementation.** Reference: [https://aminforoutan.com/blog/what-is-ai-info-or-llm-info-page/](https://aminforoutan.com/blog/what-is-ai-info-or-llm-info-page/). Covers `llms.txt`, AI-specific structured markup, AEO patterns. Per-piece Schema.org Article is already wired in [site/src/layouts/BaseLayout.astro](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/site/src/layouts/BaseLayout.astro); the AEO layer on top is new work.
- [ ] **Sitemap + robots.txt + RSS** — scaffolded; verify under the deployed domain.
- [ ] **OG image defaults.** Piece pages auto-wire to `social/0.png`; non-piece pages still serve `/og/default.png` placeholder. Needs a real default or a per-page generator.
- [ ] **Favicon** — still Astro default at [site/public/favicon.svg](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/site/public/favicon.svg). Needs a wordmark favicon (Claude Design task).
- [ ] **Plausible analytics dashboard** — site needs to be registered at plausible.io. The tag is already in [site/src/layouts/BaseLayout.astro](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/site/src/layouts/BaseLayout.astro); it's silent until the domain is live.
- [ ] **Substack** — `newsletter.inkwellreview.com` custom domain needs setup. 6-month commitment per [strategy/distribution.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/strategy/distribution.md) §4.
- [ ] **Sprout Social licence check** — still Dene's action with his employer. Fallback: Buffer / Metricool.
- [ ] **SMM tool setup** — once chosen, connect IG, X, LinkedIn, Threads, Bluesky accounts; configure the Tue/Fri queue; define Dene's weekly approval flow.
- [ ] **Press kit at `/press`** — growth bet #1 per distribution strategy. Currently doesn't exist.
- [ ] **`strategy/seasonal-calendar.md`** — file earmarked in the content-selection consolidation but not yet created. Nine beats documented; put them on a dated calendar.
- [ ] **Editorial voice training session** — queued pre-launch. Dene walks through drafts line-by-line, expanding [voice/examples.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/voice/examples.md). Three strong passages from Piece #3's voice-check already nominated for inclusion.
- [ ] **Performance tracking stub** — `performance/tracking.csv` doesn't exist yet. `/retro` fails cleanly without it, but create the stub so Issue 01 performance captures from Day 1.
- [ ] **Decide the fate of Atlas + FD.** Per [memory](file:///Users/deneschonknecht/.claude/projects/-Users-deneschonknecht-Desktop-Claude-Projects-Inkwell-Review/memory/project_test_pieces_are_disposable.md), they're test pieces — optional for the launch lineup. Dene's call whether they're in Issue 01 or retired.
- [ ] **`social-output/` gitignore decision** — transient files; probably shouldn't be committed (mirror in `site/public/pieces/` is what Vercel needs).

### Productise-this-workflow direction (long-term, shapes Session 9+ choices)

Dene stated at Session 8 wrap: **long-term plan is to productise the workflow into a multi-tenant editorial SaaS with a web UI.** The file-based `/scan` → `/produce` → `/voice-check` → `/retro` pipeline becomes a hosted editor experience. `context/workflow.md` is the starting UX blueprint.

**Not Session 9's job to build** — but Session 9's setup choices (DNS structure, env var shape, where skills live, content-collection shapes, template portability) should **bias toward portability**. Avoid hardcoding Dene-specific paths / credentials / assumptions where a parameterised alternative is available at similar cost. Flag the product implication whenever a Session 9 decision constrains it.

Saved to memory as `project_productisation_long_term.md`. Load that before making architectural calls.

## Piece #3 — ready to ship (waiting on Dene)

All assets generated. Remaining steps to go live:

1. **Three judgment calls** (still outstanding from Session 8 self-check):
   - Confirm desk — provisional Data-blue; flip if you want.
   - Approve shared kicker *"The country that wrote the menu is eating somewhere else."* (voice-check flagged this as a strong passage).
   - Approve hashtag set `#aiindex #generativeai #techpolicy #uae`.
2. `git commit` + `git push` → Vercel auto-deploys the site.
3. Upload the five AI Adoption PNGs from [file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/social-output/ai-adoption-gap/](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/social-output/ai-adoption-gap/) to SMM tool (once tool is picked).
4. Substack pulls RSS → light edit in Substack → send.

## Open carry-overs

1. **Website deployment + DNS** — top of Session 9 checklist.
2. **SEO/AEO implementation per aminforoutan article** — top of Session 9 checklist.
3. **Sprout Social SMM licence** — Dene's action.
4. **Lead-story visual pattern on home page** — still undecided. Currently a paper-blue stat card with `78`.
5. **Favicon** — still Astro default.
6. **Stamp overlap on narrow viewports** — HTML card polish item.
7. **Ocean curiosities pattern** — parked pending hand-drawn source.
8. **Symlink vs Astro `public/` scan** — cleanup pending.
9. **Editorial voice training session** — pre-launch requirement.
10. **Circled-emphasis trailing punctuation polish** — minor.
11. **`social-output/` gitignore decision** — transient, probably shouldn't commit.
12. **Gallery arrow buttons L/R repositioning** — spawned as a separate task (see the chip in the Session 8 scrollback).
13. **Seasonal calendar file** — owed per content-selection consolidation.
14. **Performance tracking CSV stub** — create pre-launch.

## Tooling-backlog scan at session start

Pre-launch walkthrough will touch: stack, content workflow, analytics, growth. The relevant [tooling-backlog](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/strategy/tooling-backlog.md) entries to scan:
- **Astrotypes** — already adopted (Session 3).
- **Keystatic / Morrisson / TinaCMS** — trigger is "after Piece #5 has shipped". Not yet. Skip.
- **Satori** — rejected. Skip.
- **Playwright** — adopted. Nothing to review.
- **Ocean curiosities pattern** — trigger unchanged. Skip.
- **Bearnie** — trigger is "Inkwell adds a non-publication surface". Productisation direction may now fire this — flag when the SaaS build starts (probably Session 10+).

## First move next session

1. **Read this file in full.**
2. **Read the Session 8 wrap + Session 8 main entry in `context/decisions-log.md`** (both at the top).
3. **Re-read [context/workflow.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/context/workflow.md) and [strategy/content-selection.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/strategy/content-selection.md)** — the Session 9 walkthrough targets.
4. **Scan the pre-launch checklist above. Work top-down, in roughly that order.** Deployment first (nothing else is verifiable without a live site), then SEO/AEO, then the supporting layers.
5. **If Dene hasn't signed off on Piece #3 yet**, start there before the walkthrough.

---

*End of handoff. Session 9 picks up from the header above.*
