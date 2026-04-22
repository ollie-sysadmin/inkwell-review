/**
 * Extradition Atlas — social-card declarations.
 *
 * One 4:5 card per anchor (8 cards) for the Instagram / LinkedIn /
 * Threads / Bluesky carousel. Read by the dynamic route
 * `/pieces/[slug]/social/[index]` and by the Satori PNG pipeline at
 * build time.
 *
 * Headline, emphasis, and footerStat are editorial drafts: Dene
 * reviews each card before PNG export. The composition, map grammar,
 * and shared chrome (issue tag, kicker, source line) are locked.
 */
import {
  ANCHORS,
  EU_MEMBERS,
  FUGITIVE_HAVENS,
} from '../lib/cartography/treaty-data';
import type { SocialCardProps } from '../components/SocialCard4x5.types';

/** Per-piece stamp — a suitcase. Also used in the article's plate. */
export const stampSvg = `
<svg viewBox="0 0 30 22" aria-hidden="true">
  <g stroke="#111111" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="7" width="26" height="13" rx="0.5"/>
    <path d="M10 7 V3.5 h10 V7"/>
    <line x1="15" y1="11" x2="15" y2="16"/>
  </g>
</svg>`;

const ATLAS_ISSUE_TAG = 'Issue 01 · Data';
const ATLAS_KICKER = 'Data · Cartography · Issue 01';
const ATLAS_CTA = 'inkwellreview.com/pieces/extradition-atlas';
const ATLAS_SOURCE_LINE =
  'Source: US State Dept. (18 U.S.C. § 3181), UK Home Office, Eurojust. Full list on the web edition.';

const ATLAS_LEGEND: SocialCardProps['legend'] = [
  { cls: 'anchor', label: 'Anchor' },
  { cls: 'treaty', label: 'Treaty partner' },
  { cls: 'haven', label: 'Fugitive haven' },
  { cls: 'no-treaty', label: 'No treaty' },
];

type Draft = {
  short: string;
  headline: string;
  emphasis?: SocialCardProps['emphasis'];
  footerStat: SocialCardProps['footerStat'];
};

/* ----------------------------------------------------------------------
 * DRAFTS — rewritten Session 6 under the locked "1-2 punch" grammar:
 *   Headline = clear, draws you in, sets context.
 *   Footer caption = the clever data-driven payoff.
 * Emphasis distribution considered across the carousel:
 *   5 highlight (reversed block) — the punchy, vivid, edge-first cards.
 *   3 circled (pencil-ring) — the reflective, narrower-frame cards.
 * ---------------------------------------------------------------------- */
const DRAFTS: Draft[] = [
  {
    short: 'US',
    headline: 'American criminals: here are 78 countries that will not send you home.',
    emphasis: { type: 'highlight', word: '78 countries' },
    footerStat: {
      value: '117',
      caption: 'countries have treaties with the US.<br>Ten of them <em>rarely</em> enforce.',
    },
  },
  {
    short: 'UK',
    headline: 'British fugitives: 47 countries still outside the treaty net.',
    emphasis: { type: 'circled', word: '47 countries' },
    footerStat: {
      value: '148',
      caption: 'countries will return you.<br>Four <em>won\u2019t</em>: Russia, China, Iran, the UAE.',
    },
  },
  {
    short: 'EU',
    headline: 'European on the run? 27 countries hand you back automatically.',
    emphasis: { type: 'highlight', word: '27 countries' },
    footerStat: {
      value: '4',
      caption: 'doors out of the warrant\u2019s reach.<br>Russia, Belarus, <em>Iran</em>, Venezuela.',
    },
  },
  {
    short: 'AU',
    headline: 'Australian criminals: 40 countries will send you back. Not China.',
    emphasis: { type: 'highlight', word: 'Not China' },
    footerStat: {
      value: '2007',
      caption: 'China treaty signed, never ratified.<br>Enabling regulations <em>withdrawn</em> in 2017.',
    },
  },
  {
    short: 'CA',
    headline: 'Canadian fugitives: a broad map, a narrow corridor.',
    emphasis: { type: 'circled', word: 'narrow corridor' },
    footerStat: {
      value: '50',
      caption: 'treaty partners on paper.<br>One border does most of the <em>work</em>. Always the US.',
    },
  },
  {
    short: 'RU',
    headline: 'Russia doesn\u2019t surrender its own. Ever.',
    emphasis: { type: 'highlight', word: 'Ever' },
    footerStat: {
      value: '56',
      caption: 'CIS and bilateral partners.<br>Zero <em>Russian</em> nationals ever surrendered. Constitutional bar.',
    },
  },
  {
    short: 'CN',
    headline: 'Wanted by China: 60 countries might help. Not the West.',
    emphasis: { type: 'circled', word: 'might help' },
    footerStat: {
      value: '0',
      caption: 'treaties with the US, UK, or Canada.<br>Western courts <em>refuse</em> most requests that do come in.',
    },
  },
  {
    short: 'AE',
    headline: 'The UAE signs every treaty. And keeps the guests.',
    emphasis: { type: 'highlight', word: 'keeps the guests' },
    footerStat: {
      value: '54',
      caption: 'partners on paper.<br>A <em>golden visa</em> works faster than any warrant.',
    },
  },
];

export const socialCards: SocialCardProps[] = DRAFTS.map((draft) => {
  const anchor = ANCHORS.find((a) => a.short === draft.short);
  if (!anchor) throw new Error(`extradition-atlas: missing ANCHORS entry for ${draft.short}`);
  return {
    desk: 'data',
    issueTag: ATLAS_ISSUE_TAG,
    kicker: ATLAS_KICKER,
    figNumber: 'I',
    plateTitle: `The Extradition Atlas \u00B7 anchored on ${anchor.label}`,
    anchor,
    havens: FUGITIVE_HAVENS,
    euMembers: EU_MEMBERS,
    showHavens: true,
    legend: ATLAS_LEGEND,
    sourceLine: ATLAS_SOURCE_LINE,
    ctaUrl: ATLAS_CTA,
    stampSvg,
    headline: draft.headline,
    emphasis: draft.emphasis,
    footerStat: draft.footerStat,
  };
});
