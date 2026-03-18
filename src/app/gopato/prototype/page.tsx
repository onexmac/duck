"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "@/components/gopato/StatusBar";
import { WeekCalendar } from "@/components/gopato/WeekCalendar";
import { StateSection, type GoPatoState } from "@/components/gopato/StateSection";
import { ServiceList } from "@/components/gopato/ServiceList";
import { BottomNav } from "@/components/gopato/BottomNav";
import { transition } from "@/lib/motion-tokens";
import Link from "next/link";

// ── Date ↔ State mapping ───────────────────────────────────────────────────
// Week pattern (Sun = index 0): sunday · empty · rate · confirmed · appointment · missed · extra
const DAY_STATES: GoPatoState[] = [
  "sunday", "empty", "rate", "confirmed", "appointment", "missed", "extra",
];
const BASE_SUN = 9; // March 9, 2026 = index 0

function dateToState(date: number): GoPatoState {
  const idx = ((date - BASE_SUN) % 7 + 7) % 7;
  return DAY_STATES[idx];
}

function stateToDateInWeek(state: GoPatoState, weekOffset: number): number {
  const idx = DAY_STATES.indexOf(state);
  return BASE_SUN + weekOffset * 7 + idx;
}

// ── Page ──────────────────────────────────────────────────────────────────
const STATES: GoPatoState[] = [
  "empty", "sunday", "appointment", "missed", "extra", "confirmed", "rate",
];

const STATE_LABELS: Record<GoPatoState, string> = {
  empty: "No plan", sunday: "Sunday", appointment: "Appt",
  missed: "Missed", extra: "Extra", confirmed: "Confirmed", rate: "Rate",
};

function GoPatoPrototype() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDate, setActiveDate] = useState(BASE_SUN + 4); // Thursday = appointment
  const [appState, setAppState] = useState<GoPatoState>("appointment");

  const handleDaySelect = (date: number) => {
    setActiveDate(date);
    setAppState(dateToState(date));
  };

  const handleWeekChange = (offset: number) => {
    setWeekOffset(offset);
    // Keep same weekday pattern in new week
    const idx = DAY_STATES.indexOf(appState);
    setActiveDate(BASE_SUN + offset * 7 + idx);
  };

  const handleStateTab = (state: GoPatoState) => {
    setAppState(state);
    setActiveDate(stateToDateInWeek(state, weekOffset));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4 gap-5"
      style={{ background: "#1a1a2e" }}
    >
      {/* Back link */}
      <div className="w-full max-w-sm flex">
        <Link href="/gopato" className="text-white/50 hover:text-white text-sm transition-colors">
          ← GoPato Portal
        </Link>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-white text-xl font-semibold tracking-tight">
          🦆 Duck System — GoPato Prototype
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Built from Figma via MCP · node 7486:6775
        </p>
      </div>

      {/* State tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {STATES.map((s) => (
          <motion.button
            key={s}
            onClick={() => handleStateTab(s)}
            whileTap={{ scale: 0.9 }}
            className="px-3 py-1.5 rounded-full text-xs font-medium"
            animate={{
              background: appState === s ? "#FFC736" : "rgba(255,255,255,0.1)",
              color: appState === s ? "#2f3644" : "rgba(255,255,255,0.7)",
            }}
            transition={{ duration: 0.15 }}
          >
            {STATE_LABELS[s]}
          </motion.button>
        ))}
      </div>

      {/* Phone frame */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          width: 375,
          height: 812,
          borderRadius: 44,
          background: "#ffffff",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        {/* Phone inner */}
        <div
          className="absolute inset-[3px] rounded-[41px] overflow-hidden flex flex-col"
          style={{ background: "#fafafa" }}
        >
          <StatusBar />

          {/* App header */}
          <div className="px-5 pt-2 pb-1 shrink-0">
            <h1
              className="text-[24px] font-black tracking-[0.72px]"
              style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
            >
              GoPato Home
            </h1>
          </div>

          {/* Week calendar — interactive */}
          <WeekCalendar
            activeDate={activeDate}
            onSelect={handleDaySelect}
            weekOffset={weekOffset}
            onWeekChange={handleWeekChange}
          />

          {/* State section — animated on change */}
          <div className="shrink-0 px-0" style={{ minHeight: 180 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={appState}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={transition.slideUp}
              >
                <StateSection
                  state={appState}
                  onAction={() => {
                    if (appState === "appointment") handleStateTab("confirmed");
                    if (appState === "rate") handleStateTab("empty");
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Spacer — the bottom sheet floats above */}
          <div className="flex-1" />

          {/* Bottom sheet (absolute, draggable) */}
          <ServiceList />

          {/* Bottom nav (absolute, on top) */}
          <BottomNav />
        </div>
      </div>

      <p className="text-white/30 text-xs text-center max-w-sm">
        Swipe calendar to change week · drag handle to resize sheet · tap nav tabs
      </p>
    </div>
  );
}

export default function GoPatoPage() {
  return (
    <Suspense>
      <GoPatoPrototype />
    </Suspense>
  );
}
