/**
 * Standalone type for a Cartography anchor. Mirrors the interface
 * originally declared in `src/templates/Cartography.astro` so that
 * other .ts modules (e.g. social-card declarations under src/pieces/)
 * can import it without esbuild trying to parse the .astro file.
 *
 * The .astro template re-imports this type for consistency.
 */
export interface StatTile {
  label: string;
  value: string;
  unit?: string;
  note: string;
}

export interface CartographyAnchor {
  id: string;
  label: string;
  short: string;
  partners: Set<string>;
  reluctant?: Set<string>;
  suspended?: Set<string>;
  bloc?: Set<string>;
  note: string;
  /**
   * Per-anchor override for the four-tile stats strip. When present,
   * the template renders these tiles verbatim. When absent, it falls
   * back to the Atlas-style computed tiles (anchor / partners count /
   * reluctant count / no-treaty count). Must be exactly four tiles.
   */
  statTiles?: StatTile[];
}
