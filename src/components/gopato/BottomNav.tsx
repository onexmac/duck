"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { spring } from "@/lib/motion-tokens";
import { NAV_ICONS } from "@/lib/figma-icons";

export type NavTab = "home" | "chat" | "orders" | "profile";

// Nav items use real GoPato icons from Figma (node IDs in figma-icons.ts).
// Icons are loaded as static PNGs, colored via CSS mask-image so active/idle
// states can be tinted without multiple image variants.
const NAV_ITEMS: { id: NavTab; src: string; w: number; h: number }[] = [
  { id: "home",    src: NAV_ICONS.home,   w: 22, h: 22 },
  { id: "chat",    src: NAV_ICONS.chat,   w: 24, h: 22 },
  { id: "orders",  src: NAV_ICONS.orders, w: 20, h: 24 },
  { id: "profile", src: NAV_ICONS.avatar, w: 22, h: 20 },
];

interface NavButtonProps {
  id: NavTab;
  src: string;
  w: number;
  h: number;
  isActive: boolean;
  onTabChange: (tab: NavTab) => void;
}

function NavButton({ id, src, w, h, isActive, onTabChange }: NavButtonProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.button
      onClick={() => onTabChange(id)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      animate={{ scale: pressed ? 0.84 : 1 }}
      transition={spring.press}
      className="flex items-center justify-center relative"
      style={{ width: 48, height: 48, borderRadius: 24, WebkitTapHighlightColor: "transparent" }}
    >
      {isActive && (
        <motion.div
          layoutId="navBubble"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "var(--color-interactive-success)" }}
          transition={spring.snappy}
        />
      )}
      {/* Icon colored via mask-image — one PNG, two colors */}
      <div
        className="relative z-10"
        style={{
          width: w,
          height: h,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          backgroundColor: isActive
            ? "var(--color-text-inverse)"
            : "var(--color-text-muted)",
          transition: "background-color 0.15s ease",
        }}
      />
    </motion.button>
  );
}

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div
      className="shrink-0 bg-bg-surface flex items-center justify-around px-6 pt-3"
      style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
    >
      {NAV_ITEMS.map(({ id, src, w, h }) => (
        <NavButton
          key={id}
          id={id}
          src={src}
          w={w}
          h={h}
          isActive={id === activeTab}
          onTabChange={onTabChange}
        />
      ))}
    </div>
  );
}
