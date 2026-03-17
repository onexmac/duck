"use client";
// GoPato — week calendar strip
// Colors extracted from Figma: active day #FFC736 bg, Sunday #4c82ee, day labels #b4b8d2

const DAYS = [
  { label: "S", date: 10, isSunday: true },
  { label: "M", date: 11 },
  { label: "T", date: 12 },
  { label: "W", date: 13 },
  { label: "T", date: 14 },
  { label: "F", date: 15 },
  { label: "S", date: 16 },
];

interface WeekCalendarProps {
  activeDate?: number;
  onSelect?: (date: number) => void;
}

export function WeekCalendar({ activeDate = 13, onSelect }: WeekCalendarProps) {
  return (
    <div className="px-5 pt-1 pb-2">
      <div className="flex justify-between items-center">
        {DAYS.map(({ label, date, isSunday }) => {
          const isActive = date === activeDate;
          return (
            <button
              key={date}
              onClick={() => onSelect?.(date)}
              className="flex flex-col items-center gap-1 w-9"
            >
              {/* Day letter */}
              <span
                className="text-[11px] font-medium tracking-wider uppercase"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  color: isSunday ? "#4c82ee" : "#b4b8d2",
                }}
              >
                {label}
              </span>
              {/* Date bubble */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isActive ? "#FFC736" : "transparent",
                }}
              >
                <span
                  className="text-[16px] font-normal leading-tight"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    color: isActive
                      ? "#ffffff"
                      : isSunday
                      ? "#4c82ee"
                      : "#2f3644",
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {date}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
