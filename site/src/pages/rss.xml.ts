import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

// One entry per published piece. When a content-collection pattern is
// introduced later, this array becomes the output of a glob import.
const pieces = [
  {
    title: 'The United States makes the models. It ranks 24th at using them.',
    slug: 'ai-adoption-gap',
    description:
      'Microsoft\u2019s 2025 global survey of 32 economies puts the UAE first at 64%, Singapore at 61%, France at 44%, and the United States at 28.3%. The country that wrote the menu is eating somewhere else.',
    pubDate: new Date('2026-04-22T12:00:00Z'),
  },
];

export async function GET(context: APIContext) {
  const siteUrl = context.site?.href ?? 'https://inkwellreview.com/';
  return rss({
    title: 'Inkwell Review',
    description:
      'Statistical peculiarities of human behaviour, charted properly and argued well. A twice-weekly publication edited by Prof. Ollie Inkwell.',
    site: siteUrl,
    items: pieces.map((p) => ({
      title: p.title,
      link: new URL(`/pieces/${p.slug}`, siteUrl).href,
      description: p.description,
      pubDate: p.pubDate,
    })),
    customData: '<language>en-gb</language>',
  });
}
