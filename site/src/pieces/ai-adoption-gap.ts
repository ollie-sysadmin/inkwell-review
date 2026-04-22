/**
 * AI Adoption Gap — social-card declarations.
 *
 * Five 4:5 cards for the Instagram / LinkedIn / Threads / Bluesky carousel.
 * One per anchor: US → UAE → Singapore → France → South Korea.
 *
 * Rewritten under the locked "1-2 punch" grammar:
 *   Headline = clear, draws the reader in, sets context.
 *   Footer caption = the clever data-driven payoff.
 * Headline-number ≠ footer-number (complementary, never duplicate).
 * Emphasis distribution across the five: 3 highlight / 2 circled.
 */
import { ANCHORS } from '../lib/cartography/ai-diffusion-data';
import type { SocialCardProps } from '../components/SocialCard4x5.types';

/** Per-piece stamp: a pencil-circle bullseye — the mark on an editor's ranking table. */
export const stampSvg = `
<svg viewBox="0 0 30 22" aria-hidden="true">
  <g stroke="#111111" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="15" cy="11" r="8.2" stroke-width="1.6" transform="rotate(-6 15 11)"/>
    <circle cx="15" cy="11" r="4.2" stroke-width="1.4" transform="rotate(4 15 11)"/>
    <circle cx="15" cy="11" r="1.2" stroke-width="1.4" fill="#111111"/>
  </g>
</svg>`;

const PIECE_ISSUE_TAG = 'Issue 03 · Data';
const PIECE_KICKER = 'Data · Cartography · Issue 03';
const PIECE_CTA = 'inkwellreview.com/pieces/ai-adoption-gap';
const PIECE_SOURCE_LINE =
  'Source: Microsoft AI Economy Institute 2025 · Stanford AI Index 2026, Fig. 4.3.12. H2 2025 population-level adoption. Top 30 measured economies.';

const PIECE_LEGEND: SocialCardProps['legend'] = [
  { cls: 'anchor', label: 'Anchor' },
  { cls: 'treaty', label: 'Leader · 40%+' },
  { cls: 'reluctant', label: 'Strong · 30 – 39%' },
  { cls: 'no-treaty', label: 'Outside top 30' },
];

type Draft = {
  short: string;
  headline: string;
  emphasis?: SocialCardProps['emphasis'];
  footerStat: SocialCardProps['footerStat'];
};

/* ----------------------------------------------------------------------
 * DRAFTS — five cards, 1-2 punch grammar, headline ≠ footer number.
 * Emphasis split: 3 highlight, 2 circled (US, UAE, France = highlight;
 * Singapore, South Korea = circled).
 * ---------------------------------------------------------------------- */
const DRAFTS: Draft[] = [
  {
    short: 'US',
    headline: 'The country that builds AI ranks 24th at using it.',
    emphasis: { type: 'highlight', word: '24th' },
    footerStat: {
      value: '28.3',
      unit: '%',
      caption: 'of Americans use generative AI.<br><em>Twenty-three</em> other countries use it more.',
    },
  },
  {
    short: 'AE',
    headline: 'The United Arab Emirates is the world\u2019s heaviest user of generative AI.',
    emphasis: { type: 'highlight', word: 'heaviest user' },
    footerStat: {
      value: '64',
      unit: '%',
      caption: 'of Emiratis use it.<br>More than <em>double</em> the United States.',
    },
  },
  {
    short: 'SG',
    headline: 'Singapore is the state-as-tech-product. It shows.',
    emphasis: { type: 'circled', word: 'state-as-tech-product' },
    footerStat: {
      value: '60.9',
      unit: '%',
      caption: 'of Singaporeans use it.<br>Second only to the <em>UAE</em>, and by a whisker.',
    },
  },
  {
    short: 'FR',
    headline: 'France uses generative AI more than Silicon Valley does.',
    emphasis: { type: 'highlight', word: 'more than Silicon Valley' },
    footerStat: {
      value: '44',
      unit: '%',
      caption: 'of the French population use it.<br>France, the UK, Germany \u2014 <em>all</em> ahead of the US.',
    },
  },
  {
    short: 'KR',
    headline: 'South Korea climbed seven places in six months. Nobody else moved like this.',
    emphasis: { type: 'circled', word: 'seven places' },
    footerStat: {
      value: '+4.8',
      unit: 'pp',
      caption: 'percentage-point jump, H1 to H2 2025.<br>The biggest half-on-half move in the <em>dataset</em>.',
    },
  },
];

export const socialCards: SocialCardProps[] = DRAFTS.map((draft) => {
  const anchor = ANCHORS.find((a) => a.short === draft.short);
  if (!anchor) throw new Error(`ai-adoption-gap: missing ANCHORS entry for ${draft.short}`);
  return {
    desk: 'data',
    issueTag: PIECE_ISSUE_TAG,
    kicker: PIECE_KICKER,
    figNumber: 'III',
    plateTitle: `AI adoption by country \u00B7 anchored on ${anchor.label}`,
    anchor,
    havens: new Set<string>(),
    euMembers: new Set<string>(),
    showHavens: false,
    legend: PIECE_LEGEND,
    sourceLine: PIECE_SOURCE_LINE,
    ctaUrl: PIECE_CTA,
    stampSvg,
    headline: draft.headline,
    emphasis: draft.emphasis,
    footerStat: draft.footerStat,
  };
});
