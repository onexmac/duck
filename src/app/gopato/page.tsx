import Link from "next/link";
import { ArrowRight, Smartphone, FlaskConical, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SECTIONS = [
  {
    href: "/gopato/prototype",
    icon: Smartphone,
    title: "Home Prototype",
    description: "7 interactive states: empty, sunday, appointment, missed, extra, confirmed, rate.",
    badge: "7 states",
  },
  {
    href: "/gopato/test",
    icon: FlaskConical,
    title: "Component Tests",
    description: "Individual component playground — StatusBar, WeekCalendar, StateSection, BottomNav.",
    badge: "playground",
  },
];

export default function GoPatoPortal() {
  return (
    <div className="min-h-screen bg-bg-page">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border-default bg-bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              ← Duck System
            </Link>
            <span className="text-text-muted">/</span>
            <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
              <span>🥔</span> GoPato
            </span>
          </div>
          <Badge variant="info">Figma node 7486:6775</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 space-y-10">

        {/* Hero */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            GoPato Portal
          </h1>
          <p className="text-text-secondary max-w-xl">
            Mobile app prototype built from the Duck Design System. Select a section below.
          </p>
        </section>

        {/* Nav cards */}
        <section className="grid gap-4 sm:grid-cols-2">
          {SECTIONS.map(({ href, icon: Icon, title, description, badge }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-border-default bg-bg-surface p-5 hover:border-interactive-primary hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-bg-subtle p-2">
                  <Icon className="h-5 w-5 text-interactive-primary" />
                </div>
                <Badge variant="outline" className="text-xs font-mono">{badge}</Badge>
              </div>
              <div>
                <p className="font-semibold text-text-primary group-hover:text-interactive-primary transition-colors">
                  {title}
                </p>
                <p className="text-sm text-text-muted mt-0.5">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-interactive-primary transition-colors self-end" />
            </Link>
          ))}
        </section>

        {/* Quick-link to all states */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">
            Quick links — prototype states
          </h2>
          <div className="flex flex-wrap gap-2">
            {["empty", "sunday", "appointment", "missed", "extra", "confirmed", "rate"].map((s) => (
              <Link
                key={s}
                href={`/gopato/prototype?state=${s}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-border-default bg-bg-surface text-text-secondary hover:border-interactive-primary hover:text-interactive-primary transition-all"
              >
                {s}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
