"use client";
/**
 * Duck System — Design System Showcase
 * Built from Figma Duck System (NbNiRiH3IEkE2BuYkmSQzM, node 0:1)
 *
 * Shows the complete component library powered by the Duck token pipeline:
 *   Figma → Style Dictionary → CSS vars → Tailwind → React components
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

// ─────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h2>
        {description && (
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function Row({ children, wrap = true }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${wrap ? "flex-wrap" : ""}`}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-widest mt-1" style={{ color: "var(--color-text-muted)" }}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────
// Color swatch
// ─────────────────────────────────────────
function Swatch({ cssVar, label, textDark }: { cssVar: string; label: string; textDark?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="h-14 w-24 rounded-xl border border-black/5 shadow-sm"
        style={{ background: `var(${cssVar})` }}
      />
      <p className="text-xs font-medium" style={{ color: "var(--color-text-primary)" }}>{label}</p>
      <p className="text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>{cssVar}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// Typography specimen
// ─────────────────────────────────────────
function TypeSpecimen() {
  const styles = [
    { tag: "h1", cls: "text-5xl font-bold tracking-tight", label: "Display / 48px Bold" },
    { tag: "h2", cls: "text-4xl font-bold tracking-tight", label: "H1 / 36px Bold" },
    { tag: "h3", cls: "text-3xl font-semibold", label: "H2 / 30px Semibold" },
    { tag: "h4", cls: "text-2xl font-semibold", label: "H3 / 24px Semibold" },
    { tag: "h5", cls: "text-xl font-medium", label: "H4 / 20px Medium" },
    { tag: "h6", cls: "text-lg font-medium", label: "H5 / 18px Medium" },
    { tag: "p",  cls: "text-base font-normal leading-relaxed", label: "Body / 16px Regular" },
    { tag: "p",  cls: "text-sm font-normal leading-relaxed", label: "Body SM / 14px Regular" },
    { tag: "p",  cls: "text-xs font-normal", label: "Caption / 12px Regular" },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {styles.map(({ tag, cls, label }, i) => {
        const El = tag as keyof JSX.IntrinsicElements;
        return (
          <div key={i} className="flex items-baseline gap-4">
            <span className="text-[10px] w-36 shrink-0 font-mono" style={{ color: "var(--color-text-muted)" }}>
              {label}
            </span>
            <El className={cls} style={{ color: "var(--color-text-primary)" }}>
              The quick brown fox
            </El>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────
// Motion demo
// ─────────────────────────────────────────
function MotionDemo() {
  const [visible, setVisible] = useState(true);

  const demos = [
    {
      label: "Spring Pop",
      el: (
        <motion.div
          key="spring"
          className="h-12 w-12 rounded-xl"
          style={{ background: "var(--color-interactive-primary)" }}
          animate={{ scale: visible ? 1 : 0.5, opacity: visible ? 1 : 0.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      ),
    },
    {
      label: "Ease Out",
      el: (
        <motion.div
          key="ease"
          className="h-12 w-12 rounded-xl"
          style={{ background: "var(--color-brand-blue)" }}
          animate={{ y: visible ? 0 : -16, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        />
      ),
    },
    {
      label: "Bounce",
      el: (
        <motion.div
          key="bounce"
          className="h-12 w-12 rounded-xl"
          style={{ background: "var(--color-brand-coral)" }}
          animate={{ rotate: visible ? 0 : 180 }}
          transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
        />
      ),
    },
    {
      label: "Teal Slide",
      el: (
        <motion.div
          key="slide"
          className="h-12 w-12 rounded-xl"
          style={{ background: "var(--color-brand-teal)" }}
          animate={{ x: visible ? 0 : 24 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Row>
        {demos.map(({ label, el }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            {el}
            <Label>{label}</Label>
          </div>
        ))}
      </Row>
      <Button variant="secondary" size="sm" onClick={() => setVisible((v) => !v)} className="self-start">
        Toggle animations
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────
// Main page
// ─────────────────────────────────────────
export default function DesignSystemPage() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  const tabContent = {
    overview: (
      <div className="p-4 rounded-xl" style={{ background: "var(--color-bg-subtle)" }}>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Duck System is a multi-brand design token pipeline built on Style Dictionary v4.
          Tokens flow from Figma Variables → JSON → CSS custom properties → Tailwind → React components.
        </p>
      </div>
    ),
    tokens: (
      <div className="p-4 rounded-xl font-mono text-xs overflow-auto" style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-secondary)" }}>
        {`--color-interactive-primary: #FFC736\n--color-text-primary: #2f3644\n--color-text-muted: #9494AD\n--color-text-link: #4c82ee\n--motion-easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`}
      </div>
    ),
    usage: (
      <div className="p-4 rounded-xl font-mono text-xs overflow-auto" style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-secondary)" }}>
        {`import { Button } from "@/components/ui/button";\n\n<Button variant="default">Save changes</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="ghost">Learn more</Button>`}
      </div>
    ),
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--color-bg-surface)",
          borderColor: "var(--color-border-default)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦆</span>
            <div>
              <h1 className="text-lg font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                Duck System
              </h1>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Design System v1.0 · Figma → Style Dictionary → React
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="default">v1.0.0</Badge>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 flex flex-col gap-16">

        {/* Overview tabs */}
        <Section title="Overview" description="Design token pipeline from Figma to production React components.">
          <Tabs
            tabs={[
              { id: "overview", label: "Overview", content: tabContent.overview },
              { id: "tokens", label: "CSS Tokens", content: tabContent.tokens },
              { id: "usage", label: "Usage", content: tabContent.usage },
            ]}
          />
        </Section>

        {/* Brand Colors */}
        <Section title="Brand Colors" description="Duck System brand palette — yellow primary, dark text, muted secondary.">
          <div>
            <Label>Brand</Label>
            <Row>
              <Swatch cssVar="--color-brand-yellow" label="Yellow" />
              <Swatch cssVar="--color-brand-dark" label="Dark" />
              <Swatch cssVar="--color-brand-muted" label="Muted" />
              <Swatch cssVar="--color-brand-blue" label="Blue" />
              <Swatch cssVar="--color-brand-coral" label="Coral" />
              <Swatch cssVar="--color-brand-teal" label="Teal" />
              <Swatch cssVar="--color-brand-indigo" label="Indigo" />
              <Swatch cssVar="--color-brand-disabled" label="Disabled" />
            </Row>
          </div>
          <div>
            <Label>Interactive</Label>
            <Row>
              <Swatch cssVar="--color-interactive-primary" label="Primary" />
              <Swatch cssVar="--color-interactive-primary-hover" label="Hover" />
              <Swatch cssVar="--color-interactive-secondary" label="Secondary" />
              <Swatch cssVar="--color-interactive-ghost-hover" label="Ghost Hover" />
            </Row>
          </div>
          <div>
            <Label>Backgrounds</Label>
            <Row>
              <Swatch cssVar="--color-bg-page" label="Page" />
              <Swatch cssVar="--color-bg-surface" label="Surface" />
              <Swatch cssVar="--color-bg-elevated" label="Elevated" />
              <Swatch cssVar="--color-bg-subtle" label="Subtle" />
              <Swatch cssVar="--color-bg-inverse" label="Inverse" />
            </Row>
          </div>
          <div>
            <Label>Text</Label>
            <Row>
              <Swatch cssVar="--color-text-primary" label="Primary" />
              <Swatch cssVar="--color-text-secondary" label="Secondary" />
              <Swatch cssVar="--color-text-muted" label="Muted" />
              <Swatch cssVar="--color-text-link" label="Link" />
              <Swatch cssVar="--color-text-danger" label="Danger" />
              <Swatch cssVar="--color-text-success" label="Success" />
            </Row>
          </div>
          <div>
            <Label>Feedback</Label>
            <Row>
              <Swatch cssVar="--color-feedback-success-bg" label="Success BG" />
              <Swatch cssVar="--color-feedback-warning-bg" label="Warning BG" />
              <Swatch cssVar="--color-feedback-error-bg" label="Error BG" />
              <Swatch cssVar="--color-feedback-info-bg" label="Info BG" />
            </Row>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography" description="System font stack with a consistent type scale.">
          <Card>
            <CardContent className="pt-6">
              <TypeSpecimen />
            </CardContent>
          </Card>
        </Section>

        {/* Buttons */}
        <Section title="Buttons" description="Six variants × three sizes. Colors come from interactive.* tokens.">
          <div className="flex flex-col gap-6">
            <div>
              <Label>Variants</Label>
              <Row>
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </Row>
            </div>
            <div>
              <Label>Sizes</Label>
              <Row>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="icon">🦆</Button>
              </Row>
            </div>
            <div>
              <Label>States</Label>
              <Row>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
              </Row>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" description="Status indicators with semantic color coding.">
          <Row>
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
        <Section title="Avatars" description="User identity with image and initials fallback.">
          <Row>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="sm" fallback="Ana García" />
              <Label>SM</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="md" fallback="Bob Kim" />
              <Label>MD</Label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" fallback="Carlos López" />
              <Label>LG</Label>
            </div>
          </Row>
        </Section>

        {/* Form inputs */}
        <Section title="Form Controls" description="Inputs wired to --color-border-* and --color-feedback-* tokens.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full name"
              placeholder="Ana García"
              hint="This is how it appears on your profile"
            />
            <Input
              label="Email"
              type="email"
              placeholder="ana@gopato.com"
              error="Please enter a valid email address"
            />
            <Input
              label="Search"
              placeholder="Search services…"
              leftIcon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              }
            />
            <Select
              label="Service category"
              placeholder="Choose category…"
              options={[
                { value: "clean", label: "Cleaning" },
                { value: "delivery", label: "Delivery" },
                { value: "pets", label: "Pet care" },
                { value: "repair", label: "Repairs" },
              ]}
              hint="Select the type of service you need"
            />
            <div className="flex flex-col gap-4">
              <Checkbox label="Remember me" description="Stay signed in for 30 days" />
              <Checkbox label="Email notifications" description="Get updates about your bookings" defaultChecked />
              <Checkbox label="SMS alerts" disabled />
            </div>
            <div className="flex flex-col gap-4">
              <Toggle
                checked={toggle1}
                onChange={setToggle1}
                label="Push notifications"
                description="Receive alerts for appointments"
              />
              <Toggle
                checked={toggle2}
                onChange={setToggle2}
                label="Dark mode"
                description="Use dark theme"
              />
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards" description="Surface containers with --color-bg-surface and shadow from shadow-sm.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">Active</Badge>
                  <Avatar size="sm" fallback="Ana García" />
                </div>
                <CardTitle>Home Cleaning</CardTitle>
                <CardDescription>Weekly deep clean · Monday mornings</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={75} label="This month" showValue />
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">View details</Button>
                <Button size="sm" variant="ghost">Reschedule</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div
                  className="h-24 -mx-6 -mt-6 rounded-t-lg mb-2 flex items-center justify-center"
                  style={{ background: "var(--color-interactive-primary)" }}
                >
                  <span className="text-4xl">🧹</span>
                </div>
                <CardTitle>Dry Cleaning</CardTitle>
                <CardDescription>Professional garment care</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  Pick-up and delivery included. Ready in 48h.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <span className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>$17.000</span>
                  <Button size="sm">Book now</Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
                <CardDescription>Appointment summary</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {[
                  { day: "Mon", service: "Home Cleaning", status: "success" as const },
                  { day: "Wed", service: "Dog Walk", status: "info" as const },
                  { day: "Fri", service: "Dry Cleaning", status: "warning" as const },
                ].map(({ day, service, status }) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-xs font-mono w-8" style={{ color: "var(--color-text-muted)" }}>{day}</span>
                    <span className="flex-1 text-sm" style={{ color: "var(--color-text-primary)" }}>{service}</span>
                    <Badge variant={status}>{status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Alerts */}
        <Section title="Alerts" description="Feedback messages using --color-feedback-* tokens.">
          <div className="flex flex-col gap-3">
            <Alert variant="success">
              <AlertTitle>Booking confirmed!</AlertTitle>
              <AlertDescription>Your home cleaning is scheduled for Monday, Feb 11th at 9:00 AM.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Appointment reminder</AlertTitle>
              <AlertDescription>You have a service visit tomorrow. Make sure someone is home.</AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>Your card was declined. Please update your payment method to continue.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>New service available</AlertTitle>
              <AlertDescription>Dog walking is now available in your area. Book your first session free.</AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* Progress */}
        <Section title="Progress" description="Animated progress bars using motion tokens.">
          <div className="flex flex-col gap-4 max-w-md">
            <Progress value={45} label="Storage used" showValue />
            <Progress value={72} variant="success" label="Profile complete" showValue />
            <Progress value={90} variant="warning" label="Monthly limit" showValue size="lg" />
            <Progress value={30} variant="error" label="Credits remaining" showValue size="sm" />
          </div>
        </Section>

        {/* Spacing */}
        <Section title="Spacing Scale" description="4px base unit · --space-* tokens">
          <Row>
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
              <div key={n} className="flex flex-col items-center gap-1">
                <div
                  className="rounded"
                  style={{
                    width: `var(--space-${n})`,
                    height: `var(--space-${n})`,
                    background: "var(--color-interactive-primary)",
                  }}
                />
                <Label>{n}</Label>
              </div>
            ))}
          </Row>
        </Section>

        {/* Border radius */}
        <Section title="Border Radius" description="--radius-* tokens">
          <Row>
            {(["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const).map((r) => (
              <div key={r} className="flex flex-col items-center gap-1">
                <div
                  className="h-12 w-12 border-2"
                  style={{
                    borderRadius: `var(--radius-${r})`,
                    borderColor: "var(--color-interactive-primary)",
                    background: "var(--color-feedback-warning-bg)",
                  }}
                />
                <Label>{r}</Label>
              </div>
            ))}
          </Row>
        </Section>

        {/* Motion */}
        <Section title="Motion Tokens" description="Easing curves and durations from --motion-* tokens.">
          <MotionDemo />
        </Section>

      </main>
    </div>
  );
}
