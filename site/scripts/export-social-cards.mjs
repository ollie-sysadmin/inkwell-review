/**
 * Social-card PNG export — the canonical publishing hop.
 *
 * Pre-req: the Astro dev server must be running (`pnpm --dir site dev`).
 * The script connects to it, fetches the card index, and screenshots
 * each card at its source URL via headless Chromium.
 *
 * Output:
 *   social-output/<slug>/<index>-<short>.png    — per-piece folder for upload
 *   site/public/pieces/<slug>/social/<index>.png — served by Vercel (OG unfurls)
 *
 * Invoke:
 *   pnpm --dir site cards:export
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = process.env.INKWELL_BASE_URL || 'http://localhost:4321';
const SITE_ROOT = path.resolve(__dirname, '..');            // .../site
const PROJECT_ROOT = path.resolve(SITE_ROOT, '..');          // .../Inkwell Review
const OUT_DIR = path.join(PROJECT_ROOT, 'social-output');
const PUBLIC_MIRROR = path.join(SITE_ROOT, 'public', 'pieces');

/** Pretty console output. */
const c = (code, s) => `\x1b[${code}m${s}\x1b[0m`;
const dim = (s) => c(2, s);
const green = (s) => c(32, s);
const yellow = (s) => c(33, s);
const cyan = (s) => c(36, s);

async function fetchIndex() {
  try {
    const res = await fetch(`${BASE}/api/cards.json`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(c(31, `\n✗ Could not reach ${BASE}/api/cards.json`));
    console.error(dim(`  ${err.message ?? err}`));
    console.error(dim(`\n  Is the dev server running?  pnpm --dir site dev\n`));
    process.exit(1);
  }
}

async function exportCards() {
  const list = await fetchIndex();
  if (!list.length) {
    console.log(yellow('No cards declared. Nothing to export.'));
    return;
  }
  console.log(cyan(`\nInkwell Review — social-card export`));
  console.log(dim(`  source  : ${BASE}`));
  console.log(dim(`  output  : ${path.relative(process.cwd(), OUT_DIR)}/`));
  console.log(dim(`  mirror  : ${path.relative(process.cwd(), PUBLIC_MIRROR)}/<slug>/social/`));
  console.log(dim(`  cards   : ${list.length}\n`));

  const browser = await chromium.launch();
  // deviceScaleFactor: 1 — we want 1080×1350 exactly, not 2160×2700.
  // Instagram will downscale anyway; larger files cost more in Buffer.
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1450 },
    deviceScaleFactor: 1,
  });

  const started = Date.now();
  let done = 0;

  for (const { slug, index, short, headline } of list) {
    const page = await context.newPage();
    const url = `${BASE}/pieces/${slug}/social/${index}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

    // Wait for the map to finish drawing — d3 loads the topojson
    // from a CDN client-side; `.country` paths appear only after that.
    await page.waitForFunction(
      () => document.querySelectorAll('.map-wrap .country').length >= 100,
      null,
      { timeout: 10000 }
    );
    // Short settle so strokes/fills fully apply.
    await page.waitForTimeout(250);

    // Screenshot the card element, not the whole viewport — that strips
    // the #222 preview ground and gives us exactly 1080×1350 pixels.
    const card = page.locator('.card').first();
    const png = await card.screenshot({ type: 'png' });

    // Primary output: dated / per-piece folder, filename sorts by index.
    const shortPad = String(index).padStart(2, '0');
    const outFilename = `${shortPad}-${short.toLowerCase()}.png`;
    const outPath = path.join(OUT_DIR, slug, outFilename);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, png);

    // Mirror: public/pieces/<slug>/social/<index>.png so the canonical
    // OG URL (inkwellreview.com/pieces/<slug>/social/0.png) serves the
    // real PNG once deployed.
    const mirrorPath = path.join(PUBLIC_MIRROR, slug, 'social', `${index}.png`);
    await fs.mkdir(path.dirname(mirrorPath), { recursive: true });
    await fs.writeFile(mirrorPath, png);

    done += 1;
    console.log(
      `  ${green('✓')} ${slug}/${outFilename} ${dim(`— ${headline.slice(0, 48)}${headline.length > 48 ? '…' : ''}`)}`,
    );

    await page.close();
  }

  await browser.close();

  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`\n${green('Done.')} Exported ${done} cards in ${secs}s.`);
  console.log(dim(`  → open ${path.relative(process.cwd(), OUT_DIR)} in Finder for upload.`));
}

exportCards().catch((err) => {
  console.error(c(31, '\n✗ Export failed'));
  console.error(err);
  process.exit(1);
});
