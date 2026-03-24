'use client'

import { PROJECT_START, TOTAL_DAYS } from './data'

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

interface MonthSpan {
  label: string
  startDay: number
  days: number
}

function buildMonthSpans(): MonthSpan[] {
  const spans: MonthSpan[] = []
  let cursor = new Date(PROJECT_START)
  cursor.setDate(1) // rewind to month start

  while (true) {
    const y = cursor.getFullYear()
    const m = cursor.getMonth()

    // first visible day in this month
    const firstVisible = new Date(y, m, 1)
    const startDay = Math.max(
      0,
      Math.round((firstVisible.getTime() - PROJECT_START.getTime()) / 86_400_000),
    )
    if (startDay >= TOTAL_DAYS) break

    // last day of this month
    const lastOfMonth  = new Date(y, m + 1, 0)
    const endDay       = Math.min(
      TOTAL_DAYS - 1,
      Math.round((lastOfMonth.getTime() - PROJECT_START.getTime()) / 86_400_000),
    )
    const days = endDay - startDay + 1

    spans.push({ label: `${MONTHS_ES[m]} ${y}`, startDay, days })

    // advance to next month
    cursor = new Date(y, m + 1, 1)
    if (cursor.getFullYear() > new Date(PROJECT_START.getFullYear(), 11, 31).getFullYear() + 1) break
  }
  return spans
}

function buildWeekMarkers(): { day: number; label: string }[] {
  const markers: { day: number; label: string }[] = []
  for (let d = 0; d < TOTAL_DAYS; d++) {
    const date = new Date(PROJECT_START)
    date.setDate(date.getDate() + d)
    if (date.getDay() === 1) { // Monday
      markers.push({
        day: d,
        label: date.toLocaleDateString('es-CR', { day: 'numeric' }),
      })
    }
  }
  return markers
}

// ─── Component ────────────────────────────────────────────────────────────────

interface TimeHeaderProps {
  pixelsPerDay: number
  todayOffset:  number
}

export function TimeHeader({ pixelsPerDay, todayOffset }: TimeHeaderProps) {
  const monthSpans  = buildMonthSpans()
  const weekMarkers = buildWeekMarkers()
  const totalWidth  = TOTAL_DAYS * pixelsPerDay

  const showWeeks = pixelsPerDay >= 5

  return (
    <div
      className="relative select-none"
      style={{ width: totalWidth, flexShrink: 0 }}
    >
      {/* ── Month row ──────────────────────────────────────────────────────── */}
      <div className="relative h-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {monthSpans.map((span) => (
          <div
            key={span.label}
            className="absolute top-0 bottom-0 flex items-center overflow-hidden"
            style={{
              left:  span.startDay * pixelsPerDay,
              width: span.days     * pixelsPerDay,
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-widest px-2"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}
            >
              {span.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Week / day ticks row ───────────────────────────────────────────── */}
      {showWeeks && (
        <div className="relative h-6">
          {weekMarkers.map((w) => (
            <div
              key={w.day}
              className="absolute top-0 bottom-0 flex items-center"
              style={{
                left:        w.day * pixelsPerDay,
                borderRight: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <span
                className="text-[9px] pl-1"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                {w.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── TODAY marker ──────────────────────────────────────────────────── */}
      {todayOffset >= 0 && todayOffset < TOTAL_DAYS && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: todayOffset * pixelsPerDay }}
        >
          {/* pill */}
          <div
            className="absolute top-1 -translate-x-1/2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
            style={{
              background: '#ef4444',
              color: '#fff',
              boxShadow: '0 0 8px rgba(239,68,68,0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            Hoy
          </div>
          {/* line stub in header */}
          <div
            className="absolute bottom-0 w-px"
            style={{ top: 20, background: 'rgba(239,68,68,0.5)' }}
          />
        </div>
      )}
    </div>
  )
}
