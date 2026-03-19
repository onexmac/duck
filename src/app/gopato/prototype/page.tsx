"use client";

import { useState, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StatusBar } from "@/components/gopato/StatusBar";
import { WeekCalendar } from "@/components/gopato/WeekCalendar";
import { StateSection, type GoPatoState } from "@/components/gopato/StateSection";
import { ServiceList } from "@/components/gopato/ServiceList";
import { BottomNav, type NavTab } from "@/components/gopato/BottomNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { transition, spring } from "@/lib/motion-tokens";
import Link from "next/link";

// ── Date ↔ State mapping ───────────────────────────────────────────────────
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

// ── State tabs (prototype controls) ───────────────────────────────────────
const STATES: GoPatoState[] = [
  "empty", "sunday", "appointment", "missed", "extra", "confirmed", "rate",
];
const STATE_LABELS: Record<GoPatoState, string> = {
  empty: "No plan", sunday: "Sunday", appointment: "Appt",
  missed: "Missed", extra: "Extra", confirmed: "Confirmed", rate: "Rate",
};

const TAB_ORDER: NavTab[] = ["profile", "home", "chat", "orders"];

// State tab pill — onPointerDown for instant response
function StateTabPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      animate={{
        scale: pressed ? 0.88 : 1,
        background: active ? "var(--color-interactive-success)" : "var(--color-bg-subtle)",
        color: active ? "var(--color-interactive-success-text)" : "var(--color-text-primary)",
      }}
      transition={spring.press}
      className="px-3 py-1.5 rounded-full text-xs font-medium"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {label}
    </motion.button>
  );
}

// ── Secondary screens ──────────────────────────────────────────────────────
function ProfileScreen() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto pb-24"
      style={{ background: "var(--color-bg-page)" }}
    >
      {/* Avatar + name */}
      <div className="flex flex-col items-center pt-6 pb-5 px-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
          style={{ background: "var(--color-interactive-primary)" }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="var(--color-interactive-primary-text)" />
            <path
              d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20"
              stroke="var(--color-interactive-primary-text)"
              strokeWidth="2" strokeLinecap="round"
            />
          </svg>
        </div>
        <p
          className="text-[20px] font-black text-text-primary"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          María García
        </p>
        <p className="text-[13px] text-text-secondary mt-0.5">maria.garcia@gopato.cr</p>
      </div>

      {/* Active plan card */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{
        background: "var(--color-interactive-success)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}>
        <p
          className="text-[11px] font-bold tracking-widest uppercase mb-1"
          style={{ color: "var(--color-interactive-success-text)", opacity: 0.6 }}
        >
          Current Plan
        </p>
        <p className="text-[20px] font-black" style={{ color: "var(--color-interactive-success-text)" }}>
          Home Plus
        </p>
        <p className="text-[13px] mt-0.5" style={{ color: "var(--color-interactive-success-text)", opacity: 0.7 }}>
          2 visits / week · Renews April 1
        </p>
      </div>

      {/* Settings rows */}
      {[
        { label: "Payment methods", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="var(--color-text-primary)" strokeWidth="1.8"/><line x1="2" y1="10" x2="22" y2="10" stroke="var(--color-text-primary)" strokeWidth="1.8"/></svg> },
        { label: "Addresses", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.7 2 6 4.7 6 8c0 5 6 13 6 13s6-8 6-13c0-3.3-2.7-6-6-6z" stroke="var(--color-text-primary)" strokeWidth="1.8"/><circle cx="12" cy="8" r="2" stroke="var(--color-text-primary)" strokeWidth="1.8"/></svg> },
        { label: "Notifications", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8C18 5.2 15.3 3 12 3S6 5.2 6 8v4l-2 3h16l-2-3V8z" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 19c0 1.1.9 2 2 2s2-.9 2-2" stroke="var(--color-text-primary)" strokeWidth="1.8"/></svg> },
        { label: "Help & Support", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="var(--color-text-primary)" strokeWidth="1.8"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" stroke="var(--color-text-primary)" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="var(--color-text-primary)"/></svg> },
      ].map(({ label, icon }) => (
        <motion.button
          key={label}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="flex items-center gap-3.5 mx-4 py-3.5 border-b text-left w-[calc(100%-2rem)]"
          style={{ borderColor: "var(--color-border-default)" }}
        >
          <span className="shrink-0" style={{ color: "var(--color-text-primary)" }}>{icon}</span>
          <span
            className="flex-1 text-[15px] font-medium text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            {label}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.button>
      ))}
    </div>
  );
}

function ChatScreen() {
  const messages = [
    { from: "agent", text: "Hi María! How can we help you today?", time: "9:30 AM" },
    { from: "user",  text: "I'd like to add pet care to my next appointment", time: "9:31 AM" },
    { from: "agent", text: "Of course! I can add that for Thursday. Should I include it?", time: "9:32 AM" },
    { from: "user",  text: "Yes please!", time: "9:33 AM" },
    { from: "agent", text: "Done! Your Thursday appointment now includes pet care 🐾", time: "9:33 AM" },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: "var(--color-bg-page)" }}>
      {/* Agent header */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b shrink-0"
        style={{ background: "var(--color-bg-surface)", borderColor: "var(--color-border-default)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--color-interactive-primary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="var(--color-interactive-primary-text)" />
            <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20"
              stroke="var(--color-interactive-primary-text)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p
            className="text-[14px] font-bold text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            GoPato Support
          </p>
          <p className="text-[11px]" style={{ color: "var(--color-text-success)" }}>● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-28">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[75%] px-3.5 py-2.5"
              style={{
                background: msg.from === "user"
                  ? "var(--color-interactive-primary)"
                  : "var(--color-bg-surface)",
                borderRadius: msg.from === "user"
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <p
                className="text-[14px] leading-snug"
                style={{
                  color: msg.from === "user"
                    ? "var(--color-interactive-primary-text)"
                    : "var(--color-text-primary)",
                  fontFamily: "var(--font-family-sans)",
                }}
              >
                {msg.text}
              </p>
              <p
                className="text-[10px] mt-0.5 text-right"
                style={{
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-family-sans)",
                }}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <div
        className="absolute bottom-[88px] left-0 right-0 px-4 py-3 border-t flex gap-2 items-center"
        style={{
          background: "var(--color-bg-surface)",
          borderColor: "var(--color-border-default)",
        }}
      >
        <div
          className="flex-1 rounded-full px-4 h-9 flex items-center text-[13px]"
          style={{
            background: "var(--color-bg-subtle)",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-family-sans)",
          }}
        >
          Message…
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--color-interactive-primary)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="var(--color-interactive-primary-text)" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="var(--color-interactive-primary-text)" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

function OrdersScreen() {
  const orders = [
    { service: "Deep Clean + Pets", date: "Mar 13, 2026", amount: "¢34,000" },
    { service: "Standard Clean",    date: "Mar 6, 2026",  amount: "¢17,000" },
    { service: "Express Clean",     date: "Feb 27, 2026", amount: "¢17,000" },
    { service: "Deep Clean",        date: "Feb 20, 2026", amount: "¢17,000" },
  ];

  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto pb-28"
      style={{ background: "var(--color-bg-page)" }}
    >
      <div className="px-5 pt-5 pb-3">
        <h2
          className="text-[24px] font-black text-text-primary tracking-tight"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          Order History
        </h2>
      </div>

      <div className="flex flex-col gap-3 px-4">
        {orders.map((order, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className="rounded-2xl p-4"
            style={{
              background: "var(--color-bg-surface)",
              boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.3)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <p
                className="text-[15px] font-bold text-text-primary flex-1"
                style={{ fontFamily: "var(--font-family-sans)" }}
              >
                {order.service}
              </p>
              <span
                className="text-[12px] font-bold shrink-0 px-2 py-0.5 rounded-lg"
                style={{
                  color: "var(--color-interactive-success-text)",
                  background: "var(--color-interactive-success)",
                }}
              >
                {order.amount}
              </span>
            </div>
            <p className="text-[12px] text-text-secondary mt-1">
              {order.date} · Completed
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Home screen ─────────────────────────────────────────────────────────────
interface HomeScreenProps {
  weekOffset: number;
  activeDate: number;
  appState: GoPatoState;
  onDaySelect: (date: number) => void;
  onWeekChange: (offset: number) => void;
  onAction: () => void;
}

function HomeScreen({ weekOffset, activeDate, appState, onDaySelect, onWeekChange, onAction }: HomeScreenProps) {
  return (
    <>
      {/* App header */}
      <div className="px-5 pt-2 pb-1 shrink-0">
        <h1
          className="text-[24px] font-black tracking-[0.72px] text-text-primary"
          style={{ fontFamily: "var(--font-family-sans)" }}
        >
          GoPato Home
        </h1>
      </div>

      {/* Week calendar */}
      <WeekCalendar
        activeDate={activeDate}
        onSelect={onDaySelect}
        weekOffset={weekOffset}
        onWeekChange={onWeekChange}
      />

      {/* State section */}
      <div className="shrink-0" style={{ minHeight: 180 }}>
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
              onAction={onAction}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Spacer for bottom sheet */}
      <div className="flex-1" />

      {/* Draggable service sheet */}
      <ServiceList />
    </>
  );
}

// ── Root prototype component ───────────────────────────────────────────────
function GoPatoPrototype() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDate, setActiveDate] = useState(BASE_SUN + 4); // Thursday = appointment
  const [appState, setAppState] = useState<GoPatoState>("appointment");
  const [navTab, setNavTab] = useState<NavTab>("home");
  const [navDirection, setNavDirection] = useState(0);

  const handleDaySelect = (date: number) => {
    setActiveDate(date);
    setAppState(dateToState(date));
  };

  const handleWeekChange = (offset: number) => {
    setWeekOffset(offset);
    const idx = DAY_STATES.indexOf(appState);
    setActiveDate(BASE_SUN + offset * 7 + idx);
  };

  const handleStateTab = (state: GoPatoState) => {
    setAppState(state);
    setActiveDate(stateToDateInWeek(state, weekOffset));
  };

  const handleNavChange = (tab: NavTab) => {
    const curr = TAB_ORDER.indexOf(navTab);
    const next = TAB_ORDER.indexOf(tab);
    setNavDirection(next > curr ? 1 : -1);
    setNavTab(tab);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4 gap-5"
      style={{ background: "var(--color-bg-inverse)" }}
    >
      {/* Top bar */}
      <div className="w-full max-w-sm flex items-center justify-between">
        <Link
          href="/gopato"
          className="text-sm transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          ← GoPato Portal
        </Link>
        <ThemeToggle />
      </div>

      {/* Title */}
      <div className="text-center">
        <h1
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--color-text-inverse)" }}
        >
          GoPato Prototype
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Duck System · node 7486:6775
        </p>
      </div>

      {/* State tabs — only when on home tab */}
      <AnimatePresence>
        {navTab === "home" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {STATES.map((s) => (
              <StateTabPill
                key={s}
                label={STATE_LABELS[s]}
                active={appState === s}
                onClick={() => handleStateTab(s)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone frame */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          width: 375,
          height: 812,
          borderRadius: 44,
          background: "var(--color-bg-elevated)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Phone inner */}
        <div
          className="absolute inset-[3px] rounded-[41px] overflow-hidden flex flex-col"
          style={{ background: "var(--color-bg-page)" }}
        >
          <StatusBar />

          {/* Screen content — animated between nav tabs */}
          <AnimatePresence mode="wait" custom={navDirection}>
            <motion.div
              key={navTab}
              custom={navDirection}
              variants={{
                enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit:  (d: number) => ({ x: -d * 40, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
              className="flex flex-col flex-1 min-h-0 relative"
            >
              {navTab === "home" && (
                <HomeScreen
                  weekOffset={weekOffset}
                  activeDate={activeDate}
                  appState={appState}
                  onDaySelect={handleDaySelect}
                  onWeekChange={handleWeekChange}
                  onAction={() => {
                    if (appState === "appointment") handleStateTab("confirmed");
                    if (appState === "rate") handleStateTab("empty");
                  }}
                />
              )}
              {navTab === "profile" && <ProfileScreen />}
              {navTab === "chat"    && <ChatScreen />}
              {navTab === "orders"  && <OrdersScreen />}
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav — always on top */}
          <BottomNav activeTab={navTab} onTabChange={handleNavChange} />
        </div>
      </div>

      <p className="text-xs text-center max-w-sm" style={{ color: "var(--color-text-muted)" }}>
        Swipe calendar · drag sheet · tap nav tabs
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
