// GoPato — "Home Appointment" card
// Service icon colours are category-specific (not semantic tokens) — distinct identity palette.

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { spring } from "@/lib/motion-tokens";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { SERVICE_ICONS } from "@/lib/figma-icons";
// Service icons sourced from GoPato Figma file — see src/lib/figma-icons.ts
const imgClean  = SERVICE_ICONS.clean;
const imgRefill = SERVICE_ICONS.drinks;
const imgPaw    = SERVICE_ICONS.pet;
const imgBolt   = SERVICE_ICONS.gift;

// Service category colours — distinct identity palette, not design-system semantic tokens
const SERVICES = [
  { img: imgClean,  bg: "var(--color-interactive-success)", label: "Clean"  },
  { img: imgRefill, bg: "#f0776f",                          label: "Refill" },
  { img: imgPaw,    bg: "#8ad1e1",                          label: "Pets"   },
  { img: imgBolt,   bg: "#7c83f5",                          label: "Bolt"   },
];

// Extracted so each icon has its own useState for press (no hooks-in-map)
function ServiceIcon({ img, bg, label }: { img: string; bg: string; label: string }) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      animate={{ scale: pressed ? 0.82 : 1 }}
      transition={spring.press}
      className="flex flex-col items-center gap-1"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center"
        style={{
          backgroundColor: bg,
          boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <img src={img} alt={label} className="w-6 h-6 object-contain" />
      </div>
    </motion.button>
  );
}

interface AppointmentCardProps {
  onConfirm?: () => void;
  showConfirm?: boolean;
}

export function AppointmentCard({ onConfirm, showConfirm = true }: AppointmentCardProps) {
  return (
    <Card
      className="mx-3 rounded-2xl border-0 p-4"
      style={{ boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.3)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[20px] font-black tracking-tight leading-tight text-text-primary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Home Appointment
          </p>
          <p
            className="text-[13px] mt-0.5 tracking-wide text-text-secondary"
            style={{ fontFamily: "var(--font-family-sans)" }}
          >
            Thursday, March 13th · Morning
          </p>
        </div>

        {showConfirm && (
          <Button
            variant="success"
            size="sm"
            className="rounded-full shrink-0 ml-2"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        )}
      </div>

      {/* Service icons */}
      <div className="flex gap-3 mt-4">
        {SERVICES.map(({ img, bg, label }) => (
          <ServiceIcon key={label} img={img} bg={bg} label={label} />
        ))}
      </div>
    </Card>
  );
}
