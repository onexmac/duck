"use client";
// GoPato — the middle section that changes based on app state

import { AppointmentCard } from "./AppointmentCard";
import { Button } from "@/components/ui/button";

export type GoPatoState =
  | "empty"       // No subscription yet
  | "sunday"      // No services on Sundays
  | "appointment" // Upcoming appointment — unconfirmed (with Confirm button)
  | "missed"      // Missing a visit this week
  | "extra"       // Extra slot available
  | "confirmed"   // Appointment confirmed (card only, no confirm btn)
  | "rate";       // Confirmed + "Rate previous visit" pill

interface StateSectionProps {
  state: GoPatoState;
  onAction?: () => void;
}

// "Rate previous visit" pill — uses brand blue + token colours
function RatePill({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-full pl-2 pr-3 h-[48px] w-full"
      style={{
        background: "var(--color-interactive-primary)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.12), 0px 8px 10px rgba(0,0,0,0.12)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      {/* Person avatar */}
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="var(--color-text-inverse)" />
          <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke="var(--color-text-inverse)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <span
        className="flex-1 text-[18px] font-medium tracking-wide text-center"
        style={{ color: "var(--color-text-inverse)" }}
      >
        Rate previous visit
      </span>

      {/* Checkmark circle */}
      <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 13L9 17L19 7" stroke="var(--color-text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}

export function StateSection({ state, onAction }: StateSectionProps) {
  if (state === "appointment") {
    return (
      <div className="px-0">
        <AppointmentCard onConfirm={onAction} showConfirm />
      </div>
    );
  }

  if (state === "confirmed") {
    return (
      <div className="px-0">
        <AppointmentCard showConfirm={false} />
      </div>
    );
  }

  if (state === "rate") {
    return (
      <div className="px-0 flex flex-col gap-4">
        <AppointmentCard showConfirm={false} />
        <div className="px-3">
          <RatePill onClick={onAction} />
        </div>
      </div>
    );
  }

  const content: Record<"empty" | "sunday" | "missed" | "extra", { text: string; button: string }> = {
    empty:  { text: "You haven't signed for\nany subscription yet",           button: "Choose a Home Plan!" },
    sunday: { text: "Currently there's no services\navailable on Sundays",    button: "See next Appointment" },
    missed: { text: "You are missing one visit this week",                    button: "Reschedule Friday's Appointment" },
    extra:  { text: "There's always room for more",                           button: "Schedule Extra-Appointment" },
  };

  const { text, button } = content[state as "empty" | "sunday" | "missed" | "extra"];

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-2">
      <p
        className="text-[16px] text-center leading-[1.4] tracking-[0.16px] whitespace-pre-line text-text-secondary"
        style={{ fontFamily: "var(--font-family-sans)" }}
      >
        {text}
      </p>
      <Button
        variant="success"
        className="rounded-full px-6 h-10 normal-case text-[12px] tracking-wider"
        onClick={onAction}
      >
        {button}
      </Button>
    </div>
  );
}
