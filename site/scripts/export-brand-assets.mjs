/**
 * Brand-asset PNG export — favicon + OG default.
 *
 * Pre-req: the Astro dev server must be running (`pnpm --dir site dev`).
 * The script connects to it, loads the preview routes under /review/,
 * and screenshots the named element to the right path under public/.
 *
 * Output:
 *   site/public/apple-touch-icon.png  (180×180)
 *   site/public/og/default.png        (1200×630)
 *
 * Invoke:
 *   pnpm --dir site brand:export
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = process.env.INKWELL_BASE_URL || 'http://localhost:4321';
const SITE_ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(SITE_ROOT, 'public');

const c = (code, s) => `\x1b[${code}m${s}\x1b[0m`;
const dim = (s) => c(2, s);
const green = (s) => c(32, s);
const cyan = (s) => c(36, s);

const jobs = [
  {
    name: 'apple-touch-icon',
    url: '/review/apple-touch-icon',
    selector: '#apple-touch-icon',
    viewport: { width: 220, height: 220 },
    out: path.join(PUBLIC, 'apple-touch-icon.png'),
  },
  {
    name: 'og-default',
    url: '/review/og-default',
    selector: '#og-default',
    viewport: { width: 1240, height: 680 },
    out: path.join(PUBLIC, 'og', 'default.png'),
  },
];

async function run() {
  console.log(cyan(`\nInkwell Review — brand-asset export`));
  console.log(dim(`  source: ${BASE}\n`));

  const browser = await chromium.launch();

  for (const job of jobs) {
    const context = await browser.newContext({
      viewport: job.viewport,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(`${BASE}${job.url}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(150);

    const locator = page.locator(job.selector).first();
    const png = await locator.screenshot({ type: 'png' });
    await fs.mkdir(path.dirname(job.out), { recursive: true });
    await fs.writeFile(job.out, png);
    console.log(`  ${green('✓')} ${job.name} ${dim(`→ ${path.relative(SITE_ROOT, job.out)}`)}`);

    await context.close();
  }

  await browser.close();
  console.log(`\n${green('Done.')}\n`);
}

run().catch((err) => {
  console.error(c(31, '\n✗ Export failed'));
  console.error(err);
  process.exit(1);
});
