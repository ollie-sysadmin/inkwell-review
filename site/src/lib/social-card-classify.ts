/**
 * Shared country-classifier used by both the HTML card
 * (SocialCard4x5.astro's inline script) and the Satori PNG pipeline
 * (social-card-satori.ts). Same rules; one source of truth.
 */
import type { CartographyAnchor } from '../components/cartography-anchor';

export type ClassifyResult =
  | 'anchor'
  | 'eu-bloc'
  | 'haven'
  | 'suspended'
  | 'reluctant'
  | 'treaty'
  | 'no-treaty';

export interface ClassifyInput {
  anchor: CartographyAnchor;
  havens: Set<string>;
  euMembers?: Set<string>;
  showHavens?: boolean;
}

export function makeClassify(input: ClassifyInput): (id: string) => ClassifyResult {
  const { anchor, havens, euMembers, showHavens } = input;
  const partners = anchor.partners;
  const reluctant = anchor.reluctant ?? new Set<string>();
  const suspended = anchor.suspended ?? new Set<string>();
  const bloc = anchor.bloc ?? new Set<string>();

  return (id: string): ClassifyResult => {
    if (id === anchor.id) return 'anchor';
    if (anchor.id === 'eu' && bloc.has(id)) return 'eu-bloc';
    if (anchor.id === 'eu' && euMembers && euMembers.has(id)) return 'eu-bloc';
    if (showHavens && havens.has(id) && (!partners.has(id) || reluctant.has(id))) {
      return 'haven';
    }
    if (suspended.has(id)) return 'suspended';
    if (reluctant.has(id)) return 'reluctant';
    if (partners.has(id)) return 'treaty';
    return 'no-treaty';
  };
}

/** Fills that match the HTML card's CSS exactly. Locked Session 5. */
export const CLASS_FILL: Record<ClassifyResult, string> = {
  'anchor': '#E1E1E1',      // photocopy-white
  'eu-bloc': '#CDA5EF',     // paper-purple
  'haven': '#ECADD4',       // paper-pink
  'suspended': '#DDB896',   // paper-brown
  'reluctant': '#ECDD85',   // paper-yellow
  'treaty': '#97CF9C',      // paper-green
  'no-treaty': '#111111',   // photocopy-black
};

/** Legend swatch fills (same palette, referenced from the card's mini-legend). */
export const LEGEND_FILL: Record<string, string> = {
  'anchor': '#E1E1E1',
  'treaty': '#97CF9C',
  'reluctant': '#ECDD85',
  'haven': '#ECADD4',
  'eu-bloc': '#CDA5EF',
  'no-treaty': '#111111',
};

export const DESK_COLOR: Record<string, string> = {
  cover: '#CDA5EF',      // paper-purple
  data: '#96C7F2',       // paper-blue
  voice: '#ECDD85',      // paper-yellow
  cities: '#97CF9C',     // paper-green
  archive: '#DDB896',    // paper-brown
  interviews: '#ECADD4', // paper-pink
};
