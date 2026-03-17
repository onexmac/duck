"use client";
// GoPato — the middle section that changes based on app state
// Faithful to all 5 Figma frames

import { AppointmentCard } from "./AppointmentCard";

export type GoPatoState =
  | "empty"       // No subscription yet
  | "sunday"      // No services on Sundays
  | "appointment" // Has upcoming appointment (Limpieza pro card)
  | "missed"      // Missing a visit this week
  | "extra";      // Extra slot available

interface StateSectionProps {
  state: GoPatoState;
  onAction?: () => void;
}

const BUTTON_STYLE = {
  background: "#FFC736",
  fontFamily: "Roboto, sans-serif",
  boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
};

function YellowButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-6 h-10 text-white text-[12px] font-medium tracking-wider"
      style={BUTTON_STYLE}
    >
      {label}
    </button>
  );
}

export function StateSection({ state, onAction }: StateSectionProps) {
  const textStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#9494AD",
  };

  if (state === "appointment") {
    return (
      <div className="px-0">
        <AppointmentCard onConfirm={onAction} />
      </div>
    );
  }

  const content: Record<Exclude<GoPatoState, "appointment">, { text: string; button: string }> = {
    empty: {
      text: "You haven't signed for\nany subscription yet",
      button: "Choose a Home Plan!",
    },
    sunday: {
      text: "Currently there's no services\navailable on Sundays",
      button: "See next Appointment",
    },
    missed: {
      text: "You are missing one visit this week",
      button: "Reschedule Friday's Appointment",
    },
    extra: {
      text: "There's always room for more",
      button: "Schedule Extra-Appointment",
    },
  };

  const { text, button } = content[state as Exclude<GoPatoState, "appointment">];

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-2">
      <p
        className="text-[16px] text-center leading-[1.4] tracking-[0.16px] whitespace-pre-line"
        style={textStyle}
      >
        {text}
      </p>
      <YellowButton label={button} onClick={onAction} />
    </div>
  );
}
