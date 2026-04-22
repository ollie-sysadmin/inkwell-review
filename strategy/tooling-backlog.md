# Inkwell Review — Tooling Backlog

*A running register of tools, libraries, services, and resources that have been evaluated and deferred. Each entry has a trigger condition — when that condition fires, the entry should be surfaced to Dene.*

---

## How this doc works

- **When Dene defers a tool recommendation:** add an entry here with the trigger condition for revisiting.
- **At the start of any session that touches a category in this list** (stack work, content workflow, design tokens, growth experiments, etc.): scan this doc and surface anything whose trigger condition has fired.
- **At `/retro`:** scan the entire backlog and report on what's now relevant.
- **Pattern:** don't pre-optimise. Don't lose deferred items either. This doc is the receipt.

---

## Active backlog

### Astrotypes — font CLI for Astro
- **Category:** Astro stack utility
- **What:** `npx astrotype add <pairing>` installs curated font pairings from Google Fonts / Fontshare / Bunny CDN and wires the Astro Fonts API. 209 pairings.
- **What it solves:** 15–30 minutes of manual `@font-face` boilerplate at stack setup
- **Cost:** free
- **Trigger condition:** Session 3 (stack setup) starts AND Claude Design's chosen typography is on Google Fonts, Fontshare, or Bunny CDN
- **Decision if triggered:** adopt. Zero downside.
- **Resource:** https://astrotypes.com/
- **Evaluated:** 19 April 2026

### Morrisson — Astro content editor (desktop)
- **Category:** content editing surface (git-based)
- **What:** desktop app (macOS/Windows). Form UI for YAML frontmatter + markdown. Commits to git. Files stay in repo.
- **What it solves:** the 20–30% of per-piece work that's prose + frontmatter editing, when Dene doesn't want to be in Claude Code
- **Cost:** $29 lifetime
- **Trigger condition:** after Piece #5 has shipped AND (Dene reports friction with frontmatter/prose editing OR wants to edit content from outside Claude Code — mobile, travel, late-night)
- **Decision if triggered:** evaluate Morrisson against Keystatic (below). Pick one.
- **Resource:** https://lexingtonthemes.com/morrisson
- **Evaluated:** 19 April 2026

### Keystatic — Astro-native git-based CMS
- **Category:** content editing surface (git-based) — alternative to Morrisson
- **What:** free, open source, web UI built specifically for Astro. Lives inside the Astro project, deploys with the site. Markdown stays in the repo.
- **What it solves:** same as Morrisson, but web-based (works from anywhere, no app install)
- **Cost:** free
- **Trigger condition:** same as Morrisson
- **Decision if triggered:** likely the stronger choice over Morrisson — web UI works from anywhere, native Astro integration, free
- **Resource:** https://keystatic.com/ (verify URL when adopting)
- **Evaluated:** 19 April 2026 (surfaced as category alternative to Morrisson)

### TinaCMS — commercial git-based CMS
- **Category:** content editing surface (git-based) — alternative to Morrisson/Keystatic
- **What:** commercial CMS with free tier. Web UI with inline editing. Git-backed.
- **Cost:** free tier; paid for teams
- **Trigger condition:** same as Morrisson, AND if Inkwell ever has multiple editors
- **Decision if triggered:** strongest of the three if multi-editor; otherwise Keystatic wins
- **Resource:** https://tina.io/
- **Evaluated:** 19 April 2026 (surfaced as category alternative)

### Decap CMS — generic git-based CMS
- **Category:** content editing surface (git-based) — alternative to Morrisson/Keystatic
- **What:** free, open source, web UI, generic (not Astro-specific)
- **Cost:** free
- **Trigger condition:** same as Morrisson, only if Keystatic and TinaCMS don't fit
- **Decision if triggered:** unlikely to win against Keystatic for an Astro project
- **Resource:** https://decapcms.org/
- **Evaluated:** 19 April 2026 (surfaced as category alternative)

### Satori / @vercel/og — auto-generated OG + social PNGs at build time
- **Category:** social / SEO build pipeline
- **Status (Session 7b, 21 April 2026):** **REJECTED.** Adopted then abandoned on the same day. Satori's partial CSS renderer can't reproduce the Inkwell card chrome (no `filter`, no `mix-blend-mode`, no SVG `<filter>`) — ink-jitter, speckle, and the misregistration shadow all broke in ways that couldn't be worked around. Dene flagged the PNG/HTML gap as "not within tolerance" after direct comparison.
- **Superseded by:** Playwright-based headless-Chromium export (`pnpm cards:export`). See `scripts/export-social-cards.mjs`.
- **Lesson:** when a brand's visual grammar leans on CSS features beyond flexbox + typography (filters, blend modes, complex SVG), don't assume Satori will carry. A/B against the HTML before committing.
- **Evaluated:** Session 4. Scaffolded Session 6. Adopted Session 7. **Rejected** Session 7b — all 21 April 2026.

### Playwright — headless-Chromium screenshot of the HTML card
- **Category:** social / SEO build pipeline (replacement)
- **Status (Session 7b, 21 April 2026):** **adopted.** `site/scripts/export-social-cards.mjs` runs locally; Vercel deploys the mirrored PNGs as static assets.
- **Deps pinned:** `playwright` (dev), Chromium installed via `pnpm exec playwright install chromium`.
- **Why local-only:** pixel-perfect fidelity, zero Vercel serverless complexity, Dene's review-then-approve flow maps cleanly to a dedicated export command.
- **Trade-off:** ~12s to export 11 cards; dev server must be running. Acceptable for twice-weekly cadence.
- **Resource:** `site/scripts/export-social-cards.mjs` and `site/src/pages/api/cards.json.ts`.

### Ocean curiosities pattern — hand-drawn source asset
- **Category:** cartography chrome / background texture
- **What:** A dense, Victorian-curiosities-style repeating pattern (in the style of the WhatsApp chat background reference) tiled across the ocean on Cartography-format maps. Renders beneath the country layer at low opacity so it never overtakes the data — "depth & interest for the sharp-eyed."
- **What it solves:** flat charcoal (#1F1F1F) ocean reads as minimal and correct today, but lacks the textured, print-shop feel that the rest of the Inkwell chrome carries (speckle overlay, wobble rules, ink-jitter, misregistration).
- **Cost:** free; needs one hand-drawn source image (SVG or PNG tile) supplied by Dene.
- **Trigger condition:** Dene produces (or commissions) a hand-drawn curiosities tile asset. SVG-coded attempts (21 April 2026, Session 5) weren't hitting the mark — too geometric, not drawn-by-hand enough; rolled back after several iterations.
- **Decision if triggered:** wire the supplied asset as an SVG `<pattern>` inside the Cartography template's map `<defs>`, fill a full-viewBox `<rect>` with `fill="url(#...)"` behind the country group. Country paths naturally render on top. Opacity tuning in `stroke-opacity` on the pattern elements so it stays sub-threshold.
- **Resource:** scrapped SVG implementation lives in git history on `site/src/templates/Cartography.astro` around 21 April 2026 Session 5; revisit that for wiring structure if needed.
- **Evaluated:** 21 April 2026 (Session 5). Deferred pending hand-drawn source.

### Bearnie — UI component library for Astro + Tailwind
- **Category:** UI component library
- **What:** standard primitives (buttons, inputs, modals, cards, navigation) for Astro + Tailwind. Open source.
- **What it solves:** boilerplate for app-like UI surfaces
- **Cost:** free
- **Trigger condition:** Inkwell adds a non-publication surface — subscriber portal, search interface, data-explorer tool, paid-tier dashboard
- **Decision if triggered:** evaluate against alternatives (shadcn-for-astro, Radix-via-Astro, plain Tailwind UI patterns)
- **Resource:** https://bearnie.dev/docs/components/
- **Evaluated:** 19 April 2026

### Editor Dashboard — single-tenant web app over the workflow
- **Category:** editorial tooling / stepping stone to the productised SaaS vision
- **What:** a web UI ("admin panel") Dene logs into that surfaces workflow state at a glance and exposes the four slash commands (`/scan`, `/produce`, `/voice-check`, `/retro`) as buttons. Powered by the Claude Agent SDK server-side; streams agent runs to the browser; file-based state stays in the existing repo. Explicit UI for the decision gates (pick angle, approve kicker, flip desk). Replaces the "hodge-podge of slash commands and remember-this-step-in-this-order" feeling of driving the workflow through Claude Code terminal.
- **What it solves:** (1) at-a-glance status of today's folder, queues, cooling-off timers, last voice-check verdict; (2) remote invocation (fire `/scan` from phone); (3) inline artefact previews (chart + social cards in-panel, not a separate dev server); (4) explicit decision-gate UI; (5) paves the road to the multi-tenant SaaS productisation plan.
- **Cost (build):** scrappy local-only MVP ~1–2 sessions (~8–15h); deployed good-enough daily driver ~3–5 sessions (~25–40h); polished ~6–10 sessions (~60–90h). The 2h `/produce` run is ~60% of the total build — making a long-running agent session resumable, cancellable, survivable across tab closes is the real engineering. Fire-and-email model (no live streaming) roughly halves it.
- **Cost (run):** ~$10–20/mo for a small VPS (Vercel serverless won't run Playwright + Astro dev server).
- **Trigger condition:** **four posts have shipped on the current CLI workflow AND Dene's friction log has >10 concrete repeated pain points.** Evaluated 22 April 2026: Dene raised the idea at the top of Session 9; recommendation was to ship first and let real usage reveal real friction rather than build against anticipated aesthetic discomfort. If friction log is 3 items and a vibe at Retro #2, it wasn't worth building.
- **Decision if triggered:** scope the MVP against the friction log, not against the full workflow. Start with the scrappy local-only version. Only build the deployed/polished tiers if the MVP earns them.
- **Related:** productisation north star ([memory](../../.claude/projects/-Users-deneschonknecht-Desktop-Claude-Projects-Inkwell-Review/memory/project_productisation_long_term.md)) — this dashboard is the single-tenant stepping stone to the multi-tenant SaaS.
- **Evaluated:** 22 April 2026 (Session 9 open).

---

## Categories worth flagging when new tools cross the radar

When a tool in one of these categories is suggested, evaluate it against existing project decisions before adding to the backlog:

- **Email/newsletter platform alternatives** to Substack — only relevant at the 6-month migration test (October 2026). See `strategy/distribution.md` §4.
- **Social media management tools** — pending Sprout Social employee licence check (`strategy/distribution.md` §2).
- **Analytics alternatives** to Plausible — only if Plausible's free tier becomes insufficient.
- **Image hosting / CDN** — Vercel handles by default. Only revisit if traffic exceeds Vercel free tier.
- **Print-on-demand partners** — deferred per `context/decisions-log.md`.
- **Design tools beyond Claude Design** — Claude Design is locked for visual iteration. Don't introduce Figma/Sketch/etc. without explicit reason.

---

*Last updated: 22 April 2026 (Session 9 — Editor Dashboard entry added).*
