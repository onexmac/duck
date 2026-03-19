/**
 * motion-tokens.ts
 *
 * Bridges the Style Dictionary token object to Framer Motion / Motion
 * animation values. Import these in animated components instead of
 * hard-coding durations and easings.
 *
 * Usage:
 *   import { duration, easing, transition } from "@/lib/motion-tokens";
 *
 *   <motion.div
 *     animate={{ opacity: 1, y: 0 }}
 *     transition={transition.slideUp}
 *   />
 */

// Framer Motion expects duration in SECONDS, tokens store ms.
const ms = (milliseconds: number) => milliseconds / 1000;

// ─── Duration (seconds) ───────────────────────────────────────────────────────
export const duration = {
  instant: ms(0),
  fast:    ms(100),
  normal:  ms(200),
  slow:    ms(300),
  slower:  ms(500),
  slowest: ms(1000),
} as const;

// ─── Easing (Framer Motion accepts [x1, y1, x2, y2] arrays) ─────────────────
export const easing = {
  linear:    [0, 0, 1, 1]            as [number, number, number, number],
  easeIn:    [0.4, 0, 1, 1]          as [number, number, number, number],
  easeOut:   [0, 0, 0.2, 1]          as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1]        as [number, number, number, number],
  spring:    [0.34, 1.56, 0.64, 1]   as [number, number, number, number],
  bounce:    [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

// ─── Spring presets (Things 3 feel — use these on all interactive elements) ───
// See CLAUDE.md for the interaction model and when to use each.
export const spring = {
  /** Snappy — buttons, checkboxes, day selection, nav items */
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  /** Press feedback — immediate response on pointerDown (stiffest) */
  press:  { type: "spring", stiffness: 600, damping: 35 },
  /** Panel — bottom sheets, sidebars, drawers */
  panel:  { type: "spring", stiffness: 280, damping: 26 },
  /** Heavy — completed-task settle, drag-drop landing */
  heavy:  { type: "spring", stiffness: 200, damping: 40 },
} as const;

// ─── Pre-composed transitions ─────────────────────────────────────────────────
export const transition = {
  /** Subtle opacity fade */
  fade: {
    duration: duration.fast,
    ease: easing.easeInOut,
  },

  /** Slide up into place — spring */
  slideUp: { type: "spring", stiffness: 340, damping: 28 },

  /** Slide down out of view — spring */
  slideDown: { type: "spring", stiffness: 340, damping: 28 },

  /** Overshoot spring pop */
  pop: { type: "spring", stiffness: 420, damping: 22 },

  /** Snappy scale */
  scale: { type: "spring", stiffness: 500, damping: 30 },

  /** Page-level / nav transitions — panel spring */
  page: { type: "spring", stiffness: 280, damping: 26 },
} as const;

export type Duration   = typeof duration;
export type Easing     = typeof easing;
export type Transition = typeof transition;
