# Inkwell Review — Content Selection Strategy

*The single canonical rulebook for what the publication chooses to cover: **where** ideas come from, **how** we identify the ones worth drafting, and **why** a chosen idea passes the bar. Consolidates rules that previously lived across six files (CLAUDE.md · research/evergreen-queue.md · research/topical-queue.md · research/sources.md · .claude/commands/scan.md · context/decisions-log.md).*

*Locked 22 April 2026. Sits alongside `strategy/distribution.md` — distribution answers "where the piece goes after we make it"; this file answers "what we decide to make in the first place."*

---

## The one-paragraph summary

Inkwell Review publishes twice a week. Topics come from three streams — a long-tail evergreen queue, a short-window topical scan, and a predictable seasonal calendar. Every candidate must fit one of five chart formats, pass a sharpness filter, and clear a small list of hard stops. Nothing ships without a cited authoritative source, and the editorial taste test — *"worth repeating at dinner"* — is the upstream call that only the human editor makes.

---

## 1 · WHERE — the three sources of topics

### 1.1 Content mix (locked 18 April 2026)

| Stream | Share of output | Where ideas live |
|---|---|---|
| **Evergreen** | 70% | `research/evergreen-queue.md` |
| **Seasonal** | 15% | `strategy/seasonal-calendar.md` *(to be created — see § 1.4)* |
| **Topical** | 15% | `research/topical-queue.md` + daily `/scan` |

### 1.2 Evergreen (70% — the workhorse)

A standing register of pieces with long shelf-lives. File: `research/evergreen-queue.md`. Each entry is tagged **Priority A** (ship in next 8 weeks), **Priority B** (next 6 months), or **Priority C** (backlog, revisit quarterly).

**How ideas get added:** anywhere, any time, with no gatekeeping. If you think an idea belongs, drop it in. Curation happens at pick time, not capture time.

**Who reprioritises:** Dene, each Sunday during `/retro`. A/B/C tags are not sacred. A strong topical match or a seasonal pull forward.

**What shipping does:** when a piece ships, move its entry to `research/completed/` as an archived record.

### 1.3 Topical (15% — the freshness stream)

Driven by the daily `/scan` command, which sweeps last-48h world news and surfaces **five ranked angles** to `daily/YYYY-MM-DD/scan.md`.

**Scan covers:**
- Politics (global, cross-border especially)
- Crime and justice
- Business and economics
- Science and technology
- Culture, health, sport

**Scan skips (by design):**
- Celebrity gossip without a behavioural angle
- Pure financial market moves ("stock market went up") — has a chart but no insight
- Local news without global resonance
- Politically one-sided framings (save strong opinion for the caption kicker, not the angle)
- Pieces that require scraping sources we don't trust

**Highest-leverage topical format:** an evergreen-queue piece that has just become topical. Publish on the news-peg timing; the piece itself was ready to ship anyway.

**Honest days:** if `/scan` finds fewer than three strong angles, it says so. A quiet news day is a legitimate output.

**Second capture layer:** `research/topical-queue.md` holds in-flight ideas that aren't yet ripe. Format: `- [YYYY-MM-DD] Brief description. (Source or trigger.)`

### 1.4 Seasonal (15% — the calendar beats)

Predictable cultural moments, pre-planned weeks out. **Currently undocumented** — this section commits to creating `strategy/seasonal-calendar.md` on demand. Known beats to plan against:

| Beat | Approximate date | Typical angle territory |
|---|---|---|
| Valentine's Day | 14 Feb | Relationships, marriage rates, love economy |
| International Women's Day | 8 Mar | Gender gaps, representation data |
| Tax season | Mar–Apr (US/UK) | Public finance, the spending/collecting state |
| Mid-year population beats | Jun (World Refugee Day, 20 Jun) | Migration, demographics |
| Back-to-school | late Aug | Education, literacy, childhood patterns |
| Halloween | 31 Oct | Crime / death-statistics / folklore |
| Elections (US) | early Nov (alternating years) | Voting, turnout, electoral geography |
| Thanksgiving (US) | late Nov | Food, agriculture, gratitude-economics |
| Christmas / New Year | late Dec | Year-in-review, cultural-calendar pieces |

When a beat approaches, a seasonal piece gets promoted from the evergreen queue (or commissioned fresh) to land 1–2 weeks ahead and run through the week.

### 1.5 Capture-as-you-go

Any idea, anywhere — walking the dog, reading a Substack, in a conversation — drops into one of two places. No quality gate at capture.

| Type | Goes in |
|---|---|
| Long shelf-life, no news peg | `research/evergreen-queue.md` |
| Tied to a recent news moment or likely to ripen | `research/topical-queue.md` |

Quality gating happens at **pick time**, not capture time. The queues are allowed to be messy.

---

## 2 · HOW — the identification filter

### 2.1 Formats — every piece must be one

If an idea doesn't shape into one of the five formats, it doesn't run. Format assignment is **human-editor only** — Claude never assigns.

| Format | What it is | Example |
|---|---|---|
| 🗺️ **Cartography** | World / regional map revealing a behavioural pattern | The Extradition Atlas, AI Adoption Gap |
| 📈 **Life** | A single variable traced across a human lifespan | Leading cause of death by age |
| 📉 **Shrinkage** | Things getting smaller (or bigger) over time | Chocolate bar weights since 1970 |
| ▦ **Grid** | Small-multiples matrix comparing many things | What's legal where |
| 🔍 **Specimen** | A single data point, dissected | The median human's day |

### 2.2 The sharpness score (1–5)

`/scan` assigns a sharpness score to every angle it surfaces. Calibration is strict: **a 4 is genuinely uncommon. A 5 should be rare — one or two per month at most.**

| Score | Meaning |
|---|---|
| **5** | Inverts the dominant narrative. Reveals something every outlet has missed. |
| **4** | Uncommon. Most informed readers won't have seen it. |
| **3** | Valid chart, solid data, not novel. The angle has been done elsewhere. |
| **2** | Competent but predictable. |
| **1** | Skip. |

The score is an **input** to the human pick, not an automatic gate. Use it to calibrate — a day with two 5s is a good day, a day with no angle above 3 is a day to pull from evergreen instead.

### 2.3 The five questions before picking an angle

For every candidate angle — from any of the three streams — Dene answers all five. Any "no" kills the angle.

1. **Is there a chart here that reveals something non-obvious?** Not: is there data? Obvious data is not a story.
2. **Does the data exist in authoritative sources?** See § 3.1. No source = no piece.
3. **Can Inkwell ship this within the relevant freshness window?** See § 2.4.
4. **Does it fit one of the five formats — without stretch?**
5. **Is there a point of view earned from the data, not projected onto it?**

### 2.4 Freshness windows

| Stream | Window | Note |
|---|---|---|
| Topical | 48 hours from news peg to publish | Cooling-off rule (§ 3.3) applies |
| Evergreen | None | A well-chosen angle keeps working |
| Seasonal | 1–2 weeks before the beat; keeps working 1 week after | Plan backwards from the beat date |

### 2.5 Cooling-off rule (locked 18 April 2026)

**No topical piece ships the same day it's drafted.** Four-hour minimum between draft and publish. No exceptions for tired-judgement posts. Late-night drafts go out tomorrow morning.

---

## 3 · WHY — the validation bar

### 3.1 Every claim cited

**Non-negotiable.** Data comes from authoritative registers listed in `research/sources.md`. When two authoritative sources disagree on a material number, cite both, note the discrepancy, default to the more recent, and if the discrepancy *is* the story, lean into it.

**Never from:**
- Reddit threads as primary sources
- Wikipedia alone (fine as a starting point, never as the only citation)
- Aggregator sites with no upstream source
- "Studies show…" articles without links to the study
- Influencer charts without visible methodology
- AI-generated summaries without the original source
- Data that required reverse-engineering from a rendered chart

**If the right source doesn't exist** or doesn't agree across sources: **kill the piece** and log it in the "ideas considered but killed" section of the relevant queue. Never fabricate. Never extrapolate past what the data supports.

### 3.2 Point of view, earned

Inkwell's voice is opinionated. But opinions must be **earned from the chart, not projected onto it.**

- If the chart shows X, you can say X.
- You cannot say Y because you wish the chart showed it.
- Predictions dressed as observations are forbidden.
- Moralising is forbidden — state the finding, trust the reader.

The full voice rules live in `voice/bible.md`, `voice/examples.md`, `voice/forbidden.md`. `/voice-check` enforces before anything ships.

### 3.3 Hard stops — automatic reject (locked 18 April 2026)

Six subjects never run, in any format, for any reason:

1. **Child safety** — no exceptions
2. **Health misinformation** (vaccines especially) — no exceptions even ironically
3. **Electoral disinformation** — no exceptions even as satire
4. **Mockery of named private individuals** (public figures and institutions are fair game; private citizens are off-limits)
5. **Specific medical, legal, or financial advice** ("markets did X" is fine; "you should buy Y" is not)
6. **Content whose only purpose is to mock the powerless** — Ollie observes power, never punches down

### 3.4 The taste bar — human-only

Beyond the rules, the publication's locked mood sentence is the upstream taste test every piece is held against:

> *Insight for people who pay attention — meticulously sourced charts, worth repeating at dinner.*

A chart can be accurate, passing every other rule, and still not be Inkwell. If it wouldn't be **worth repeating at dinner**, revise the angle or kill the piece. This is the editor's call. Claude does not override here.

---

## 4 · The Sunday ritual

During `/retro` each Sunday:

- Reprioritise `research/evergreen-queue.md` A/B/C tags based on performance and upcoming seasonal beats
- Age out stale entries from `research/topical-queue.md` (move to "Aged-out" section)
- Check `strategy/seasonal-calendar.md` for the next 4 weeks and pre-pull any beat that needs commissioning
- Move any shipped pieces from the queue to `research/completed/`

---

## 5 · The skill surface — where rules become code

These rules are enforced — not just documented — by the slash commands:

| Skill | What it enforces from this file |
|---|---|
| `/scan` | § 1.3 (coverage + skips), § 2.2 (sharpness scoring), § 2.3 (the five questions) |
| `/produce` | § 3.1 (source gate — kill if data thin), § 3.3 (hard stops), § 2.5 (cooling-off) |
| `/voice-check` | § 3.2 (earned opinion, no moralising) |
| `/retro` | § 4 (Sunday ritual) |

---

## 6 · The Claude / Dene split

Where the human editor owns the call, versus where Claude can act:

| Decision | Owner | Notes |
|---|---|---|
| Which stream to pull from today | Dene | Daily editorial pick |
| Which specific angle to draft | Dene | From `/scan` output or queue |
| Which format the piece takes | Dene | Claude never assigns |
| Which desk the piece lives in | Dene | Claude never assigns |
| Whether the taste-bar passes | Dene | § 3.4 |
| Whether a source is authoritative | Claude (flagged to Dene if borderline) | Against § 3.1 list |
| Whether the sharpness score is honest | Claude | § 2.2 |
| Whether hard stops apply | Claude | § 3.3 — automatic reject, flag to Dene |
| Whether data is thin enough to kill | Claude | § 3.1 — stop and report, never fabricate |

---

## 7 · What this file does not cover

- **Format-specific production rules** → `/produce` skill + `brand/visual-system.md`
- **Distribution, channel mix, cadence** → `strategy/distribution.md`
- **Voice / caption / character rules** → `voice/bible.md`, `voice/examples.md`, `voice/forbidden.md`
- **Template implementation** → `site/src/templates/`, `brand/templates/`
- **The pipeline from picked idea to published post** → `context/workflow.md`

---

*Last edited: 22 April 2026. If a rule here changes, update the relevant skill definition (`.claude/commands/*.md`) in the same commit, and add a new entry in `context/decisions-log.md`.*
