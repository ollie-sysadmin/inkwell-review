/**
 * Types for the 4:5 social card. Lives in a standalone .ts file (not in
 * the .astro frontmatter) so that other .ts modules — in particular the
 * per-piece card declarations under src/pieces/ — can `import type`
 * from here without esbuild trying to parse the .astro file.
 */
import type { CartographyAnchor } from './cartography-anchor';

export type Desk =
  | 'cover'
  | 'data'
  | 'voice'
  | 'cities'
  | 'archive'
  | 'interviews';

export type LegendClass =
  | 'anchor'
  | 'treaty'
  | 'reluctant'
  | 'haven'
  | 'eu-bloc'
  | 'no-treaty';

export interface LegendItem {
  cls: LegendClass;
  label: string;
}

export interface SocialCardProps {
  desk: Desk;
  issueTag: string;
  kicker: string;
  headline: string;
  emphasis?: { type: 'circled' | 'highlight'; word: string };
  figNumber: string;
  plateTitle: string;
  anchor: CartographyAnchor;
  havens: Set<string>;
  euMembers?: Set<string>;
  showHavens?: boolean;
  legend: LegendItem[];
  footerStat: {
    value: string;
    caption: string;
    /** Optional unit — renders at ~0.35× the value's display size, baseline-aligned. Use for "%" on ratio pieces, "pp" on delta pieces; omit for counts. */
    unit?: string;
  };
  sourceLine: string;
  ctaUrl: string;
  stampSvg: string;
  id?: string;
}
