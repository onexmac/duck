/**
 * GoPato Figma icon assets — file NbNiRiH3IEkE2BuYkmSQzM
 * Fetched 2026-03-19. Figma MCP assets expire after 7 days.
 *
 * Nav icons are saved as static files in /public/icons/ (run `npm run fetch-icons`).
 * Service/brand icons reference Figma URLs directly (used in img tags, expire in 7d).
 */

// ── Navigation icons (static — downloaded to /public/icons/) ────────────────
// These need color control via CSS mask-image, so they live as local PNGs.
export const NAV_ICONS = {
  home:   "/icons/nav-home.png",
  chat:   "/icons/nav-chat.png",
  orders: "/icons/nav-orders.png",
  avatar: "/icons/nav-avatar.png",
} as const;

// ── Brand ────────────────────────────────────────────────────────────────────
export const BRAND_ICONS = {
  // Duck has two composited layers
  duckLayer1: "https://www.figma.com/api/mcp/asset/82a44129-08c4-407f-b6c4-2aae954ed123",
  duckLayer2: "https://www.figma.com/api/mcp/asset/b42fc228-9715-476a-b5d6-86b48205a142",
} as const;

// ── Service category icons ───────────────────────────────────────────────────
export const SERVICE_ICONS = {
  clean:  "https://www.figma.com/api/mcp/asset/2c8a6060-5c3b-4fbb-8741-6f8742734e2b",
  pet:    "https://www.figma.com/api/mcp/asset/f80ab9dd-7b13-4ddc-b61f-5b7aa7faccbb",
  gift:   "https://www.figma.com/api/mcp/asset/7fb8d2fd-1c14-4041-b623-d37f25ece70e",
  bread:  "https://www.figma.com/api/mcp/asset/fc3c3dde-8390-4b4d-8ee5-f2d654ace7d1",
  drinks: "https://www.figma.com/api/mcp/asset/af5e5333-a0c0-450b-9e79-2788aabe97f4",
  slice:  "https://www.figma.com/api/mcp/asset/fca4eacf-1f2b-431d-aa52-fead80b9f2a0",
  orange: "https://www.figma.com/api/mcp/asset/3730782e-61d6-417e-ae62-d3bacfadb3b1",
} as const;

// ── Figma source URLs (for re-fetching via scripts/fetch-icons.mjs) ──────────
export const FIGMA_SOURCE = {
  fileKey: "NbNiRiH3IEkE2BuYkmSQzM",
  nodes: {
    duck:   "251:1927",
    home:   "850:5",
    chat:   "251:1904",
    avatar: "251:1915",
    orders: "5087:30",
  },
} as const;
