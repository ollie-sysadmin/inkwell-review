/**
 * Fugitive Destinations — social-card declarations.
 *
 * One 4:5 card per anchor (3 cards). See notes on extradition-atlas.ts
 * for the pattern.
 */
import { ANCHORS, QUIET_HAVENS } from '../lib/cartography/fugitive-data';
import type { SocialCardProps } from '../components/SocialCard4x5.types';

/** Per-piece stamp — a tilted ink passport stamp. */
export const stampSvg = `
<svg viewBox="0 0 30 22" aria-hidden="true">
  <g transform="rotate(-4 15 11)" stroke="#111111" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="26" height="16"/>
    <line x1="5.5" y1="8.5" x2="13.5" y2="8.5"/>
    <line x1="5.5" y1="13.5" x2="11.5" y2="13.5"/>
    <path d="M17.5 11 L25 11 M22 8.5 L25 11 L22 13.5"/>
  </g>
</svg>`;

const FD_ISSUE_TAG = 'Issue 02 · Cover';
const FD_KICKER = 'Cover · Cartography · Issue 02';
const FD_CTA = 'inkwellreview.com/pieces/fugitive-destinations';
const FD_SOURCE_LINE =
  'Source: US Marshals, FBI, UK NCA, Europol, public capture record. Full methodology on the web edition.';

const FD_LEGEND: SocialCardProps['legend'] = [
  { cls: 'anchor', label: 'Origin' },
  { cls: 'treaty', label: 'Top destination' },
  { cls: 'reluctant', label: 'Secondary' },
  { cls: 'haven', label: 'Quiet haven' },
];

type Draft = {
  short: string;
  headline: string;
  emphasis?: SocialCardProps['emphasis'];
  footerStat: SocialCardProps['footerStat'];
};

/* ----------------------------------------------------------------------
 * DRAFTS — rewritten Session 6 under the locked "1-2 punch" grammar.
 * Emphasis: 2 highlight, 1 circled across the 3-card carousel.
 * ---------------------------------------------------------------------- */
const DRAFTS: Draft[] = [
  {
    short: 'US',
    headline: 'American fugitives end up in Mexico. Almost all of them.',
    emphasis: { type: 'highlight', word: 'Mexico' },
    footerStat: {
      value: '11',
      caption: 'top destinations.<br>One of them does <em>most</em> of the work alone.',
    },
  },
  {
    short: 'UK',
    headline: 'British fugitives: the Costa del Sol never stopped working.',
    emphasis: { type: 'circled', word: 'Costa del Sol' },
    footerStat: {
      value: '8',
      caption: 'Mediterranean destinations.<br><em>Spain</em> and Cyprus between them carry the bulk.',
    },
  },
  {
    short: 'EU',
    headline: 'European fugitives surface in three kinds of place.',
    emphasis: { type: 'highlight', word: 'three kinds of place' },
    footerStat: {
      value: '10',
      caption: 'recurring destinations.<br>Money in the <em>Gulf</em>. Passports in South America. Pariahs for politics.',
    },
  },
];

export const socialCards: SocialCardProps[] = DRAFTS.map((draft) => {
  const anchor = ANCHORS.find((a) => a.short === draft.short);
  if (!anchor) throw new Error(`fugitive-destinations: missing ANCHORS entry for ${draft.short}`);
  return {
    desk: 'cover',
    issueTag: FD_ISSUE_TAG,
    kicker: FD_KICKER,
    figNumber: 'II',
    plateTitle: `Fugitive Destinations \u00B7 anchored on ${anchor.label}`,
    anchor,
    havens: QUIET_HAVENS,
    showHavens: true,
    legend: FD_LEGEND,
    sourceLine: FD_SOURCE_LINE,
    ctaUrl: FD_CTA,
    stampSvg,
    headline: draft.headline,
    emphasis: draft.emphasis,
    footerStat: draft.footerStat,
  };
});
