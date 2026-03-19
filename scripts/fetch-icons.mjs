/**
 * Downloads GoPato icons from Figma MCP assets and saves them as static files.
 *
 * Nav icons  → public/icons/nav-*.png  (used via CSS mask-image in BottomNav)
 * Duck icon  → public/apple-touch-icon.png + icon-192.png + icon-512.png + favicon-32.png
 *              (yellow background composite for PWA / iOS home screen)
 *
 * Run manually: node scripts/fetch-icons.mjs
 * Run via npm:  npm run fetch-icons
 * Also runs as part of: npm run build
 */

import sharp from "sharp";
import { mkdir } from "fs/promises";

// ── Asset URLs (from figma-icons.ts — keep in sync) ─────────────────────────
const DUCK_L1   = "https://www.figma.com/api/mcp/asset/82a44129-08c4-407f-b6c4-2aae954ed123";
const DUCK_L2   = "https://www.figma.com/api/mcp/asset/b42fc228-9715-476a-b5d6-86b48205a142";
const NAV_URLS  = {
  "nav-home":   "https://www.figma.com/api/mcp/asset/d553c443-7688-41bf-9c96-988e65e4d28b",
  "nav-chat":   "https://www.figma.com/api/mcp/asset/ec0f5285-d13a-4c03-beec-e05db71ec131",
  "nav-orders": "https://www.figma.com/api/mcp/asset/54580c7e-9de8-4261-951c-a0c2b7948cc6",
  "nav-avatar": "https://www.figma.com/api/mcp/asset/143aaa58-f711-4f65-bcd8-962de54cdf2d",
};

async function fetchBuf(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Download nav icons as-is (PNG) ──────────────────────────────────────────
async function fetchNavIcons() {
  await mkdir("public/icons", { recursive: true });
  for (const [name, url] of Object.entries(NAV_URLS)) {
    const buf = await fetchBuf(url);
    await sharp(buf).png().toFile(`public/icons/${name}.png`);
    console.log(`✓ public/icons/${name}.png`);
  }
}

// ── Generate duck PWA icons (yellow bg + 2 duck layers composited) ───────────
async function fetchDuckIcons() {
  const [l1, l2] = await Promise.all([fetchBuf(DUCK_L1), fetchBuf(DUCK_L2)]);

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
  await fetchNavIcons();
  await fetchDuckIcons();
  console.log("\nAll icons fetched from Figma ✓");
} catch (err) {
  console.warn(`\n⚠ fetch-icons failed (Figma URLs may have expired): ${err.message}`);
  console.warn("  Run `npm run fetch-icons` after refreshing URLs in figma-icons.ts");
  // Don't fail the build — static fallbacks already exist in /public/
  process.exit(0);
}
