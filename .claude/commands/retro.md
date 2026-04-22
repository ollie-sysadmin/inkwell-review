# /retro — Weekly Performance Retrospective

You are running the Sunday retrospective for Inkwell Review. 20 minutes of analysis. No padding.

## Before starting

1. **Read `performance/tracking.csv`** — the week's metrics, which Dene updates manually each Monday.
2. **Read `research/evergreen-queue.md`** — to understand upcoming pipeline.
3. **Skim last week's files in `daily/`** — to remember what actually shipped vs was drafted.

If `performance/tracking.csv` is empty or doesn't exist yet, say so honestly. Don't fabricate metrics.

## What to produce

Write to `performance/retro-YYYY-WW.md` (where WW is ISO week number):

```markdown
# Retro — Week [N] of [Year]

*[date range, e.g. 14–20 Apr 2026]*

---

## What shipped this week

[List of pieces with one-line summary each. Format, platform, date.]

## What worked

[2–4 bullet points. Be specific — not "good engagement" but "the extradition atlas had 3x save rate vs benchmark, driven by [specific reason]"]

## What didn't

[2–3 bullet points. Same specificity. If something underperformed, hypothesise why.]

## The pattern across the last 4 weeks

[If we have 4 weeks of data, look for a trend. If we don't, say so.]

## Three adjustments for next week

[Concrete and actionable. Not "post more maps" but "the Grid format has underperformed 3 weeks running; drop it for 2 weeks and test Specimen format instead."]

1. **[Adjustment]** — [why + how to measure if it worked]
2. **[Adjustment]** — [...]
3. **[Adjustment]** — [...]

## Queue health

- Evergreen queue size: [N priority-A pieces ready]
- Topical queue hotness: [how many ideas are ripe for next week?]
- Risk flags: [any pieces requiring careful handling — legal, taste, data quality]

## Question for Dene

[One specific question that requires Dene's judgement. Don't make one up if there isn't one — say "nothing open."]
```

## Analysis rules

- **Attribute carefully.** A viral post isn't always a repeatable lesson; sometimes it's luck. Distinguish signal from noise.
- **Favour save rate and share rate over follower count.** Followers are a vanity metric at this scale.
- **Note format fatigue.** If three consecutive Cartography pieces underperformed, the audience may be bored of maps — or we may have chosen bad topics. Be honest about which.
- **Flag topical post performance separately from evergreen.** Topical pieces are evaluated on reach during their 48h freshness window, not on long-tail metrics.
- **Call out when a piece deserved more promotion than it got.** Sometimes the content was fine and the distribution failed.

## What not to do

- Don't write cheerleader retros. If the week was weak, say so.
- Don't propose wholesale strategy changes after one bad week. One week is noise.
- Don't retroactively justify. If something surprised you, name the surprise.
- Don't skip the "question for Dene" section — it's the most valuable output.

## After writing

End with a 3-line summary in chat:
- Week's top performer
- Week's biggest surprise (good or bad)
- The one adjustment you most want Dene to take seriously
