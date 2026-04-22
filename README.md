# Inkwell Review — Claude Code Project

This is the operating system for **Inkwell Review**, a data-visualisation publication edited by Prof. Ollie Inkwell.

## First-time setup

```bash
# Drop this folder at ~/projects/inkwell-review/
cd ~/projects/inkwell-review

# Version control from day one
git init
git add .
git commit -m "Inkwell Review: project initialised"

# Open in Claude Code
claude
```

In Claude Code, verify the project loaded properly by asking:

> *"What's the voice of this project?"*

Claude should answer as if it has read `CLAUDE.md` — referring to Ollie, the plain-sharp voice rules, and the brand. If it does, you're set up.

## Daily rhythm

**Morning (15 min)** — Run `/scan` over coffee. Claude searches the news, cross-references your evergreen queue, and surfaces five topical angles with sharpness scores. You read, pick one, paste it into `daily/YYYY-MM-DD/picked.md`.

**Afternoon (30 min)** — Run `/produce`. Claude takes the picked angle and produces a chart, a 9-slide carousel, captions for IG/X/LinkedIn, alt text, and a newsletter draft. Everything lands in `daily/YYYY-MM-DD/drafts/`.

**Before publishing** — Run `/voice-check` against the captions. Flags anything that drifted from the voice bible.

**Evening** — Copy the finished assets into Buffer or Metricool, schedule for the next morning.

**Sunday (20 min)** — Update `performance/tracking.csv` with the week's metrics, then run `/retro` for a performance review and strategy adjustments.

## The four commands

| Command | What it does | When to use |
|---|---|---|
| `/scan` | Surfaces topical angles from today's news | Every morning |
| `/produce` | Turns an approved angle into shippable assets | After picking an angle |
| `/voice-check` | Audits captions against the voice bible | Before publishing |
| `/retro` | Weekly performance review and strategy adjustment | Sunday |

## Folder map

```
inkwell-review/
├── README.md                    ← this file
├── CLAUDE.md                    ← loads every session (voice + rules)
├── context/                     ← full conversation history & decisions
├── voice/                       ← the voice bible and examples
├── brand/                       ← visual system and templates
├── research/                    ← queues, sources, completed archive
├── daily/YYYY-MM-DD/            ← today's scan, picked angle, and drafts
├── performance/                 ← weekly metrics tracking
└── .claude/commands/            ← the four slash commands
```

## The rules, in brief

- Every factual claim has a source. No fabrication.
- Plain-sharp English in captions. Ollie is seasoning, not costume.
- `/voice-check` before anything ships.
- No topical piece posts the same day it's drafted. Four-hour minimum cooling-off.
- Two pieces a week. Miss one and ship two next week; don't chase.

## What to do first

1. Read `context/conversation-summary.md` to re-load everything we decided.
2. Read `voice/bible.md` and `voice/examples.md` to internalise the voice.
3. Open `brand/identity-brief.md` — this is the next substantive task (visual identity work).
4. Skim `research/evergreen-queue.md` to see what's already in the pipeline.

That's it. Everything else gets built as you go.

— Built on 18 April 2026
