# /voice-check — the Quality Gate

You are auditing a draft against the Inkwell Review voice bible. Strict mode. This is the last check before publishing.

## Input

Dene will tell you which file to check (usually `daily/YYYY-MM-DD/drafts/captions.md` or `newsletter.md`).

If no file is specified, default to all files in `daily/YYYY-MM-DD/drafts/` ending in `.md`.

## Before starting

Read:
1. `voice/bible.md`
2. `voice/examples.md`
3. `voice/forbidden.md`

## What to check

Go through the draft line by line. Flag every instance of:

### Voice violations
- [ ] First-person "I" or "we" or "us" in captions (newsletter asides exempt)
- [ ] Generic openers: "Did you know", "It's fascinating that", "In today's world", "You might be surprised", "Let's talk about", "A thread on"
- [ ] Rhetorical question openers: "Ever wondered why…?"
- [ ] Clichéd phrases: "Let that sink in", "The numbers don't lie", "Buckle up", "Spoiler alert", "Plot twist"
- [ ] Moralising or editorialising beyond what the data supports
- [ ] Predictions stated as observations

### Character violations
- [ ] Over-saturated Ollie voice (more than one Ollie reference in the caption body)
- [ ] Character dropped entirely (no `— Ollie` signature)
- [ ] Signature variations ("Ollie 🐙", "— Prof. Inkwell", etc. — must be exactly `— Ollie`)
- [ ] "Ollie's verdict" or similar aside appearing more than once in a single caption

### Structural violations
- [ ] Opening line lacks a specific number or fact
- [ ] More than 2 em dashes in a caption
- [ ] Emoji in caption body (bio emoji is fine)
- [ ] More than 5 hashtags on Instagram, or generic hashtags like #data #viz
- [ ] Captions longer than 4 short paragraphs

### Fact/source violations
- [ ] Claims without citations or implied sources
- [ ] "Studies show" or "research indicates" without identifying the study
- [ ] Specific numbers that don't match the data file
- [ ] Country/person names spelled inconsistently between caption and chart

### Safety violations (automatic stop)
- [ ] Named private individual being mocked
- [ ] Vaccine, election, or medical misinformation
- [ ] Content that might violate child safety
- [ ] Legal or financial advice masquerading as observation

## Output format

Write a report to `daily/YYYY-MM-DD/drafts/voice-check.md`:

```markdown
# Voice Check — [Today's Date]

**Files checked:** [list]
**Verdict:** [PASS / SOFT FAIL / HARD FAIL]

---

## Hard violations (must fix)

[For each: quote the exact passage, explain which rule it breaks, and propose a rewrite.]

## Soft violations (consider fixing)

[Same format but lower severity.]

## Strong passages (keep)

[2–3 examples of sentences that hit the voice perfectly — for learning.]

## Summary

[One-paragraph verdict. Is this ready to ship?]
```

## Verdict criteria

- **PASS:** Zero hard violations. At most 2 soft violations. Ready to ship.
- **SOFT FAIL:** No hard violations but 3+ soft violations. Revise and re-run before shipping.
- **HARD FAIL:** Any hard violation. Don't ship. Revise thoroughly.

## Tone

Be strict but constructive. The goal is better captions, not shaming Dene. For each violation, propose a specific rewrite — not just "fix this."

## After reporting

End with a 2-sentence summary in chat: what the verdict is, and whether Dene should ship or revise.
