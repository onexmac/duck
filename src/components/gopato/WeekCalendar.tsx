"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { easing } from "@/lib/motion-tokens";

// Appointment indicator dot colours — service category palette, not semantic
const DOTS = ["#9b98d6", "#f0776f", "#ffc736", "#85b3f8"];

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];
const BASE_SUN = 9; // March 9, 2026 = offset 0

function getWeekDays(weekOffset: number) {
  const start = BASE_SUN + weekOffset * 7;
  return DAY_NAMES.map((letter, i) => ({
    letter,
    date: start + i,
    isSunday: i === 0 || i === 6,
  }));
}

interface WeekCalendarProps {
  activeDate: number;
  onSelect: (date: number) => void;
  weekOffset: number;
  onWeekChange: (offset: number) => void;
}

export function WeekCalendar({ activeDate, onSelect, weekOffset, onWeekChange }: WeekCalendarProps) {
  const [direction, setDirection] = useState(1);
  const days = getWeekDays(weekOffset);

  const goToWeek = (dir: number) => {
    setDirection(dir);
    onWeekChange(weekOffset + dir);
  };

  return (
    <div className="px-4 pt-1 pb-3 overflow-hidden">
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
          {days.map(({ letter, date, isSunday }) => {
            const isActive = date === activeDate;
            return (
              <motion.button
                key={`${weekOffset}-${date}`}
                onClick={() => onSelect(date)}
                whileTap={{ scale: 0.82 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex flex-col items-center relative"
                style={{ minWidth: 40, WebkitTapHighlightColor: "transparent" }}
              >
                {/* Sliding card background */}
                {isActive && (
                  <motion.div
                    layoutId="dayCard"
                    className="absolute rounded-[16px] bg-bg-surface"
                    style={{
                      inset: "0px",
                      top: -8, bottom: -8, left: -6, right: -6,
                      boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.35)",
                      zIndex: 0,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}

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
                  }}
                >
                  {letter}
                </span>

                {/* Day number */}
                <motion.span
                  className="relative z-10 leading-tight mt-0.5"
                  animate={{
                    color: isActive
                      ? "var(--color-text-primary)"
                      : isSunday
                        ? "var(--color-text-link)"
                        : "var(--color-text-primary)",
                  }}
                  transition={{ duration: 0.15 }}
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: isActive ? 24 : 16,
                    fontWeight: isActive ? 900 : 400,
                  }}
                >
                  {date}
                </motion.span>

                {/* Appointment dots */}
                <AnimatePresence>
                  {isActive ? (
                    <motion.div
                      key="dots"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.18 }}
                      className="relative z-10 flex gap-[3px] mt-1.5 pb-2"
                    >
                      {DOTS.map((color) => (
                        <div key={color} className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: color }} />
                      ))}
                    </motion.div>
                  ) : (
                    <div key="spacer" className="pb-2" style={{ height: 16 }} />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
