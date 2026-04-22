import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'Inkwell Review',
    description:
      'Statistical peculiarities of human behaviour, charted properly and argued well. A twice-weekly publication edited by Prof. Ollie Inkwell.',
    site: context.site ?? 'https://inkwellreview.com',
    // Pieces get wired through here in Session 4 once the content collection
    // is set up. For now we publish an empty feed so /rss.xml is a valid URL.
    items: [],
    customData: '<language>en-gb</language>',
  });
}
