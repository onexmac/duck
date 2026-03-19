/**
 * Downloads GoPato duck icon from Figma MCP assets and saves PWA icon files.
 *
 * Nav icons  → public/icons/nav-*.svg  (committed SVGs, no download needed)
 * Duck icon  → public/apple-touch-icon.png + icon-192.png + icon-512.png + favicon-32.png
 *              (yellow background composite for PWA / iOS home screen)
 *
 * Run manually: node scripts/fetch-icons.mjs
 * Run via npm:  npm run fetch-icons
 * Also runs as part of: npm run build
 */

import sharp from "sharp";
import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

// ── Duck asset URLs (from figma-icons.ts — keep in sync) ────────────────────
// Refreshed 2026-03-19. Expires after 7 days — re-run to refresh.
const DUCK_L1 = "https://www.figma.com/api/mcp/asset/a51c3b01-0846-41fa-95ec-64c55e3c06cc";
const DUCK_L2 = "https://www.figma.com/api/mcp/asset/ee4a86d6-44de-4a7c-be36-97da6ecaa47d";

function fetchBuf(url) {
  const tmp = join(mkdtempSync(join(tmpdir(), "duck-")), "asset");
  execSync(`curl -sfL "${url}" -o "${tmp}"`, { stdio: "pipe" });
  const buf = readFileSync(tmp);
  rmSync(tmp, { force: true });
  return buf;
}

// ── Generate duck PWA icons (yellow bg + 2 duck layers composited) ───────────
async function fetchDuckIcons() {
  const [l1, l2] = [fetchBuf(DUCK_L1), fetchBuf(DUCK_L2)];

  for (const size of [32, 180, 192, 512]) {
    const pad   = Math.round(size * 0.16);
    const inner = size - pad * 2;
    const opts  = { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } };

    const [r1, r2] = await Promise.all([
      sharp(l1).resize(inner, inner, opts).png().toBuffer(),
      sharp(l2).resize(inner, inner, opts).png().toBuffer(),
    ]);

    const out = size === 180 ? "public/apple-touch-icon.png"
              : size ===  32 ? "public/favicon-32.png"
              : `public/icon-${size}.png`;

    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 244, g: 204, b: 0, alpha: 255 } },
    })
      .composite([{ input: r1, top: pad, left: pad }, { input: r2, top: pad, left: pad }])
      .png()
      .toFile(out);

    console.log(`✓ ${out}`);
  }
}

// ── Run ──────────────────────────────────────────────────────────────────────
try {
  await fetchDuckIcons();
  console.log("\nDuck icons fetched from Figma ✓");
} catch (err) {
  console.warn(`\n⚠ fetch-icons failed (Figma URLs may have expired): ${err.message}`);
  console.warn("  Re-fetch URLs via Figma MCP and update src/lib/figma-icons.ts");
  // Don't fail the build — static fallbacks already exist in /public/
  process.exit(0);
}
