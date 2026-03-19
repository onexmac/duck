/**
 * Generates PWA + iOS home screen icons.
 * Duck yellow background (#F4CC00), white duck on white rounded square.
 * Run: node scripts/gen-icons.mjs
 */
import sharp from "sharp";
import { writeFileSync } from "fs";

// Duck SVG — friendly side-profile silhouette, white fill
// Fits in a ~72% inner square (leaving 14% padding each side)
const duckSvg = (size) => {
  const pad = Math.round(size * 0.16);
  const inner = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Yellow background -->
  <rect width="${size}" height="${size}" fill="#F4CC00"/>
  <!-- Duck path scaled to inner area -->
  <g transform="translate(${pad}, ${pad}) scale(${inner / 100})">
    <!-- Body -->
    <ellipse cx="52" cy="62" rx="34" ry="26" fill="white"/>
    <!-- Head -->
    <circle cx="22" cy="36" r="18" fill="white"/>
    <!-- Neck connector -->
    <ellipse cx="34" cy="50" rx="14" ry="16" fill="white"/>
    <!-- Bill -->
    <ellipse cx="5" cy="36" rx="10" ry="6" fill="white"/>
    <!-- Tail -->
    <ellipse cx="84" cy="50" rx="10" ry="14" fill="white" transform="rotate(-20 84 50)"/>
    <!-- Eye -->
    <circle cx="17" cy="31" r="3.5" fill="#F4CC00"/>
    <!-- Wing hint -->
    <ellipse cx="54" cy="58" rx="22" ry="10" fill="rgba(0,0,0,0.06)" transform="rotate(-8 54 58)"/>
  </g>
</svg>`;
};

// Rounded square for iOS (apple-touch-icon) — the OS clips corners itself,
// but we add a slight rounded rect background for the app icon appearance
const iosIconSvg = (size) => {
  const pad = Math.round(size * 0.16);
  const inner = size - pad * 2;
  const r = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#F4CC00"/>
  <g transform="translate(${pad}, ${pad}) scale(${inner / 100})">
    <ellipse cx="52" cy="62" rx="34" ry="26" fill="white"/>
    <circle cx="22" cy="36" r="18" fill="white"/>
    <ellipse cx="34" cy="50" rx="14" ry="16" fill="white"/>
    <ellipse cx="5" cy="36" rx="10" ry="6" fill="white"/>
    <ellipse cx="84" cy="50" rx="10" ry="14" fill="white" transform="rotate(-20 84 50)"/>
    <circle cx="17" cy="31" r="3.5" fill="#F4CC00"/>
    <ellipse cx="54" cy="58" rx="22" ry="10" fill="rgba(0,0,0,0.06)" transform="rotate(-8 54 58)"/>
  </g>
</svg>`;
};

async function gen(svgStr, outPath) {
  const buf = Buffer.from(svgStr);
  await sharp(buf).png().toFile(outPath);
  console.log("✓", outPath);
}

await gen(iosIconSvg(180), "public/apple-touch-icon.png");
await gen(duckSvg(192),    "public/icon-192.png");
await gen(duckSvg(512),    "public/icon-512.png");
await gen(duckSvg(32),     "public/favicon-32.png");
console.log("Icons generated.");
