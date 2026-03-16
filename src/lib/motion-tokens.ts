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

// ─── Pre-composed transitions ─────────────────────────────────────────────────
export const transition = {
  /** Subtle opacity fade */
  fade: {
    duration: duration.fast,
    ease: easing.easeInOut,
  },

  /** Slide up into place */
  slideUp: {
    duration: duration.normal,
    ease: easing.easeOut,
  },

  /** Slide down out of view */
  slideDown: {
    duration: duration.normal,
    ease: easing.easeIn,
  },

  /** Overshoot spring pop */
  pop: {
    duration: duration.slow,
    ease: easing.spring,
  },

  /** Snappy scale */
  scale: {
    duration: duration.fast,
    ease: easing.spring,
  },

  /** Page-level transitions */
  page: {
    duration: duration.slow,
    ease: easing.easeInOut,
  },
} as const;

export type Duration   = typeof duration;
export type Easing     = typeof easing;
export type Transition = typeof transition;
