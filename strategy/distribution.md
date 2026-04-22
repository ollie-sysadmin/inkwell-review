# Inkwell Review — Distribution Strategy

*Locked: 19 April 2026. The 8 decisions that gate the visual identity work and the production templates.*

---

## 1. Channels

**In:**
- Instagram (@inkwell_reviews) — 2 pieces/week (Tue + Fri)
- X (@inkwell_reviews) — 2 pieces/week (Tue + Fri) + daily fragment
- LinkedIn — weekly
- Threads — cross-posts from X (auto-linked to IG account)
- Bluesky — cross-posts from X (right audience for journalist flywheel)
- Newsletter — weekly (see Decision 4)

**Deferred:**
- TikTok — requires a separate video production track. Revisit at month 6 if everything else is working. Ollie is editor, not performer.

## 2. SMM tool

Required for cross-posting and scheduling across IG, X, LinkedIn (and Threads/Bluesky where supported).

- **Action:** Dene to check Sprout Social employee licence first.
- **Fallback:** if unavailable, Claude to recommend 2–3 free alternatives covering IG/X/LinkedIn scheduling at minimum.

## 3. Site role — CANONICAL

inkwellreview.com is the canonical home of every piece. Social posts are trailers that drive traffic back to the site.

**Concretely:**
- Every piece lives at `inkwellreview.com/[slug]` as an interactive HTML artefact
- Social posts work standalone (sharp number + main insight) AND tease the interactive
- The final caption line / final carousel slide pulls the curious reader to the site
- The site is the canonical artefact; the social image is the trailer

**Why:** Inkwell's competitive edge is interactive depth. Most data-viz IG accounts can't ship interactive pieces. Defaulting to image-only social would throw that edge away. Aligns with the locked mood sentence — *"worth repeating at dinner"* implies people go and look something up.

## 4. Newsletter

**Status (22 April 2026, Session 9):** **platform decision deferred past launch.** Substack account creation was auto-blocked at signup ("account is currently suspended" — a known geo-flag pattern for Indonesian IP addresses, applied before Dene posted anything). Rather than fight a fragile workaround (VPN, appeal taking days) for a platform that had a 6-month sunset clause baked in anyway, the decision was taken to ship launch with **RSS-first subscribe** on the homepage and pick a newsletter platform in Week 2.

**Original plan (for reference):** Substack, custom-domained to `newsletter.inkwellreview.com`, 6-month commitment, re-evaluate end of October 2026, migrate to own infra if subscribers ≥ ~1,000 with healthy retention.

**Current plan for Week 2:**

- **Candidates in rank order:**
  1. **Buttondown** — free up to 100 subs, $9/mo at 1k, $29/mo at 5k. Minimal, indie, API-first, RSS-to-email, custom domain. Best brand fit for a principled publication.
  2. **Beehiiv** — free up to 2,500 subs. More Substack-parity features (discovery "Recommendations" network, beefier analytics) at the cost of a less indie aesthetic.
  3. **Ghost Pro** — overkill, since Astro is already the CMS.
- **Custom subdomain:** `newsletter.inkwellreview.com` — DNS setup deferred until platform is picked (different providers need different CNAME values).
- **Content source (unchanged):** the chosen platform pulls from `inkwellreview.com/rss.xml`. One source of truth, no rewriting.
- **Homepage during the interim:** "Subscribe via RSS" CTA + "Email newsletter launching shortly" caveat. No fake form, no broken subscribe endpoint.

**Migration-test trigger (unchanged):** re-evaluate once subscriber count hits ~1,000 with healthy retention.

## 5. Growth bets

In rank order:

1. **Journalist flywheel — primary.** Every piece is built to be cited.
   - Press kit at `inkwellreview.com/press` from launch
   - Downloadable chart images (PNG + SVG) per piece
   - Proactive pitching to journalists in topical moments

2. **SEO — compounding.** Each interactive page targets specific high-intent queries.
   - Per-piece meta titles + descriptions + Schema.org Article structured data
   - Auto-generated OG image per piece
   - sitemap.xml, robots.txt, RSS feed
   - 300–500 words of real prose under each chart (Google can't parse the chart, only the text around it)
   - Internal linking between topically related pieces

3. **Selective collabs — month 3+.** Guest pieces in adjacent newsletters (Works in Progress, Noahpinion, etc.), podcast appearances. Needs a body of work first — pitch after piece 5–10.

**Skip paid** until there's a paid product to pay back the CAC.

## 6. Stack

- **Framework:** Astro
- **Styling:** Tailwind
- **Hosting:** Vercel
- **Analytics:** Plausible (Day 1)

**Completely separate codebase and design system from HealthDASH.** No shared code, no shared components, no shared infrastructure. Zero coupling.

**Why Astro:** Inkwell is ~90% static content (markdown pieces + prose) with ~10% interactivity (charts/maps as embedded islands). Astro is built for exactly this — content-first, static by default, interactive "islands" only where needed, SEO-excellent out of the box, ships less JavaScript than Next.js for the same content.

## 7. Publishing pipeline

Publish-once, distribute-everywhere. Minimal manual repurposing.

- **Source of truth:** markdown + interactive HTML in the Inkwell Review repo
- **Trigger:** `git push` deploys to Vercel
- **Auto-generated per piece (at build):**
  - **Primary social card — 4:5 portrait (1080×1350)** *(locked Session 4, 20 April 2026)*. Optimal for IG feed, works in LinkedIn and X feeds. This is the composition we design — not an auto-crop of the website plate. Two layouts (site + social), one visual language (cartouche, hatched pastels, per-piece stamp, misreg stats).
  - OG / link preview — 1.91:1 (1200×630): relaid from the 4:5
  - Stories / Reels — 9:16 (1080×1920): the 4:5 padded with an ink strip above and below carrying wordmark + byline
  - RSS entry
  - Sitemap entry
  - Newsletter draft (markdown stub)
- **Distribution:** SMM tool holds social drafts; Dene approves the queue once a week
- **Newsletter:** Substack pulls from RSS feed; lightweight manual edit in Substack before send

The existing `/produce` slash command in this Claude Code project is the natural place to extend — it should output the interactive page *and* the auto-generated variants in one shot.

## 8. Analytics

**Plausible** from Day 1. Privacy-friendly, lightweight, free tier sufficient at small scale.

Without analytics from launch, the 6-month Substack-migration test (Decision 4) is unmeasurable.

---

## What this doc gates

Until this is locked, the visual identity work can't be properly scoped:
- The site role (canonical) means the masthead, navigation, and reading experience matter as much as the post-image lockup
- The publishing pipeline means templates need to generate multiple sizes from one source
- SEO Day 1 means structured prose + meta + OG images are non-negotiable parts of the production template
- The Astro stack constrains the template implementation choices

Next: strip the false "LOCKED" claims from `brand/identity-brief.md`, then draft the brief for the Claude Design visual exploration (which now needs to account for canonical-on-site + the publishing pipeline).

---

*Last updated: 19 April 2026.*
