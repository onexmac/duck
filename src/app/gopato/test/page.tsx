"use client";

import { useState } from "react";
import Link from "next/link";
import { StatusBar } from "@/components/gopato/StatusBar";
import { WeekCalendar } from "@/components/gopato/WeekCalendar";
import { StateSection, type GoPatoState } from "@/components/gopato/StateSection";
import { BottomNav } from "@/components/gopato/BottomNav";
import { ServiceList } from "@/components/gopato/ServiceList";
import { Badge } from "@/components/ui/badge";

const STATES: GoPatoState[] = [
  "empty", "sunday", "appointment", "missed", "extra", "confirmed", "rate",
];

const WEEK_DATES = [10, 11, 12, 13, 14, 15, 16];

export default function GoPatoTestPage() {
  const [activeState, setActiveState] = useState<GoPatoState>("appointment");
  const [activeDate, setActiveDate] = useState(13);

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border-default bg-bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-text-muted hover:text-text-primary transition-colors">Duck System</Link>
            <span className="text-text-muted">/</span>
            <Link href="/gopato" className="text-text-muted hover:text-text-primary transition-colors">GoPato</Link>
            <span className="text-text-muted">/</span>
            <span className="font-semibold text-text-primary">Test</span>
          </div>
          <Badge variant="warning">playground</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        <h1 className="text-2xl font-bold text-text-primary">Component Test Playground</h1>

        {/* ── StatusBar ─────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">StatusBar</h2>
          <div className="rounded-xl overflow-hidden w-[375px] border border-border-default">
            <div style={{ background: "#fafafa" }}>
              <StatusBar />
            </div>
          </div>
        </section>

        {/* ── WeekCalendar ──────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">WeekCalendar</h2>
          <div className="flex gap-2 flex-wrap mb-2">
            {WEEK_DATES.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDate(d)}
                className="px-3 py-1 rounded-full text-xs border transition-all"
                style={{
                  background: activeDate === d ? "#FFC736" : "transparent",
                  borderColor: activeDate === d ? "#FFC736" : "#e5e7eb",
                  color: activeDate === d ? "#2f3644" : "#6b7280",
                }}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden w-[375px] border border-border-default" style={{ background: "#fafafa" }}>
            <WeekCalendar activeDate={activeDate} onSelect={setActiveDate} weekOffset={0} onWeekChange={() => {}} />
          </div>
        </section>

        {/* ── StateSection ──────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">StateSection</h2>
          <div className="flex gap-2 flex-wrap mb-2">
            {STATES.map((s) => (
              <button
                key={s}
                onClick={() => setActiveState(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={{
                  background: activeState === s ? "#FFC736" : "transparent",
                  borderColor: activeState === s ? "#FFC736" : "#e5e7eb",
                  color: activeState === s ? "#2f3644" : "#6b7280",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden w-[375px] border border-border-default" style={{ background: "#fafafa", padding: "0 0 8px 0" }}>
            <StateSection state={activeState} onAction={() => {}} />
          </div>
          <Badge variant="outline" className="font-mono text-xs">state: {activeState}</Badge>
        </section>

        {/* ── ServiceList ───────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">ServiceList</h2>
          <div className="rounded-xl overflow-hidden w-[375px] border border-border-default" style={{ background: "#fafafa" }}>
            <ServiceList />
          </div>
        </section>

        {/* ── BottomNav ─────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">BottomNav</h2>
          <div className="rounded-xl overflow-hidden w-[375px] border border-border-default relative" style={{ background: "#fafafa", height: 88 }}>
            <BottomNav />
          </div>
        </section>

      </main>
    </div>
  );
}
