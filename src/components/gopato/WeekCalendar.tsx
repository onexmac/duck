"use client";
// GoPato — week calendar strip
// Faithful to Figma node 7486:7388
//
// Selected date: white rounded card (soft shadow) with letter on top,
//   large bold number, and 4 colored appointment-indicator dots
// Sunday: blue text
// Inactive days: small gray letter + gray number

const DAYS = [
  { letter: "S", date: 10, isSunday: true },
  { letter: "M", date: 11 },
  { letter: "T", date: 12 },
  { letter: "W", date: 13 },
  { letter: "T", date: 14 },
  { letter: "F", date: 15 },
  { letter: "S", date: 16 },
];

// Appointment indicator dots — decorative, faithful to Figma AGENDED node
const DOTS = ["#9b98d6", "#f0776f", "#ffc736", "#85b3f8"];

interface WeekCalendarProps {
  activeDate?: number;
  onSelect?: (date: number) => void;
}

export function WeekCalendar({ activeDate = 13, onSelect }: WeekCalendarProps) {
  return (
    <div className="px-4 pt-1 pb-3">
      <div className="flex justify-between items-end">
        {DAYS.map(({ letter, date, isSunday }) => {
          const isActive = date === activeDate;

          if (isActive) {
            // Selected date card — white rounded rect with shadow
            return (
              <button
                key={date}
                onClick={() => onSelect?.(date)}
                className="flex flex-col items-center rounded-[16px] pt-2 pb-2"
                style={{
                  background: "#fdfdfd",
                  boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.3)",
                  minWidth: 44,
                }}
              >
                <span
                  className="text-[12px] font-medium tracking-wider"
                  style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
                >
                  {letter}
                </span>
                <span
                  className="text-[24px] font-black leading-tight mt-0.5"
                  style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
                >
                  {date}
                </span>
                {/* Appointment dots */}
                <div className="flex gap-[3px] mt-1.5">
                  {DOTS.map((color) => (
                    <div
                      key={color}
                      className="w-[6px] h-[6px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            );
          }

          // Inactive day
          return (
            <button
              key={date}
              onClick={() => onSelect?.(date)}
              className="flex flex-col items-center gap-1 w-9"
            >
              <span
                className="text-[12px] font-medium tracking-wider"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: isSunday ? "#4c82ee" : "#b4b8d2",
                }}
              >
                {letter}
              </span>
              <span
                className="text-[16px] leading-tight"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: isSunday ? "#4c82ee" : "#2f3644",
                }}
              >
                {date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
