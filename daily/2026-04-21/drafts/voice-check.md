# Voice Check — 22 April 2026

**Files checked:** `captions.md` · `newsletter.md` · `alt-text.md` · France social card (`site/src/pieces/ai-adoption-gap.ts`, index 3).

**Verdict (after fixes):** **PASS.** All four hard violations fixed across all surfaces; all three soft violations applied. Zero remaining hard violations. Ready to ship.

*Original verdict on first run: HARD FAIL (four fact violations, all propagated from one mistaken framing). Fix log below.*

---

## Fix log

### H1 · "Behind Italy" — fixed in 3 surfaces

Italy (27.8%) is behind the US (28.3%), not ahead. Replaced with Poland (28.5) and Germany (28.6), both legitimately ahead.

- [file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/captions.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/captions.md) LinkedIn line 33 → *"Behind Taiwan. Behind Poland. Behind Germany."*
- Same file, X post 1 → *"Behind Singapore, Taiwan, Germany, and most of Europe."*
- [file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/newsletter.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/newsletter.md) line 9 → *"Behind Taiwan. Behind Poland. Behind Germany."*

### H2 · "Every other high-income economy" → "most other" (LinkedIn line 33)

Czech Republic (27.8), Italy (27.8), Bulgaria (27.3), Finland (27.3) are all high-income and all below the US. "Most" is accurate; "every other" was not.

### H3 · "Worst rank in the measured rich world" → "bottom half of the measured rich world" (IG line 11)

Same issue; accurate framing is "bottom half" not "worst."

### H4 · France social card + alt text

Original card caption: *"Every major European economy is ahead of the US."* — false because Italy qualifies as a major European economy and is behind.

Replaced with concrete list:

```
of the French population use it.<br>France, the UK, Germany — <em>all</em> ahead of the US.
```

Applied in both [file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/site/src/pieces/ai-adoption-gap.ts](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/site/src/pieces/ai-adoption-gap.ts) (card data) and [file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/alt-text.md](file:///Users/deneschonknecht/Desktop/Claude%20Projects/Inkwell%20Review/daily/2026-04-21/drafts/alt-text.md) (card 3 alt).

Verified live at [http://localhost:4321/pieces/ai-adoption-gap/social/3](http://localhost:4321/pieces/ai-adoption-gap/social/3) after a dev-server restart (Astro's `import.meta.glob` needed a rebuild to pick up the edit).

### S1 · "Barely above Costa Rica" → "Just above Costa Rica" (X post 4)

1.8 pp gap isn't truly "barely." The new framing is cleaner and still carries the punch.

### S2 · Prediction-dressed-as-observation (newsletter line 29)

Original: *"If the United States is going to win the race it started, it will need to go and actually use the product."*
Replaced: *"A race you invent and don't run is not a race you win."*

Tighter, aphoristic, drops the predictive cadence.

### S3 · Alt-text card 0 appearance → function (alt-text.md)

Original opened with visual description ("shown as a white outline against a dark map"). Rewritten to lead with the finding: *"A world map of generative AI adoption, anchored on the United States. The US is at 28.3%, the big stat. Caption notes twenty-three other measured economies use it more."*

Also tightened "countries" → "measured economies" for accessibility literalness (S4 from original report).

---

## Strong passages (retained, worth adding to `voice/examples.md`)

1. *"The supply-side leader is a demand-side middling. The country exported the tools, and then didn't reach for them."* — IG, line 11.
2. *"That's the leaderboard for invention. The leaderboard for use is different."* — newsletter, line 15.
3. *"Ollie's verdict: the country that wrote the menu is eating somewhere else."* — shared kicker, all three channels.

---

## Summary

HARD FAIL on first run, PASS after fixes. All four factual over-reaches removed, the three voice refinements landed, and the France social card — the one surface that would have shipped a visible error — now serves corrected copy. Ship on your signal.
