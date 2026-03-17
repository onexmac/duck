"use client";
// GoPato — bottom navigation bar
// Faithful to Figma "melimenu" component
// Active tab: Home (highlighted with yellow dot indicator)

import { useState } from "react";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
          fill={active ? "#FFC736" : "#b4b8d2"}
        />
      </svg>
    ),
  },
  {
    id: "orders",
    label: "Orders",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" fill="none" />
        <line x1="8" y1="9" x2="16" y2="9" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="13" x2="16" y2="13" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="17" x2="12" y2="17" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4H20C20.55 4 21 4.45 21 5V15C21 15.55 20.55 16 20 16H8L4 20V5C4 4.45 4.45 4 4 4Z"
          fill={active ? "#FFC736" : "none"}
          stroke={active ? "#FFC736" : "#b4b8d2"}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" fill="none" />
        <line x1="8" y1="3" x2="8" y2="7" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="3" x2="16" y2="7" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" fill="none" />
        <path d="M4 20C4 17 7.6 15 12 15C16.4 15 20 17 20 20" stroke={active ? "#FFC736" : "#b4b8d2"} strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const [active, setActive] = useState("home");

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[88px]"
      style={{
        background: "linear-gradient(180deg, rgba(253,253,253,0) 0%, rgba(253,253,253,0.765) 25%, rgb(253,253,253) 64%)",
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-4 pb-4 pt-3 bg-[#fdfdfd]">
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="flex flex-col items-center gap-0.5 relative"
            >
              {icon(isActive)}
              {isActive && (
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#FFC736" }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
