/**
 * AI Adoption Gap — Plate III.
 *
 * Country-level generative AI adoption (%), H1 and H2 2025, top-30 economies.
 *
 * Source: Microsoft AI Economy Institute, 2025, via Stanford University's
 * 2026 AI Index Report (Chapter 4 Economy, Figure 4.3.12, p. 201). The
 * definition is survey-based "AI diffusion" — an estimate of the share
 * of the adult population using generative AI tools. Methodology in the
 * Misra et al. 2025 paper cited on p. 200.
 *
 * The underlying report notes that adoption correlates strongly with GDP
 * per capita, but that Singapore and the UAE outpace what income would
 * predict while the United States and Denmark fall below the trend line.
 *
 * Tier cuts (applied to the H2 2025 value):
 *   · Leaders (≥ 40%)       — 7 countries  → `partners` set    → paper-green
 *   · Strong  (30 – 39%)    — 11 countries → `reluctant` set   → paper-yellow
 *   · Middle  (25 – 29.9%)  — 12 countries → `suspended` set   → paper-brown
 *   · Anchor (the card's focus country) always wins the paint — photocopy-white.
 *   · Every other country on the map is outside the measured top 30
 *     → `no-treaty` (photocopy-ink). Stanford's underlying data does cover
 *     more than 30 countries but only the top 30 have publicly published
 *     percentage values; charting the rest would require inferring bins
 *     from a rendered choropleth, which breaks the "never fabricate" rule.
 *
 * Country codes are ISO 3166-1 numeric, zero-padded to three digits to
 * match world-atlas topojson.
 */

import type { Anchor } from './treaty-data';

/** The 30 measured economies keyed by ISO numeric, with H2 2025 adoption (%). */
export const AI_DIFFUSION: Record<string, { name: string; rank: number; h1: number; h2: number; delta: number }> = {
  '784': { name: 'United Arab Emirates', rank: 1,  h1: 59.40, h2: 64.00, delta: 4.60 },
  '702': { name: 'Singapore',            rank: 2,  h1: 58.60, h2: 60.90, delta: 2.30 },
  '578': { name: 'Norway',               rank: 3,  h1: 45.30, h2: 46.40, delta: 1.10 },
  '372': { name: 'Ireland',              rank: 4,  h1: 41.70, h2: 44.60, delta: 2.90 },
  '250': { name: 'France',               rank: 5,  h1: 40.90, h2: 44.00, delta: 3.10 },
  '724': { name: 'Spain',                rank: 6,  h1: 39.70, h2: 41.80, delta: 2.10 },
  '554': { name: 'New Zealand',          rank: 7,  h1: 37.60, h2: 40.50, delta: 2.90 },
  '528': { name: 'Netherlands',          rank: 8,  h1: 36.30, h2: 38.90, delta: 2.60 },
  '826': { name: 'United Kingdom',       rank: 9,  h1: 36.40, h2: 38.90, delta: 2.50 },
  '634': { name: 'Qatar',                rank: 10, h1: 35.70, h2: 38.30, delta: 2.60 },
  '036': { name: 'Australia',            rank: 11, h1: 34.50, h2: 36.90, delta: 2.40 },
  '376': { name: 'Israel',               rank: 12, h1: 33.90, h2: 36.10, delta: 2.20 },
  '056': { name: 'Belgium',              rank: 13, h1: 33.50, h2: 36.00, delta: 2.50 },
  '124': { name: 'Canada',               rank: 14, h1: 33.50, h2: 35.00, delta: 1.50 },
  '756': { name: 'Switzerland',          rank: 15, h1: 32.40, h2: 34.80, delta: 2.50 },
  '752': { name: 'Sweden',               rank: 16, h1: 31.20, h2: 33.30, delta: 2.20 },
  '040': { name: 'Austria',              rank: 17, h1: 29.10, h2: 31.40, delta: 2.20 },
  '410': { name: 'South Korea',          rank: 18, h1: 25.90, h2: 30.70, delta: 4.80 },
  '348': { name: 'Hungary',              rank: 19, h1: 27.90, h2: 29.80, delta: 1.90 },
  '208': { name: 'Denmark',              rank: 20, h1: 26.60, h2: 28.70, delta: 2.10 },
  '276': { name: 'Germany',              rank: 21, h1: 26.50, h2: 28.60, delta: 2.10 },
  '616': { name: 'Poland',               rank: 22, h1: 26.40, h2: 28.50, delta: 2.10 },
  '158': { name: 'Taiwan',               rank: 23, h1: 26.40, h2: 28.40, delta: 2.00 },
  '840': { name: 'United States',        rank: 24, h1: 26.30, h2: 28.30, delta: 2.00 },
  '203': { name: 'Czech Republic',       rank: 25, h1: 26.00, h2: 27.80, delta: 1.80 },
  '380': { name: 'Italy',                rank: 26, h1: 25.80, h2: 27.80, delta: 2.00 },
  '100': { name: 'Bulgaria',             rank: 27, h1: 25.40, h2: 27.30, delta: 1.90 },
  '246': { name: 'Finland',              rank: 28, h1: 25.60, h2: 27.30, delta: 1.70 },
  '400': { name: 'Jordan',               rank: 29, h1: 25.40, h2: 27.00, delta: 1.60 },
  '188': { name: 'Costa Rica',           rank: 30, h1: 25.10, h2: 26.50, delta: 1.40 },
};

/** Tier 1 — leaders (H2 2025 ≥ 40%). Paints paper-green via the `partners` slot. */
export const LEADERS = new Set<string>([
  '784', // United Arab Emirates — 64.0%
  '702', // Singapore            — 60.9%
  '578', // Norway               — 46.4%
  '372', // Ireland              — 44.6%
  '250', // France               — 44.0%
  '724', // Spain                — 41.8%
  '554', // New Zealand          — 40.5%
]);

/** Tier 2 — strong adopters (30–39.9%). Paints paper-yellow via `reluctant`. */
export const STRONG = new Set<string>([
  '528', // Netherlands     — 38.9%
  '826', // United Kingdom  — 38.9%
  '634', // Qatar           — 38.3%
  '036', // Australia       — 36.9%
  '376', // Israel          — 36.1%
  '056', // Belgium         — 36.0%
  '124', // Canada          — 35.0%
  '756', // Switzerland     — 34.8%
  '752', // Sweden          — 33.3%
  '040', // Austria         — 31.4%
  '410', // South Korea     — 30.7%
]);

/** Tier 3 — middle (25–29.9%). Paints paper-brown via `suspended`. Includes the United States. */
export const MIDDLE = new Set<string>([
  '348', // Hungary        — 29.8%
  '208', // Denmark        — 28.7%
  '276', // Germany        — 28.6%
  '616', // Poland         — 28.5%
  '158', // Taiwan         — 28.4%
  '840', // United States  — 28.3%
  '203', // Czech Republic — 27.8%
  '380', // Italy          — 27.8%
  '100', // Bulgaria       — 27.3%
  '246', // Finland        — 27.3%
  '400', // Jordan         — 27.0%
  '188', // Costa Rica     — 26.5%
]);

/** Country-name overrides — tooltip labels for any ISO id that doesn't match the world-atlas name. */
export const COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(AI_DIFFUSION).map(([id, row]) => [id, row.name])
);

/**
 * Build a set of four stat tiles for an anchor. Each card's four-tile strip
 * follows the same schema — anchor short / adoption percent / global rank /
 * half-on-half change in percentage points.
 */
function tilesFor(id: string, overrides: { anchorLabel: string; rankNote: string; deltaNote: string }) {
  const d = AI_DIFFUSION[id];
  if (!d) throw new Error(`AI_DIFFUSION missing entry for ${id}`);
  const deltaStr = (d.delta >= 0 ? '+' : '') + d.delta.toFixed(1);
  return [
    {
      label: 'Anchor',
      value: overrides.anchorLabel,
      note: `${d.name} · H2 2025.`,
    },
    {
      label: 'Adoption',
      value: d.h2.toFixed(1),
      unit: '%',
      note: 'of the population used generative AI.',
    },
    {
      label: 'Global rank',
      value: String(d.rank),
      unit: '/30',
      note: overrides.rankNote,
    },
    {
      label: 'Half-on-half',
      value: deltaStr,
      unit: 'pp',
      note: overrides.deltaNote,
    },
  ];
}

/* -------------------------------------------------------------------- */
/* Anchors — five cards, ordered for narrative flow.                    */
/*                                                                      */
/*   1. US      — the inversion (rank 24, below the UAE by ~36 pp)      */
/*   2. UAE     — the ceiling, and why                                  */
/*   3. Singapore — the state-as-product                                */
/*   4. France  — Europe outruns Silicon Valley                         */
/*   5. South Korea — the year's biggest climber (+4.8 pp, 25 → 18)     */
/* -------------------------------------------------------------------- */

export const ANCHORS: Anchor[] = [
  {
    id: '840',
    label: 'United States',
    short: 'US',
    partners: LEADERS,
    reluctant: STRONG,
    suspended: MIDDLE,
    note:
      'The US produces the models and the capital; its population uses them at half the rate of the UAE and barely more than Costa Rica. The supply-side leader sits in the demand-side middle.',
    statTiles: tilesFor('840', {
      anchorLabel: 'US',
      rankNote: '24th of the 30 measured economies.',
      deltaNote: 'up from 26.3% in the first half of 2025.',
    }),
  },
  {
    id: '784',
    label: 'United Arab Emirates',
    short: 'AE',
    partners: LEADERS,
    reluctant: STRONG,
    suspended: MIDDLE,
    note:
      'The UAE tops the table: close to two-thirds of the population used generative AI in the second half of 2025. A state programme, rapid rollout in government and education, and a young, high-smartphone-penetration population together outpace what income alone predicts.',
    statTiles: tilesFor('784', {
      anchorLabel: 'AE',
      rankNote: 'highest of any measured economy.',
      deltaNote: 'up from 59.4% — the largest absolute jump among the top five.',
    }),
  },
  {
    id: '702',
    label: 'Singapore',
    short: 'SG',
    partners: LEADERS,
    reluctant: STRONG,
    suspended: MIDDLE,
    note:
      'Singapore sits second at 60.9%. Like the UAE, adoption outpaces GDP-predicted use. Unusually for a country its size, Singapore also leads the world in AI job postings as a share of all job postings.',
    statTiles: tilesFor('702', {
      anchorLabel: 'SG',
      rankNote: 'second only to the UAE.',
      deltaNote: 'up from 58.6% — steady growth at the ceiling.',
    }),
  },
  {
    id: '250',
    label: 'France',
    short: 'FR',
    partners: LEADERS,
    reluctant: STRONG,
    suspended: MIDDLE,
    note:
      'France sits fifth overall and top of the European cluster at 44%. The UK, Netherlands, Germany, and the Nordics trail behind — every one of them using generative AI at a higher rate than the United States.',
    statTiles: tilesFor('250', {
      anchorLabel: 'FR',
      rankNote: 'top of the European cluster.',
      deltaNote: 'up 3.1 pp from 40.9% — Europe is closing the gap with the Gulf.',
    }),
  },
  {
    id: '410',
    label: 'South Korea',
    short: 'KR',
    partners: LEADERS,
    reluctant: STRONG,
    suspended: MIDDLE,
    note:
      'South Korea climbed seven ranks in six months — the biggest jump in the dataset — from 25th (25.9%) to 18th (30.7%). Not an outlier on GDP; an outlier on velocity.',
    statTiles: tilesFor('410', {
      anchorLabel: 'KR',
      rankNote: 'up from 25th in H1 2025.',
      deltaNote: 'biggest climber of the year — seven places in six months.',
    }),
  },
];
