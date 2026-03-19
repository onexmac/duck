/**
 * Generates PWA + iOS home screen icons.
 * Duck traced from the GoPato brand icon: dark #2F3644 rubber duck
 * on yellow #F4CC00 background, 18% padding.
 * Run: node scripts/gen-icons.mjs
 */
import sharp from "sharp";

// Traced from the GoPato Figma file (node 687:7, color #2F3644).
// Rubber duck: round body, round head upper-right, flat bill, white belly circle.
function makeSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 180 180">
  <!-- Yellow background -->
  <rect width="180" height="180" fill="#F4CC00"/>

  <!-- Body — large ellipse, bottom-heavy -->
  <ellipse cx="82" cy="118" rx="52" ry="46" fill="#2F3644"/>

  <!-- Head — smaller circle, upper-right, overlapping body -->
  <circle cx="126" cy="68" r="32" fill="#2F3644"/>

  <!-- Neck fill — bridges head and body -->
  <rect x="90" y="72" width="40" height="36" fill="#2F3644"/>

  <!-- Bill — flat duck beak pointing right -->
  <path d="M152 60 L172 56 L170 72 L150 76 Z" fill="#2F3644"/>

  <!-- Belly — white circle inside body, brand signature detail -->
  <circle cx="74" cy="124" r="26" fill="white"/>
</svg>`;
}

async function gen(size, outPath) {
  await sharp(Buffer.from(makeSvg(size))).png().toFile(outPath);
  console.log("✓", outPath);
}

await gen(180, "public/apple-touch-icon.png");
await gen(192, "public/icon-192.png");
await gen(512, "public/icon-512.png");
await gen(32,  "public/favicon-32.png");
console.log("Done.");
