/**
 * Duck Design System — demo page
 *
 * Showcases the full pipeline:
 *   Figma Variables → Tokens Studio JSON → Style Dictionary →
 *   CSS vars + Tailwind + TS tokens → shadcn/ui + Motion + dnd-kit
 */

import { ThemeToggle } from "@/components/ThemeToggle";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { SwatchGroup } from "@/components/TokenSwatch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Layers, Palette, Zap, Move } from "lucide-react";

// ─── Token colour swatches data ───────────────────────────────────────────────
const BG_SWATCHES = [
  { cssVar: "--color-bg-page",     label: "bg-page",     textDark: true  },
  { cssVar: "--color-bg-surface",  label: "bg-surface",  textDark: true  },
  { cssVar: "--color-bg-elevated", label: "bg-elevated", textDark: true  },
  { cssVar: "--color-bg-subtle",   label: "bg-subtle",   textDark: true  },
  { cssVar: "--color-bg-inverse",  label: "bg-inverse"                   },
];

const TEXT_SWATCHES = [
  { cssVar: "--color-text-primary",   label: "text-primary"   },
  { cssVar: "--color-text-secondary", label: "text-secondary" },
  { cssVar: "--color-text-muted",     label: "text-muted"     },
  { cssVar: "--color-text-link",      label: "text-link"      },
  { cssVar: "--color-text-danger",    label: "text-danger"    },
  { cssVar: "--color-text-success",   label: "text-success"   },
];

const INTERACTIVE_SWATCHES = [
  { cssVar: "--color-interactive-primary",       label: "interactive-primary"       },
  { cssVar: "--color-interactive-primary-hover", label: "interactive-primary-hover" },
  { cssVar: "--color-interactive-secondary",     label: "interactive-secondary", textDark: true },
  { cssVar: "--color-interactive-secondary-hover", label: "interactive-secondary-hover", textDark: true },
];

const FEEDBACK_SWATCHES = [
  { cssVar: "--color-feedback-success",    label: "feedback-success"    },
  { cssVar: "--color-feedback-success-bg", label: "feedback-success-bg", textDark: true },
  { cssVar: "--color-feedback-warning",    label: "feedback-warning"    },
  { cssVar: "--color-feedback-warning-bg", label: "feedback-warning-bg", textDark: true },
  { cssVar: "--color-feedback-error",      label: "feedback-error"      },
  { cssVar: "--color-feedback-error-bg",   label: "feedback-error-bg",  textDark: true },
];

// ─── Pipeline step cards ──────────────────────────────────────────────────────
const PIPELINE = [
  {
    icon: Layers,
    step: "01",
    title: "Figma Variables",
    description: "Collections 1–4 defined in Figma: Primitive, Semantic, Dark, Motion.",
    badge: "figma",
  },
  {
    icon: Palette,
    step: "02",
    title: "Style Dictionary",
    description: "Tokens Studio JSON → CSS vars, Tailwind extension, and TS token object.",
    badge: "build:tokens",
  },
  {
    icon: Zap,
    step: "03",
    title: "shadcn/ui + Tailwind",
    description: "Components reference CSS vars. Dark mode = .dark class on <html>.",
    badge: "zero changes",
  },
  {
    icon: Move,
    step: "04",
    title: "Motion + dnd-kit",
    description: "Duration and easing flow from token JSON into animated React components.",
    badge: "motion tokens",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-page">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border-default bg-bg-surface/80 backdrop-blur supports-[backdrop-filter]:bg-bg-surface/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight text-text-primary">
              🦆 Duck System
            </span>
            <Badge variant="info">v0.1</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/design-system" className="hidden sm:block text-sm font-medium text-text-link hover:text-text-primary transition-colors">
              Design System
            </Link>
            <Link href="/gopato" className="hidden sm:block text-sm font-medium text-text-muted hover:text-text-primary transition-colors">
              GoPato
            </Link>
            <Badge variant="outline" className="hidden md:flex font-mono text-xs">
              build:tokens ✓
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 space-y-20">

        {/* ── App Launcher ───────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">Apps</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/gopato"
              className="group flex items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-4 hover:border-interactive-primary hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl">🥔</span>
              <div>
                <p className="font-semibold text-text-primary group-hover:text-interactive-primary transition-colors">GoPato</p>
                <p className="text-xs text-text-muted">Mobile app prototype</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-text-muted group-hover:text-interactive-primary transition-colors" />
            </Link>
            <Link
              href="/design-system"
              className="group flex items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-4 hover:border-interactive-primary hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl">🎨</span>
              <div>
                <p className="font-semibold text-text-primary group-hover:text-interactive-primary transition-colors">Design System</p>
                <p className="text-xs text-text-muted">Tokens, components & docs</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-text-muted group-hover:text-interactive-primary transition-colors" />
            </Link>
          </div>
        </section>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Figma → Tokens → Code
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            A fully automated design token pipeline. Figma Variables export via Tokens Studio,
            transform with Style Dictionary, and flow into shadcn/ui, Tailwind, and Motion — with
            drag-and-drop powered by dnd-kit.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild>
              <Link href="/design-system">
                Design System <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/gopato">GoPato Prototype</Link>
            </Button>
            <Button variant="secondary">View tokens</Button>
          </div>
        </section>

        {/* ── Pipeline overview ──────────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">Pipeline</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE.map(({ icon: Icon, step, title, description, badge }) => (
              <Card key={step} className="hover:shadow-md transition-shadow duration-token-normal">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">{step}</span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Icon className="h-4 w-4 text-interactive-primary" />
                    <CardTitle className="text-sm">{title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Kanban board (dnd-kit) ─────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">
              Kanban Board
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Drag cards between columns — powered by{" "}
              <code className="rounded bg-bg-subtle px-1 py-0.5 text-xs font-mono">
                @dnd-kit/react
              </code>{" "}
              +{" "}
              <code className="rounded bg-bg-subtle px-1 py-0.5 text-xs font-mono">
                motion
              </code>
              . All colours adapt to dark mode automatically.
            </p>
          </div>
          <KanbanBoard />
        </section>

        {/* ── Design token swatches ──────────────────────────────────────────── */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-text-primary">
            Design Tokens
          </h2>
          <p className="text-sm text-text-secondary -mt-4">
            Generated by Style Dictionary from{" "}
            <code className="rounded bg-bg-subtle px-1 py-0.5 text-xs font-mono">
              tokens/02-semantic.json
            </code>
            . Toggle dark mode above to see the{" "}
            <code className="rounded bg-bg-subtle px-1 py-0.5 text-xs font-mono">
              tokens/03-dark.json
            </code>{" "}
            layer swap in real time.
          </p>

          <SwatchGroup title="Background" swatches={BG_SWATCHES} />
          <SwatchGroup title="Text" swatches={TEXT_SWATCHES} />
          <SwatchGroup title="Interactive" swatches={INTERACTIVE_SWATCHES} />
          <SwatchGroup title="Feedback" swatches={FEEDBACK_SWATCHES} />
        </section>

        {/* ── Button variants ────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">Components</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Button</CardTitle>
              <CardDescription>
                All variants derive colour from{" "}
                <code className="rounded bg-bg-subtle px-1 py-0.5 text-xs font-mono">
                  --color-interactive-*
                </code>{" "}
                CSS vars. Dark mode is automatic.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </CardContent>
          </Card>
        </section>

        {/* ── Motion token callout ───────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-text-primary">
            Motion Tokens
          </h2>
          <Card>
            <CardContent className="pt-6">
              <pre className="overflow-x-auto rounded-lg bg-bg-subtle p-4 text-xs text-text-primary font-mono leading-relaxed">
{`// src/lib/motion-tokens.ts  — generated from tokens/04-motion.json

import { duration, easing, transition } from "@/lib/motion-tokens";

<motion.div
  animate={{ opacity: 1, y: 0 }}
  transition={transition.slideUp}   // { duration: 0.2, ease: [0,0,0.2,1] }
/>

// Duration values (seconds, ready for Framer Motion)
duration.fast    // 0.1s  ← token: 100ms
duration.normal  // 0.2s  ← token: 200ms
duration.slow    // 0.3s  ← token: 300ms

// Easing arrays [x1, y1, x2, y2]
easing.spring    // [0.34, 1.56, 0.64, 1]
easing.easeOut   // [0, 0, 0.2, 1]`}
              </pre>
            </CardContent>
          </Card>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border-default mt-20 py-8 text-center text-xs text-text-muted">
        <p>
          Duck System ·{" "}
          <code>Figma Variables → Tokens Studio → Style Dictionary → shadcn/ui + Tailwind + Motion + dnd-kit</code>
        </p>
      </footer>
    </div>
  );
}
