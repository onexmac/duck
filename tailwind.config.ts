import type { Config } from "tailwindcss";

const config: Config = {
  // Enable class-based dark mode (dark: on <html>)
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── shadcn/ui color layer (HSL-based CSS vars) ──────────────────────
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // ─── Design-token semantic layer (hex CSS vars from Style Dictionary) ─
        "bg-page":        "var(--color-bg-page)",
        "bg-surface":     "var(--color-bg-surface)",
        "bg-elevated":    "var(--color-bg-elevated)",
        "bg-subtle":      "var(--color-bg-subtle)",
        "bg-inverse":     "var(--color-bg-inverse)",

        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted":     "var(--color-text-muted)",
        "text-inverse":   "var(--color-text-inverse)",
        "text-link":      "var(--color-text-link)",
        "text-danger":    "var(--color-text-danger)",
        "text-success":   "var(--color-text-success)",
        "text-warning":   "var(--color-text-warning)",

        "border-default": "var(--color-border-default)",
        "border-strong":  "var(--color-border-strong)",
        "border-subtle":  "var(--color-border-subtle)",
        "border-focus":   "var(--color-border-focus)",

        "interactive-primary":       "var(--color-interactive-primary)",
        "interactive-primary-hover": "var(--color-interactive-primary-hover)",
        "interactive-primary-text":  "var(--color-interactive-primary-text)",
        "interactive-secondary":     "var(--color-interactive-secondary)",
        "interactive-secondary-hover": "var(--color-interactive-secondary-hover)",
        "interactive-secondary-text":  "var(--color-interactive-secondary-text)",

        "feedback-success":    "var(--color-feedback-success)",
        "feedback-success-bg": "var(--color-feedback-success-bg)",
        "feedback-warning":    "var(--color-feedback-warning)",
        "feedback-warning-bg": "var(--color-feedback-warning-bg)",
        "feedback-error":      "var(--color-feedback-error)",
        "feedback-error-bg":   "var(--color-feedback-error-bg)",
        "feedback-info":       "var(--color-feedback-info)",
        "feedback-info-bg":    "var(--color-feedback-info-bg)",
      },

      // ─── Border-radius ────────────────────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "token-sm":  "var(--radius-sm)",
        "token-md":  "var(--radius-md)",
        "token-lg":  "var(--radius-lg)",
        "token-xl":  "var(--radius-xl)",
        "token-2xl": "var(--radius-2xl)",
        "token-full":"var(--radius-full)",
      },

      // ─── Spacing (design tokens) ──────────────────────────────────────────
      spacing: {
        "token-0":  "var(--space-0)",
        "token-1":  "var(--space-1)",
        "token-2":  "var(--space-2)",
        "token-3":  "var(--space-3)",
        "token-4":  "var(--space-4)",
        "token-5":  "var(--space-5)",
        "token-6":  "var(--space-6)",
        "token-8":  "var(--space-8)",
        "token-10": "var(--space-10)",
        "token-12": "var(--space-12)",
        "token-16": "var(--space-16)",
        "token-20": "var(--space-20)",
        "token-24": "var(--space-24)",
        "token-32": "var(--space-32)",
      },

      // ─── Motion / animation tokens ────────────────────────────────────────
      transitionDuration: {
        "token-instant": "var(--motion-duration-instant)",
        "token-fast":    "var(--motion-duration-fast)",
        "token-normal":  "var(--motion-duration-normal)",
        "token-slow":    "var(--motion-duration-slow)",
        "token-slower":  "var(--motion-duration-slower)",
        "token-slowest": "var(--motion-duration-slowest)",
      },
      transitionTimingFunction: {
        "token-linear":     "var(--motion-easing-linear)",
        "token-ease-in":    "var(--motion-easing-ease-in)",
        "token-ease-out":   "var(--motion-easing-ease-out)",
        "token-ease-in-out":"var(--motion-easing-ease-in-out)",
        "token-spring":     "var(--motion-easing-spring)",
        "token-bounce":     "var(--motion-easing-bounce)",
      },
    },
  },
  plugins: [],
};

export default config;
