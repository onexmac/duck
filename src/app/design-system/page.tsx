"use client";
/**
 * Duck System — Design System Showcase
 * Faithfully built from Figma Duck System (NbNiRiH3IEkE2BuYkmSQzM, node 0:1)
 *
 * Figma data sourced via MCP get_metadata + get_design_context:
 *   Quarks (8:0)    → 9 brand colors
 *   Text (3412:0)   → Roboto type scale (28/20/16/14px)
 *   Buttons (250:624) → 7 variants (Primary/Default/Success/Dismiss/Warning/Danger/Naked)
 *   Forms (3202:3523) → Input, Select, Checkbox, Day picker
 *   Cards (1625:11) → 5 card types, shadows
 *   Layout (1635:2507) → Status bar, Nav, Modal shells
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WeekCalendar } from "@/components/gopato/WeekCalendar";
import { SegmentedControl } from "@/components/ui/segmented-control";

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="border-b pb-3" style={{ borderColor: "var(--color-border-default)" }}>
        <h2 className="text-xl font-bold" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ children, align = "start" }: { children: React.ReactNode; align?: string }) {
  return <div className={`flex flex-wrap items-${align} gap-3`}>{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────
// Color swatch — Figma Quarks style
// ─────────────────────────────────────────
function Swatch({ cssVar, name, figmaName }: { cssVar: string; name: string; figmaName?: string }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[80px]">
      <div
        className="h-16 rounded-lg border border-black/5 shadow-sm"
        style={{ background: `var(${cssVar})` }}
      />
      <div>
        <p className="text-xs font-medium leading-tight" style={{ color: "var(--color-text-primary)" }}>
          {name}
        </p>
        {figmaName && (
          <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            {figmaName}
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Figma type specimen (from node 3412:0)
// ─────────────────────────────────────────
function TypeSpecimen() {
  const styles = [
    { name: "Header 1", weight: "500", size: "28px", tracking: "0.3px", lineHeight: "110%", sample: "Schedule a visit" },
    { name: "Header 2", weight: "500", size: "20px", tracking: "0.3px", lineHeight: "100%", sample: "Home Appointment" },
    { name: "Header 3", weight: "700", size: "16px", tracking: "0.3px", lineHeight: "110%", allCaps: true, sample: "Services" },
    { name: "Header 4", weight: "700", size: "16px", tracking: "0.3px", lineHeight: "100%", sample: "Monday February 11th" },
    { name: "Action", weight: "500", size: "16px", tracking: "0.6px", lineHeight: "80%", sample: "CONFIRM BOOKING" },
    { name: "Standard Text", weight: "400", size: "16px", tracking: "0.016px", lineHeight: "120%", sample: "Your home cleaning service is scheduled for Monday morning at 9:00 AM." },
    { name: "Subtitles", weight: "400", size: "14px", tracking: "0.3px", lineHeight: "110%", sample: "No services available on Sundays" },
    { name: "Quote", weight: "400", size: "14px", tracking: "0.3px", lineHeight: "100%", italic: true, sample: "\"Great service, highly recommended!\"" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {styles.map(({ name, weight, size, tracking, lineHeight, allCaps, italic, sample }) => (
        <div key={name} className="flex items-baseline gap-6">
          <div className="w-32 shrink-0">
            <p className="text-[10px] font-medium" style={{ color: "var(--color-text-muted)", fontFamily: "monospace" }}>
              {name}
            </p>
            <p className="text-[10px]" style={{ color: "var(--color-text-muted)", fontFamily: "monospace" }}>
              {size} / {weight}
            </p>
          </div>
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: size,
              fontWeight: weight,
              letterSpacing: tracking,
              lineHeight,
              textTransform: allCaps ? "uppercase" : undefined,
              fontStyle: italic ? "italic" : undefined,
              color: "var(--color-text-primary)",
            }}
          >
            {sample}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// Card specimens (from Figma node 1625:11)
// ─────────────────────────────────────────
function CardSpecimens() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* List Card */}
      <div
        className="rounded-[18px] p-4"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-bold text-[16px] leading-tight" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)" }}>
              Home Appointment
            </p>
            <p className="text-[14px] mt-0.5" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-secondary)" }}>
              Monday February 11th, Morning
            </p>
          </div>
          <Button variant="success" size="sm">Confirm</Button>
        </div>
        <div className="flex gap-3 mt-4">
          {[
            { bg: "var(--color-brand-yellow)", emoji: "🧹" },
            { bg: "var(--color-brand-red)", emoji: "♻️" },
            { bg: "#8ad1e1", emoji: "🐾" },
            { bg: "var(--color-brand-blue)", emoji: "⚡" },
          ].map(({ bg, emoji }, i) => (
            <div
              key={i}
              className="h-12 w-12 rounded-[14px] flex items-center justify-center text-xl"
              style={{ backgroundColor: bg, boxShadow: "0px 1px 2px rgba(0,0,0,0.08)" }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Order Card */}
      <div
        className="rounded-[18px] p-4 flex items-center gap-4"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0px 1px 6px rgba(180,212,228,0.3)",
        }}
      >
        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: "var(--color-brand-yellow)" }}
        >
          🦆
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[14px] leading-tight truncate" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)" }}>
            Order #4892
          </p>
          <p className="text-[13px]" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-secondary)" }}>
            Ana García · Cleaning
          </p>
          <Progress value={60} size="sm" className="mt-2" />
        </div>
        <p className="font-bold text-[16px] shrink-0" style={{ color: "var(--color-text-primary)" }}>
          $17.000
        </p>
      </div>

      {/* Site Card with blue accent */}
      <div
        className="rounded-[18px] overflow-hidden flex"
        style={{
          background: "var(--color-bg-surface)",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div className="w-1.5 shrink-0" style={{ background: "var(--color-brand-blue)" }} />
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="info">In Process</Badge>
            <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>#4892</span>
          </div>
          <p className="font-medium text-[14px]" style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)" }}>
            Dry Cleaning
          </p>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--color-text-secondary)" }}>3 items · Ready Fri</p>
          <div className="flex gap-2 mt-3">
            <Button variant="primary" size="sm">View</Button>
            <Button variant="dismiss" size="sm">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Form specimen (from Figma node 3202:3523)
// ─────────────────────────────────────────
function FormSpecimen() {
  const [checked, setChecked] = useState(false);
  const [toggle, setToggle] = useState(true);
  const days = ["D", "L", "K", "M", "J", "V", "S"];
  const [activeDay, setActiveDay] = useState("L");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
      <Input label="Full name" placeholder="Ana García" hint="As it appears on your ID" />
      <Input label="Email" type="email" placeholder="ana@gopato.com" />
      <Select
        label="Service type"
        placeholder="Choose a service…"
        options={[
          { value: "clean", label: "Home Cleaning" },
          { value: "dry", label: "Dry Cleaning" },
          { value: "dog", label: "Dog Walking" },
          { value: "bread", label: "Fresh Bread" },
        ]}
      />
      <Input
        label="Notes"
        placeholder="Any instructions for the team…"
        hint="Optional"
      />

      {/* Day Selector — Figma "Selectors" pattern */}
      <div className="col-span-full">
        <Label>Day Selector</Label>
        <div className="flex gap-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
              style={{
                background: d === activeDay ? "var(--color-brand-blue)" : "var(--color-bg-subtle)",
                color: d === activeDay ? "#fff" : "var(--color-text-primary)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Checker — Figma checkbox/radio pattern */}
      <div className="flex flex-col gap-3">
        <Label>Checker</Label>
        <Checkbox label="Morning slot (8–12)" description="Available Mon–Sat" defaultChecked />
        <Checkbox label="Afternoon slot (13–18)" description="Available Mon–Fri" />
        <Checkbox label="Weekend slots" disabled />
      </div>

      <div className="flex flex-col gap-3">
        <Label>Toggles</Label>
        <Toggle checked={toggle} onChange={setToggle} label="Push notifications" description="Appointment reminders" />
        <Toggle checked={checked} onChange={setChecked} label="SMS alerts" description="Day-of reminders" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Motion demos
// ─────────────────────────────────────────
function MotionDemos() {
  const [play, setPlay] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-6 items-end">
        {[
          { label: "Spring Pop", color: "var(--color-brand-yellow)", animate: { scale: play ? 1.2 : 0.85 }, transition: { type: "spring", stiffness: 400, damping: 20 } },
          { label: "Ease Out", color: "var(--color-brand-blue)", animate: { y: play ? -16 : 0, opacity: play ? 1 : 0.4 }, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
          { label: "Bounce", color: "var(--color-brand-red)", animate: { rotate: play ? 180 : 0 }, transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] } },
          { label: "Slide", color: "var(--color-interactive-primary)", animate: { x: play ? 24 : 0 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
        ].map(({ label, color, animate, transition }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <motion.div
              className="h-12 w-12 rounded-xl"
              style={{ backgroundColor: color }}
              animate={animate}
              transition={transition as never}
            />
            <Label>{label}</Label>
          </div>
        ))}
      </div>
      <Button variant="default" size="sm" onClick={() => setPlay((v) => !v)} className="self-start normal-case tracking-normal text-[13px]">
        {play ? "Reset" : "Play"} animations
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────
// Layout shells (from Figma node 1635:2507)
// ─────────────────────────────────────────
function LayoutShells() {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Status bar */}
      <div className="flex flex-col gap-2">
        <Label>Status Bar</Label>
        <div
          className="flex items-center justify-between px-4 h-11 rounded-xl w-64 text-white text-sm font-medium"
          style={{ background: "var(--color-bg-inverse)" }}
        >
          <span style={{ fontFamily: "Roboto, sans-serif" }}>9:41</span>
          <div className="flex items-center gap-1 text-xs">
            <span>●●●</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex flex-col gap-2">
        <Label>Navigation Tabs</Label>
        <div
          className="flex gap-1 p-1 rounded-xl w-72"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          {["Agendadas", "Previas"].map((t, i) => (
            <div
              key={t}
              className="flex-1 py-2 text-center rounded-lg text-[12px] font-medium uppercase tracking-wider"
              style={{
                background: i === 0 ? "var(--color-brand-blue)" : "transparent",
                color: i === 0 ? "#fff" : "var(--color-text-secondary)",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* PopUp Header */}
      <div className="flex flex-col gap-2">
        <Label>PopUp Header</Label>
        <div
          className="flex items-center px-4 h-12 rounded-xl w-64 gap-3"
          style={{ background: "var(--color-bg-surface)", boxShadow: "0px 1px 6px rgba(180,212,228,0.3)" }}
        >
          <button className="text-[var(--color-brand-blue)]">←</button>
          <p
            className="flex-1 text-center font-medium"
            style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)", fontSize: "16px" }}
          >
            Title Header
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main page
// ─────────────────────────────────────────
export default function DesignSystemPage() {
  const [calWeekOffset, setCalWeekOffset] = useState(0);
  const [calActiveDate, setCalActiveDate] = useState(13); // Thursday
  const [segmentedTab1, setSegmentedTab1] = useState("recents");
  const [segmentedTab2, setSegmentedTab2] = useState("agendadas");

  const tabContent = {
    pipeline: (
      <div
        className="p-4 rounded-xl text-sm leading-relaxed"
        style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-secondary)", fontFamily: "Roboto, sans-serif" }}
      >
        <strong style={{ color: "var(--color-text-primary)" }}>Figma → Style Dictionary → React</strong>
        <br />
        Figma Variables (4 collections) are exported via Tokens Studio to JSON.
        Style Dictionary v4 transforms tokens into CSS custom properties, a Tailwind theme extension,
        and a TypeScript token object. Components reference CSS vars — dark mode is automatic via{" "}
        <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--color-bg-surface)" }}>
          .dark
        </code>{" "}
        on <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--color-bg-surface)" }}>&lt;html&gt;</code>.
      </div>
    ),
    tokens: (
      <pre
        className="p-4 rounded-xl text-xs overflow-auto leading-relaxed"
        style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-secondary)", fontFamily: "ui-monospace, monospace" }}
      >{`/* Figma Quarks → CSS custom properties */
--color-brand-yellow:    #F4CC00;  /* Duck Yellow */
--color-brand-blue:      #4C82EE;  /* BlueBlue */
--color-brand-red:       #F95C5C;  /* RedRed */
--color-brand-very-dark: #2F3644;  /* Very Dark */
--color-brand-notso-dark:#9494AD;  /* Notso Dark */
--color-brand-kinda-gray:#D2D4E4;  /* Kinda Gray */
--color-brand-notso-white:#EBEDF2; /* Notso White */
--color-brand-kinda-white:#F4F4F4; /* Kinda White */

/* Interactive (Button) variants */
--color-interactive-primary:         #4C82EE; /* Primary btn */
--color-interactive-success:         #F4CC00; /* Success btn */
--color-interactive-danger:          #F95C5C; /* Danger btn */`}</pre>
    ),
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--color-bg-page)", fontFamily: "Roboto, sans-serif" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--color-bg-surface)",
          borderColor: "var(--color-border-default)",
          boxShadow: "0px 1px 6px rgba(180,212,228,0.3)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦆</span>
            <div>
              <h1
                className="text-[20px] font-medium leading-tight"
                style={{ fontFamily: "Roboto, sans-serif", color: "var(--color-text-primary)", letterSpacing: "0.3px" }}
              >
                Duck System
              </h1>
              <p className="text-[12px]" style={{ color: "var(--color-text-secondary)" }}>
                Figma → Style Dictionary → React · node 0:1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info">v1.0</Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-14">

        {/* Overview */}
        <Section title="Overview" subtitle="Design token pipeline: Figma Quarks → Style Dictionary → React components.">
          <Tabs
            tabs={[
              { id: "pipeline", label: "Pipeline", content: tabContent.pipeline },
              { id: "tokens", label: "CSS Tokens", content: tabContent.tokens },
            ]}
          />
        </Section>

        {/* Quarks — Figma node 8:0 */}
        <Section title="Quarks — Color Palette" subtitle="9 base colors from Figma node 8:0. 60% and 30% opacity variants allowed.">
          <div>
            <Label>Brand Palette</Label>
            <Row>
              <Swatch cssVar="--color-brand-yellow" name="Duck Yellow" figmaName="#F4CC00" />
              <Swatch cssVar="--color-brand-blue" name="BlueBlue" figmaName="#4C82EE" />
              <Swatch cssVar="--color-brand-red" name="RedRed" figmaName="#F95C5C" />
              <Swatch cssVar="--color-brand-very-dark" name="Very Dark" figmaName="#2F3644" />
              <Swatch cssVar="--color-brand-notso-dark" name="Notso Dark" figmaName="#9494AD" />
              <Swatch cssVar="--color-brand-kinda-gray" name="Kinda Gray" figmaName="#D2D4E4" />
              <Swatch cssVar="--color-brand-notso-white" name="Notso White" figmaName="#EBEDF2" />
              <Swatch cssVar="--color-brand-kinda-white" name="Kinda White" figmaName="#F4F4F4" />
              <Swatch cssVar="--color-bg-inverse" name="Black" figmaName="#2F3644" />
            </Row>
          </div>
          <div>
            <Label>Semantic Backgrounds</Label>
            <Row>
              <Swatch cssVar="--color-bg-page" name="Page" />
              <Swatch cssVar="--color-bg-surface" name="Surface" />
              <Swatch cssVar="--color-bg-elevated" name="Elevated" />
              <Swatch cssVar="--color-bg-subtle" name="Subtle" />
            </Row>
          </div>
          <div>
            <Label>Feedback States</Label>
            <Row>
              <Swatch cssVar="--color-feedback-success-bg" name="Success BG" />
              <Swatch cssVar="--color-feedback-warning-bg" name="Warning BG" />
              <Swatch cssVar="--color-feedback-error-bg" name="Error BG" />
              <Swatch cssVar="--color-feedback-info-bg" name="Info BG" />
            </Row>
          </div>
        </Section>

        {/* Text — Figma node 3412:0 */}
        <Section title="Text Styles" subtitle="Figma node 3412:0 · Roboto · 8 named text styles.">
          <Card>
            <CardContent className="pt-6 overflow-x-auto">
              <TypeSpecimen />
            </CardContent>
          </Card>
        </Section>

        {/* Buttons — Figma node 250:624 */}
        <Section title="Buttons" subtitle="Figma node 250:624 · 7 variants · border-radius 4px · uppercase 12px.">
          <div className="flex flex-col gap-4">
            <div>
              <Label>All 7 Figma variants</Label>
              <Row align="center">
                <div className="flex flex-col items-center gap-1">
                  <Button variant="primary">Primary</Button>
                  <Label>Blue fill</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="default">Default</Button>
                  <Label>Blue outline</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="success">Success</Button>
                  <Label>Yellow fill</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="dismiss">Dismiss</Button>
                  <Label>Muted outline</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="warning">Warning</Button>
                  <Label>Red outline</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="danger">Danger</Button>
                  <Label>Red fill</Label>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button variant="naked">Naked</Button>
                  <Label>Text only</Label>
                </div>
              </Row>
            </div>
            <div>
              <Label>Sizes</Label>
              <Row align="center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="default">Default</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="icon">🦆</Button>
              </Row>
            </div>
            <div>
              <Label>Disabled</Label>
              <Row>
                <Button variant="primary" disabled>Primary</Button>
                <Button variant="success" disabled>Success</Button>
                <Button variant="danger" disabled>Danger</Button>
              </Row>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" subtitle="Status labels using feedback color tokens.">
          <Row align="center">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </Row>
        </Section>

        {/* Avatars */}
        <Section title="Avatars" subtitle="User identity with initials fallback.">
          <Row align="center">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-1">
                <Avatar size={size} fallback="Ana García" />
                <Label>{size.toUpperCase()}</Label>
              </div>
            ))}
          </Row>
        </Section>

        {/* Cards — Figma node 1625:11 */}
        <Section title="Cards" subtitle="Figma node 1625:11 · 5 card types · border-radius 18px · Soft Shadow.">
          <CardSpecimens />
        </Section>

        {/* Forms — Figma node 3202:3523 */}
        <Section title="Forms" subtitle="Figma node 3202:3523 · Input, Select, Selector pills, Day picker, Checker.">
          <FormSpecimen />
        </Section>

        {/* Alerts */}
        <Section title="Alerts" subtitle="Feedback messages using --color-feedback-* tokens.">
          <div className="flex flex-col gap-3 max-w-xl">
            <Alert variant="success">
              <AlertTitle>Booking confirmed!</AlertTitle>
              <AlertDescription>Your home cleaning is scheduled for Monday, Feb 11th at 9:00 AM.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Appointment tomorrow</AlertTitle>
              <AlertDescription>Make sure someone is home between 9–12 AM.</AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>Your card was declined. Please update your payment method.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>Dog walking available</AlertTitle>
              <AlertDescription>A new service is now available in your area. First session free.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* Progress */}
        <Section title="Progress" subtitle="Animated via motion tokens --motion-duration-normal + ease-out.">
          <div className="flex flex-col gap-4 max-w-sm">
            <Progress value={60} label="Booking progress" showValue />
            <Progress value={80} variant="success" label="Profile complete" showValue />
            <Progress value={92} variant="warning" label="Monthly budget" showValue size="lg" />
            <Progress value={25} variant="error" label="Credits left" showValue size="sm" />
          </div>
        </Section>

        {/* Layout shells — Figma node 1635:2507 */}
        <Section title="Layout Shells" subtitle="Figma node 1635:2507 · Status bar, Tab nav, PopUp header.">
          <LayoutShells />
        </Section>

        {/* Icons */}
        <Section title="Icons" subtitle="Navigation and service icons from the GoPato Figma file.">
          <div className="flex flex-col gap-6">
            <div>
              <Label>Mask-image (Gray #B4B8D2)</Label>
              <Row align="center">
                {[
                  { name: "Home", file: "nav-home", w: 22, h: 22 },
                  { name: "Chat", file: "nav-chat", w: 24, h: 22 },
                  { name: "Orders", file: "nav-orders", w: 20, h: 24 },
                  { name: "Avatar", file: "nav-avatar", w: 22, h: 20 },
                ].map(({ name, file, w, h }) => (
                  <div key={file} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: w,
                        height: h,
                        maskImage: `url(/icons/${file}.svg)`,
                        WebkitMaskImage: `url(/icons/${file}.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        backgroundColor: "#B4B8D2",
                      }}
                    />
                    <Label>{name} ({w}&times;{h})</Label>
                  </div>
                ))}
              </Row>
            </div>
            <div>
              <Label>Mask-image (Active Blue #4C82EE)</Label>
              <Row align="center">
                {[
                  { name: "Home", file: "nav-home", w: 22, h: 22 },
                  { name: "Chat", file: "nav-chat", w: 24, h: 22 },
                  { name: "Orders", file: "nav-orders", w: 20, h: 24 },
                  { name: "Avatar", file: "nav-avatar", w: 22, h: 20 },
                ].map(({ name, file, w, h }) => (
                  <div key={file} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: w,
                        height: h,
                        maskImage: `url(/icons/${file}.svg)`,
                        WebkitMaskImage: `url(/icons/${file}.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        backgroundColor: "#4C82EE",
                      }}
                    />
                    <Label>{name} ({w}&times;{h})</Label>
                  </div>
                ))}
              </Row>
            </div>
          </div>
        </Section>

        {/* Week Calendar */}
        <Section title="Week Calendar" subtitle="Interactive week selector with spring press animation. Swipe to navigate weeks.">
          <div
            className="max-w-sm rounded-[18px] p-4"
            style={{
              background: "var(--color-bg-surface)",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <WeekCalendar
              activeDate={calActiveDate}
              onSelect={setCalActiveDate}
              weekOffset={calWeekOffset}
              onWeekChange={setCalWeekOffset}
            />
          </div>
        </Section>

        {/* Segmented Control */}
        <Section title="Segmented Control" subtitle="Draggable tab selector with spring snap. Drag or tap to switch.">
          <div className="flex flex-col gap-6 max-w-sm">
            <div>
              <Label>Recents / Popular</Label>
              <SegmentedControl
                tabs={[
                  { id: "recents", label: "Recents" },
                  { id: "popular", label: "Popular" },
                ]}
                activeTab={segmentedTab1}
                onTabChange={setSegmentedTab1}
              />
            </div>
            <div>
              <Label>Agendadas / Previas</Label>
              <SegmentedControl
                tabs={[
                  { id: "agendadas", label: "Agendadas" },
                  { id: "previas", label: "Previas" },
                ]}
                activeTab={segmentedTab2}
                onTabChange={setSegmentedTab2}
              />
            </div>
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Spacing Scale" subtitle="4px base · --space-* tokens">
          <Row align="end">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1">
                <div
                  className="rounded"
                  style={{
                    width: `var(--space-${n})`,
                    height: `var(--space-${n})`,
                    background: "var(--color-brand-blue)",
                  }}
                />
                <Label>{n}</Label>
              </div>
            ))}
          </Row>
        </Section>

        {/* Border radius */}
        <Section title="Border Radius" subtitle="--radius-* tokens · Buttons use 4px (sm) · Cards use 18px (≈ 2xl)">
          <Row align="center">
            {(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const).map((r) => (
              <div key={r} className="flex flex-col items-center gap-1">
                <div
                  className="h-12 w-12 border-2"
                  style={{
                    borderRadius: `var(--radius-${r})`,
                    borderColor: "var(--color-brand-blue)",
                    background: "var(--color-brand-yellow-tint)",
                  }}
                />
                <Label>{r}</Label>
              </div>
            ))}
          </Row>
        </Section>

        {/* Motion */}
        <Section title="Motion Tokens" subtitle="--motion-duration-* and --motion-easing-* from tokens/04-motion.json">
          <MotionDemos />
        </Section>

      </main>
    </div>
  );
}
