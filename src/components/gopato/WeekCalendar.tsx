"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
// AnimatePresence kept for the week-slide animation below
import { easing, spring } from "@/lib/motion-tokens";

// Appointment indicator dot colours — service category palette, not semantic
const DOTS = ["#9b98d6", "#f0776f", "#ffc736", "#85b3f8"];

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];
const BASE_SUN = 9; // March 9, 2026 = offset 0

function getWeekDays(weekOffset: number) {
  const start = BASE_SUN + weekOffset * 7;
  return DAY_NAMES.map((letter, i) => ({
    letter,
    date: start + i,
    isSunday: i === 0,
  }));
}

interface WeekCalendarProps {
  activeDate: number;
  onSelect: (date: number) => void;
  weekOffset: number;
  onWeekChange: (offset: number) => void;
}

// Per-day button — outer element has fixed dimensions so siblings never shift.
// Only the inner motion.div scales on press (pure transform, zero layout effect).
function DayButton({ letter, date, isSunday, isActive, onSelect }: {
  letter: string; date: number; isSunday: boolean; isActive: boolean;
  onSelect: (date: number) => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={() => onSelect(date)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        minWidth: 40,
        height: 84,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        background: "none",
        border: "none",
        padding: 0,
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {/* Scale lives here — never touches layout dimensions */}
      <motion.div
        animate={{ scale: pressed ? 0.84 : 1 }}
        transition={spring.press}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Card background */}
        <div
          className="absolute rounded-[16px] bg-bg-surface"
          style={{
            top: 0, bottom: 0, left: -6, right: -6,
            boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.35)",
            zIndex: 0,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.15s ease",
            pointerEvents: "none",
          }}
        />

        {/* Day letter */}
        <span
          className="relative z-10 text-[12px] font-medium tracking-wider pt-2"
          style={{
            fontFamily: "var(--font-family-sans)",
            color: isActive
              ? "var(--color-text-primary)"
              : isSunday
                ? "var(--color-text-link)"
                : "var(--color-text-muted)",
            transition: "color 0.15s ease",
          }}
        >
          {letter}
        </span>

        {/* Day number — fixed-height cell so font-size transition never shifts siblings */}
        <div className="relative z-10 flex items-center justify-center flex-1">
          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: isActive ? 24 : 16,
              fontWeight: isActive ? 900 : 400,
              lineHeight: 1,
              color: isSunday && !isActive
                ? "var(--color-text-link)"
                : "var(--color-text-primary)",
              transition: "font-size 0.15s ease, font-weight 0.15s ease, color 0.15s ease",
            }}
          >
            {date}
          </span>
        </div>

        {/* Dots — fixed height, fade in/out only */}
        <div className="relative z-10 flex gap-[3px] pb-2" style={{ height: 14 }}>
          {DOTS.map((color) => (
            <div
              key={color}
              className="w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor: color,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(0.5)",
                transition: "opacity 0.18s ease, transform 0.18s ease",
              }}
            />
          ))}
        </div>
      </motion.div>
    </button>
  );
}

export function WeekCalendar({ activeDate, onSelect, weekOffset, onWeekChange }: WeekCalendarProps) {
  const [direction, setDirection] = useState(1);
  const days = getWeekDays(weekOffset);

  const goToWeek = (dir: number) => {
    setDirection(dir);
    onWeekChange(weekOffset + dir);
  };

  return (
    // pt-3 so card shadow above the row is never clipped; overflow-visible for the same reason
    <div className="px-4 pt-3 pb-3 overflow-visible">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={weekOffset}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d * 56, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit:  (d: number) => ({ x: -d * 56, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: easing.easeOut }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -48) goToWeek(1);
            else if (info.offset.x > 48) goToWeek(-1);
          }}
          className="flex justify-between items-center select-none"
          style={{ cursor: "grab", touchAction: "pan-y" }}
        >
          {days.map(({ letter, date, isSunday }) => (
            <DayButton
              key={`${weekOffset}-${date}`}
              letter={letter}
              date={date}
              isSunday={isSunday}
              isActive={date === activeDate}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
