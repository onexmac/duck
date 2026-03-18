"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "@/components/gopato/StatusBar";
import { WeekCalendar } from "@/components/gopato/WeekCalendar";
import { StateSection, type GoPatoState } from "@/components/gopato/StateSection";
import { ServiceList } from "@/components/gopato/ServiceList";
import { BottomNav } from "@/components/gopato/BottomNav";
import { transition } from "@/lib/motion-tokens";
import Link from "next/link";

const STATE_CONFIG: Record<GoPatoState, { date: number; label: string }> = {
  empty:       { date: 15, label: "No plan" },
  sunday:      { date: 10, label: "Sunday" },
  appointment: { date: 13, label: "Appointment" },
  missed:      { date: 13, label: "Missed visit" },
  extra:       { date: 14, label: "Extra slot" },
  confirmed:   { date: 11, label: "Confirmed" },
  rate:        { date: 11, label: "Rate visit" },
};

const STATES: GoPatoState[] = [
  "empty", "sunday", "appointment", "missed", "extra", "confirmed", "rate",
];

function GoPatoPrototype() {
  const searchParams = useSearchParams();
  const [appState, setAppState] = useState<GoPatoState>(() => {
    const s = searchParams.get("state") as GoPatoState | null;
    return s && STATES.includes(s) ? s : "appointment";
  });

  useEffect(() => {
    const s = searchParams.get("state") as GoPatoState | null;
    if (s && STATES.includes(s)) setAppState(s);
  }, [searchParams]);

  const { date } = STATE_CONFIG[appState];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4 gap-6"
      style={{ background: "#1a1a2e" }}
    >
      <div className="w-full max-w-sm flex">
        <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">
          ← GoPato Portal
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-white text-xl font-semibold tracking-tight">
          🦆 Duck System — GoPato Prototype
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Built from Figma via MCP · node 7486:6775
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {STATES.map((s) => (
          <button
            key={s}
            onClick={() => setAppState(s)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: appState === s ? "#FFC736" : "rgba(255,255,255,0.1)",
              color: appState === s ? "#2f3644" : "rgba(255,255,255,0.7)",
            }}
          >
            {STATE_CONFIG[s].label}
          </button>
        ))}
      </div>

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
        <div
          className="absolute inset-[3px] rounded-[41px] overflow-hidden flex flex-col"
          style={{ background: "#fafafa" }}
        >
          <StatusBar />

          <div className="px-5 pt-2 pb-1">
            <h1
              className="text-[24px] font-black tracking-[0.72px]"
              style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
            >
              GoPato Home
            </h1>
          </div>

          <WeekCalendar activeDate={date} />

          <div className="px-0 mt-2 mb-3" style={{ minHeight: 170 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={appState}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={transition.slideUp}
              >
                <StateSection
                  state={appState}
                  onAction={() => {
                    if (appState === "appointment") setAppState("confirmed");
                    if (appState === "rate") setAppState("empty");
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="h-10 shrink-0"
            style={{ background: "linear-gradient(180deg, #fafafa 0%, #F2F6F8 100%)" }}
          />

          <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 88 }}>
            <ServiceList />
          </div>

          <BottomNav />
        </div>
      </div>

      <p className="text-white/30 text-xs text-center max-w-sm">
        Design tokens: #FFC736 HomeYellow · #2f3644 Dark · #9494AD Muted · #4c82ee Blue<br />
        Font: Roboto Black / Medium / Regular · Shadow: rgba(180,184,210,0.3)
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
