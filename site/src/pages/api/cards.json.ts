/**
 * GET /api/cards.json
 * Returns the flat list of every declared social card across every piece.
 * Used by scripts/export-social-cards.mjs to drive the Playwright loop.
 */
import type { APIRoute } from 'astro';
import type { SocialCardProps } from '../../components/SocialCard4x5.types';

interface PieceModule {
  socialCards?: SocialCardProps[];
}

interface CardIndexEntry {
  slug: string;
  index: number;
  short: string;
  headline: string;
  desk: string;
}

export const GET: APIRoute = async () => {
  const modules = import.meta.glob<PieceModule>('../../pieces/*.ts', { eager: true });
  const out: CardIndexEntry[] = [];
  for (const [filepath, mod] of Object.entries(modules)) {
    const match = filepath.match(/\/([^/]+)\.ts$/);
    if (!match) continue;
    const slug = match[1];
    const cards = mod.socialCards;
    if (!Array.isArray(cards)) continue;
    cards.forEach((card, index) => {
      out.push({
        slug,
        index,
        short: card.anchor?.short ?? String(index),
        headline: card.headline,
        desk: card.desk,
      });
    });
  }
  return new Response(JSON.stringify(out, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
