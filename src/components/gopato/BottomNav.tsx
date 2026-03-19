"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { spring } from "@/lib/motion-tokens";

export type NavTab = "profile" | "home" | "chat" | "orders";

const NAV_ITEMS: { id: NavTab; icon: (active: boolean) => React.ReactNode }[] = [
  {
    id: "home",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
          fill={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"}
        />
      </svg>
    ),
  },
  {
    id: "chat",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4H20C20.55 4 21 4.45 21 5V14C21 14.55 20.55 15 20 15H8L4 19V5C4 4.45 4.45 4 4 4Z"
          stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"}
          strokeWidth="2" strokeLinejoin="round" fill="none"
        />
        <circle cx="9"  cy="9.5" r="1" fill={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} />
        <circle cx="12" cy="9.5" r="1" fill={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} />
        <circle cx="15" cy="9.5" r="1" fill={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} />
      </svg>
    ),
  },
  {
    id: "orders",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2"
          stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"}
          strokeWidth="2" fill="none" />
        <line x1="8" y1="8"  x2="16" y2="8"  stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="12" x2="16" y2="12" stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="16" x2="12" y2="16" stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"}
          strokeWidth="2" />
        <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20"
          stroke={active ? "var(--color-text-inverse)" : "var(--color-text-muted)"}
          strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface NavButtonProps {
  id: NavTab;
  icon: (active: boolean) => React.ReactNode;
  isActive: boolean;
  onTabChange: (tab: NavTab) => void;
}

function NavButton({ id, icon, isActive, onTabChange }: NavButtonProps) {
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
      <motion.span
        className="relative z-10"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={spring.snappy}
      >
        {icon(isActive)}
      </motion.span>
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
      className="absolute bottom-0 left-0 right-0 z-10 h-[88px]"
      style={{
        background: "linear-gradient(180deg, transparent 0%, var(--color-bg-surface) 60%)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-6 pb-5 pt-3 bg-bg-surface">
        {NAV_ITEMS.map(({ id, icon }) => (
          <NavButton
            key={id}
            id={id}
            icon={icon}
            isActive={id === activeTab}
            onTabChange={onTabChange}
          />
        ))}
      </div>
    </div>
  );
}
