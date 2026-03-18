"use client";

import { useRef, useState } from "react";
import { motion, useDragControls, useMotionValue, animate } from "motion/react";

// Figma MCP asset URLs (valid 7 days from 2026-03-17)
const imgUnion  = "https://www.figma.com/api/mcp/asset/8e11c633-605c-4546-a288-0234be780977";
const imgUnion1 = "https://www.figma.com/api/mcp/asset/3972499a-d568-40b0-b02b-c0ce167fbad7";
const imgUnion2 = "https://www.figma.com/api/mcp/asset/0949ae4f-5077-4247-b29f-f2c1f9482d33";

// Snap positions (y translation from natural bottom-aligned position)
// Phone inner = 806px, SHEET_HEIGHT = 680px → natural top = 126px
// FULL: y=0   → 680px of sheet above phone bottom, 554px above nav
// HALF: y=220 → 460px above phone bottom, 372px above nav
// PEEK: y=490 → 190px above phone bottom,  102px above nav
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
        className="flex items-center px-2.5 h-8 rounded-full"
        style={{
          border: "1px solid #d2d4e4",
          background: "#ffffff",
          fontFamily: "Roboto, sans-serif",
          color: "#9494ad",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.6px",
        }}
      >
        {price}
      </div>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setAdded(a => !a)}
        animate={{ backgroundColor: added ? "#FFC736" : "#ffffff", borderColor: added ? "#FFC736" : "#d2d4e4" }}
        transition={{ duration: 0.18 }}
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ border: "1px solid #d2d4e4" }}
      >
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ rotate: added ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <line x1="7" y1="2" x2="7" y2="12" stroke={added ? "#fff" : "#9494ad"} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="7" x2="12" y2="7" stroke={added ? "#fff" : "#9494ad"} strokeWidth="1.5" strokeLinecap="round" />
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

  return (
    <motion.div
      style={{
        y,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: SHEET_HEIGHT,
        zIndex: 5,
        borderRadius: "20px 20px 0 0",
        background: "#ffffff",
        boxShadow: "0px -2px 20px rgba(180,184,210,0.25)",
        touchAction: "none",
      }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: FULL, bottom: PEEK }}
      dragElastic={0.06}
      onDragEnd={(_, info) => snapTo(y.get(), info.velocity.y)}
    >
      {/* ── Handle ── */}
      <motion.div
        onPointerDown={(e) => {
          e.preventDefault();
          dragControls.start(e);
        }}
        className="flex justify-center pt-3 pb-2"
        style={{ cursor: "grab", touchAction: "none" }}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="rounded-full"
          style={{ width: 36, height: 5, backgroundColor: "#d2d4e4" }}
          whileHover={{ scaleX: 1.3, backgroundColor: "#b4b8d2" }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* ── Header ── */}
      <div className="px-5 flex items-center justify-between mb-1">
        <h2
          className="text-[24px] font-black tracking-[0.72px]"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          More services
        </h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-[16px] font-black"
          style={{ color: "#4c82ee", fontFamily: "Roboto, sans-serif" }}
        >
          More
        </motion.button>
      </div>

      {/* ── Segmented tabs ── */}
      <div className="px-5 mb-3">
        <div className="flex rounded-[20px] p-1 relative" style={{ background: "#ebedf2" }}>
          {(["recents", "popular"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 flex items-center justify-center h-8 rounded-[16px] text-[14px] font-bold tracking-wide relative z-10"
              style={{
                fontFamily: "Roboto, sans-serif",
                color: activeTab === tab ? "#2f3644" : "#9494ad",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 rounded-[16px]"
                  style={{
                    background: "#ffffff",
                    boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
              <span className="relative z-10 capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div
        ref={contentRef}
        className="overflow-y-auto"
        style={{ height: SHEET_HEIGHT - 148, paddingBottom: 100 }}
      >
        <div className="px-5 mb-2">
          <span
            className="text-[16px] font-bold tracking-wide"
            style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
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
              className="flex items-center gap-3 px-5 py-3 border-b border-[#f2f2f6]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#f4f4f4" }}
              >
                <img src={svc.icon} alt={svc.name} className="w-6 h-6 object-contain" style={{ opacity: 0.6 }} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-[16px] font-bold leading-tight tracking-wide"
                  style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
                >
                  {svc.name}
                </p>
                <p
                  className="text-[14px] mt-0.5 tracking-wide"
                  style={{ fontFamily: "Roboto, sans-serif", color: "#9494AD" }}
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
            className="text-[16px] font-bold tracking-wide"
            style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
          >
            What&apos;s New
          </span>
        </div>
        <div
          className="mx-5 h-[140px] rounded-[16px]"
          style={{ background: "#ebedf2" }}
        />
      </div>
    </motion.div>
  );
}
