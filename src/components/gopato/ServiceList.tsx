"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useMotionValue, animate } from "motion/react";
import { Button } from "@/components/ui/button";
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
        onPointerDown={() => setAdded(a => !a)}
        animate={{
          scale: 1,
          backgroundColor: added ? "var(--color-interactive-success)" : "var(--color-bg-surface)",
          borderColor: added ? "var(--color-interactive-success)" : "var(--color-border-strong)",
        }}
        whileTap={{ scale: 0.78 }}
        transition={spring.snappy}
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ rotate: added ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
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

export function ServiceList() {
  const y = useMotionValue(HALF);
  const dragControls = useDragControls();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"recents" | "popular">("recents");
  // Track horizontal swipe start for tab switching
  const swipeStartX = useRef<number | null>(null);

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

  // Horizontal swipe on the tab bar → switch tabs
  const onTabAreaPointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
  };
  const onTabAreaPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) < 40) return; // too short — treat as tap
    if (dx < 0 && activeTab === "recents") setActiveTab("popular");
    else if (dx > 0 && activeTab === "popular") setActiveTab("recents");
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
      {/* ── Drag zone: handle pill + header row + tab bar ──────────────────────
          Entire top region initiates sheet drag. touchAction:none blocks browser
          scroll/pan so Motion captures every pointer event for drag tracking.   */}
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
            transition={{ duration: 0.15 }}
          />
        </div>

        {/* Header */}
        <div className="px-5 flex items-center justify-between mb-1">
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

        {/* ── Segmented tabs (Recents / Popular) ─────────────────────────────
            Also detects horizontal swipe to switch tabs without tapping.       */}
        <div
          className="px-5 mb-3"
          onPointerDown={onTabAreaPointerDown}
          onPointerUp={onTabAreaPointerUp}
        >
          <div className="flex rounded-[20px] p-1 bg-bg-page">
            {(["recents", "popular"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileTap={{ scale: 0.94 }}
                transition={spring.snappy}
                className="flex-1 flex items-center justify-center h-8 rounded-[16px] relative z-10"
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  color: activeTab === tab ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute inset-0 rounded-[16px] bg-bg-surface"
                    style={{ boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ──────────────────────────────────────────────────
          touchAction:pan-y lets the browser handle vertical scroll natively.
          Horizontal swipes on content also switch tabs.                        */}
      <div
        ref={contentRef}
        className="overflow-y-auto"
        style={{
          height: SHEET_HEIGHT - 148,
          paddingBottom: 100,
          touchAction: "pan-y",
        }}
        onPointerDown={onTabAreaPointerDown}
        onPointerUp={onTabAreaPointerUp}
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
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2, ease: [0, 0, 0.2, 1] }}
              className="flex items-center gap-3 px-5 py-3 border-b border-border-default"
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                transition={spring.press}
                className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-bg-subtle"
              >
                <img src={svc.icon} alt={svc.name} className="w-6 h-6 object-contain" style={{ opacity: 0.6 }} />
              </motion.div>

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
