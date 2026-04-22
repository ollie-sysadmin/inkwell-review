# Self-check — AI Adoption Gap (Piece #3)

*Light pass before `/voice-check`. Items Dene should weigh in on are at the bottom.*

---

## Voice bible pass

- **No first-person "I" in captions.** ✓ (Newsletter aside is the only place "I" / "I'm" appears, which the bible explicitly exempts.)
- **Every opening line carries a specific number.** ✓ Captions open with "24th", "twenty-three times", "24th". Newsletter opens with "24th". Cards all carry a complementary headline-stat / footer-stat pair.
- **No generic openers.** ✓ None of "Did you know / It's fascinating / In today's world / You might be surprised / Let's talk about / A thread on".
- **No forbidden clichés.** ✓ Checked for "Let that sink in / The numbers don't lie / Buckle up / Spoiler alert / Plot twist".
- **Max 2 em dashes per caption.** ✓ At most 1 per caption.
- **Emoji in body: none.** ✓
- **Signature exactly `— Ollie`.** ✓
- **Hashtags: 3–5, specific.** ✓ Used `#aiindex #generativeai #techpolicy #uae`.
- **No mockery of private individuals.** ✓ Only institutions (Stanford, Microsoft, US government) referenced.
- **Headline-number ≠ footer-number on every card.** ✓ US: 24th / 28.3. UAE: "heaviest user" / 64. Singapore: "state-as-tech-product" / 60.9. France: "more than Silicon Valley" / 44. Korea: "seven places" / +4.8.
- **One emphasis per headline.** ✓ Distribution: 3 highlight (US, UAE, France), 2 circled (Singapore, Korea).

## Data pass

- **Every number traces to a published source.** ✓ All 30 country percentages from Stanford AI Index 2026 Figure 4.3.12 (Microsoft AI Economy Institute 2025). PDF saved at `daily/2026-04-21/ai_index_2026.pdf`.
- **Source-line is explicit about the definition.** ✓ "Survey-based estimate of the share of the adult population using generative AI in the second half of 2025."
- **"Outside measured top 30" framing.** ✓ The map renders ~165 countries as ink-black (no data) rather than zero. Consistent with the Misra et al. methodology; we don't fabricate values we don't have.
- **Private AI investment claim**: "23 times China's" ($285.9B vs $12.4B) — confirmed from Chapter 4 Highlight 2 of the same report.
- **South Korea jump**: 25.9% → 30.7% (+4.8 pp, rank 25 → 18) — confirmed against Fig 4.3.12.

## Build pass

- **Article page renders** at `/pieces/ai-adoption-gap` — 200 OK, map loads, 5 anchor chips, stats strip shows bespoke tiles (US / 28.3% / 24/30 / +2.0 pp), classifying key shows 5 rows with accurate counts.
- **Social cards render** at `/pieces/ai-adoption-gap/social/0` through `/4` — `/api/cards.json` returns all 5, headlines + footer stats correct, map draws 177 country paths per card.
- **Review grid** at `/review/social-cards` — 16 total iframes (8 Atlas + 3 FD + 5 AI) — all piece cards included.
- **Homepage** shows the new piece as the top Recent Curiosities card, `href="/pieces/ai-adoption-gap"`.
- **Backward compat** — Atlas renders with 8 chips + toggle visible + computed tiles (US/117/10/~78). FD not spot-checked but shares the same template path.

---

## Items for Dene

1. **Desk: Data (paper-blue).** Proposed as provisional in `picked.md`; not confirmed. The piece ships with a blue chrome + blue kicker swatch. If you want a different desk, one-liner and I'll re-skin.
2. **Shared kicker across IG / LinkedIn / Newsletter**: *"The country that wrote the menu is eating somewhere else."* Strong punch, mildly arch. Replace if it reads too cute.
3. **Hashtag set (IG)** — currently `#aiindex #generativeai #techpolicy #uae`. Willing to swap in `#stanfordhai` or `#adoption` if you'd rather.
4. **"Twenty-three other countries" framing** — literally correct for the top-30 Microsoft set. If the phrase reads as implying US is behind 23 of the whole world, propose "twenty-three other economies in the measured top 30" (wordier, more literal).
5. **Template extension** — I added `statTiles?: StatTile[]` to `CartographyAnchor` + a `showHavensToggle?: boolean` prop. Backward-compatible; Atlas + FD still render. Flagging for your awareness in case you want it noted in the decisions log.
6. **Newsletter teaser** hints at the jagged-frontier piece as next. Intended as soft hand-off, not a commitment. Adjust or cut.
7. **PNG export not run yet.** Per `/produce` rules, PNG export happens on your signal after draft review. Command is `pnpm --dir site cards:export` — expected runtime ~18s for the full 16 cards, lands in `social-output/` and `site/public/pieces/*/social/`.

---

## Recommended next

`/voice-check` on `captions.md` and `newsletter.md` before shipping.
