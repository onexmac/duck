// GoPato — "Home Appointment" card
// Service icon colours are category-specific (not semantic tokens) — distinct identity palette.

"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Figma MCP asset URLs (valid 7 days from 2026-03-17)
const imgClean  = "https://www.figma.com/api/mcp/asset/4fc57afd-fd39-4d95-bd79-1d92b20f4a64";
const imgRefill = "https://www.figma.com/api/mcp/asset/f4008ec8-c946-463b-9775-ddf49770cf2b";
const imgPaw    = "https://www.figma.com/api/mcp/asset/990b2c20-508f-49cb-9e5e-e0e06c2c10b4";
const imgBolt   = "https://www.figma.com/api/mcp/asset/ec56c831-c360-48f5-a4d3-94cdadb1d222";

// Service category colours — distinct identity palette, not design-system semantic tokens
const SERVICES = [
  { img: imgClean,  bg: "var(--color-interactive-success)", label: "Clean"  },
  { img: imgRefill, bg: "#f0776f",                          label: "Refill" },
  { img: imgPaw,    bg: "#8ad1e1",                          label: "Pets"   },
  { img: imgBolt,   bg: "#7c83f5",                          label: "Bolt"   },
];

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
            Monday February 11th, Morning
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

      {/* Service icons — spring press on each */}
      <div className="flex gap-3 mt-4">
        {SERVICES.map(({ img, bg, label }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
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
        ))}
      </div>
    </Card>
  );
}
