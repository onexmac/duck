"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useMotionValue, animate } from "motion/react";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { spring } from "@/lib/motion-tokens";

import { SERVICE_ICONS } from "@/lib/figma-icons";
const imgUnion  = SERVICE_ICONS.clean;
const imgUnion1 = SERVICE_ICONS.bread;
const imgUnion2 = SERVICE_ICONS.pet;

// Snap positions (y translation from natural bottom-aligned position)
const FULL = 0;
const HALF = 220;
const PEEK = 490;
const SNAP_POINTS = [FULL, HALF, PEEK];
const SHEET_HEIGHT = 680;

interface Service {
  icon: string;
  name: string;
  description: string;
  price: string;
}

const SERVICES: Service[] = [
  { icon: imgUnion,  name: "Dry cleaning", description: "Same-day pickup available", price: "¢17,000" },
  { icon: imgUnion1, name: "Fresh bread",  description: "Artisan bakery delivery",   price: "¢17,000" },
  { icon: imgUnion2, name: "Dog Walk",     description: "Certified dog walkers",      price: "¢17,000" },
];

function PricePill({ price }: { price: string }) {
  const [added, setAdded] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <div className="flex items-center gap-1 shrink-0">
      <div
        className="flex items-center px-2.5 h-8 rounded-full text-text-secondary border border-border-strong bg-bg-surface"
        style={{
          fontFamily: "var(--font-family-sans)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.6px",
        }}
      >
        {price}
      </div>
      <motion.button
        onPointerDown={() => { setPressed(true); setAdded(a => !a); }}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        animate={{
          scale: pressed ? 0.78 : 1,
          backgroundColor: added ? "var(--color-interactive-success)" : "var(--color-bg-surface)",
          borderColor: added ? "var(--color-interactive-success)" : "var(--color-border-strong)",
        }}
        transition={spring.snappy}
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ rotate: added ? 45 : 0 }}
          transition={spring.snappy}
        >
          <line x1="7" y1="2" x2="7" y2="12"
            stroke={added ? "var(--color-interactive-success-text)" : "var(--color-text-secondary)"}
            strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="7" x2="12" y2="7"
            stroke={added ? "var(--color-interactive-success-text)" : "var(--color-text-secondary)"}
            strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </motion.button>
    </div>
  );
}

// Extracted so the service icon has its own onPointerDown press state (no hooks in map)
function ServiceListItem({ svc, index }: { svc: Service; index: number }) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, delay: index * 0.05 }}
      className="flex items-center gap-3 px-5 py-3 border-b border-border-default"
    >
      <motion.button
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        animate={{ scale: pressed ? 0.88 : 1 }}
        transition={spring.press}
        className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-bg-subtle"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <img src={svc.icon} alt={svc.name} className="w-6 h-6 object-contain" style={{ opacity: 0.6 }} />
      </motion.button>

      <div className="flex-1 min-w-0">
        <p
          className="text-[16px] font-bold leading-tight tracking-wide text-text-primary"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          {svc.name}
        </p>
        <p
          className="text-[14px] mt-0.5 tracking-wide text-text-secondary"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          {svc.description}
        </p>
      </div>

      <PricePill price={svc.price} />
    </motion.div>
  );
}

export function ServiceList() {
  const y = useMotionValue(HALF);
  const dragControls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("recents");

  const snapTo = (currentY: number, velocityY: number) => {
    let target: number;
    if (Math.abs(velocityY) > 400) {
      if (velocityY > 0) {
        const lower = SNAP_POINTS.filter(s => s > currentY);
        target = lower.length ? Math.min(...lower) : PEEK;
      } else {
        const higher = SNAP_POINTS.filter(s => s < currentY);
        target = higher.length ? Math.max(...higher) : FULL;
      }
    } else {
      target = SNAP_POINTS.reduce((a, b) =>
        Math.abs(b - currentY) < Math.abs(a - currentY) ? b : a
      );
    }
    animate(y, target, { type: "spring", stiffness: 320, damping: 36 });
  };

  // Start sheet drag from the header area. Skip when pointer is on a button
  // so tab taps don't accidentally kick off a drag.
  const startHeaderDrag = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    dragControls.start(e);
  };

  return (
    <motion.div
      style={{
        y,
        position: "absolute",
        left: 0, right: 0, bottom: 0,
        height: SHEET_HEIGHT,
        zIndex: 5,
        borderRadius: "20px 20px 0 0",
      }}
      className="bg-bg-surface"
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: FULL, bottom: PEEK }}
      dragElastic={0.06}
      onDragEnd={(_, info) => snapTo(y.get(), info.velocity.y)}
    >
      {/* ── Drag zone: handle pill + header row only ────────────────────────
          touchAction:none blocks browser scroll/pan so Motion captures every
          pointer event for drag tracking. Segmented control lives OUTSIDE this
          zone so its own horizontal drag works without conflict.               */}
      <div
        onPointerDown={startHeaderDrag}
        style={{ cursor: "grab", touchAction: "none", userSelect: "none" }}
      >
        {/* Pill */}
        <div className="flex justify-center pt-3 pb-2">
          <motion.div
            className="rounded-full bg-border-strong"
            style={{ width: 36, height: 5 }}
            whileHover={{ scaleX: 1.3 }}
            transition={spring.snappy}
          />
        </div>

        {/* Header */}
        <div className="px-5 flex items-center justify-between mb-3">
          <h2
            className="text-[24px] font-black tracking-[0.72px] text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            More services
          </h2>
          <Button variant="naked" size="sm" className="text-[16px] font-black normal-case">
            More
          </Button>
        </div>
      </div>

      {/* ── Segmented control (outside drag zone so horizontal drag works) ─── */}
      <div className="px-5 mb-3">
        <SegmentedControl
          tabs={[
            { id: "recents", label: "Recents" },
            { id: "popular", label: "Popular" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* ── Scrollable content ──────────────────────────────────────────────────
          touchAction:pan-y lets the browser handle vertical scroll natively.  */}
      <div
        ref={contentRef}
        className="overflow-y-auto"
        style={{
          height: SHEET_HEIGHT - 164,
          paddingBottom: 100,
          touchAction: "pan-y",
        }}
      >
        <div className="px-5 mb-2">
          <span
            className="text-[16px] font-bold tracking-wide text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Recommended for you
          </span>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((svc, i) => (
            <ServiceListItem key={svc.name} svc={svc} index={i} />
          ))}
        </div>

        <div className="px-5 mt-4 mb-2">
          <span
            className="text-[16px] font-bold tracking-wide text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            What&apos;s New
          </span>
        </div>
        <div className="mx-5 h-[140px] rounded-[16px] bg-bg-page" />
      </div>
    </motion.div>
  );
}
