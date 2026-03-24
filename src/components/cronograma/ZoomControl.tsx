'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { spring } from '@/lib/motion-tokens'
import { useCronogramaStore } from '@/store/cronograma.store'

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_PPD  = 3   // pixels per day — "month" view
const MAX_PPD  = 22  // pixels per day — "day" view
const TRACK_W  = 200

function ppdToPercent(ppd: number) {
  return (ppd - MIN_PPD) / (MAX_PPD - MIN_PPD)
}

function percentToPpd(pct: number) {
  return Math.round(MIN_PPD + pct * (MAX_PPD - MIN_PPD))
}

// ─── Zoom labels ──────────────────────────────────────────────────────────────

const STOPS = [
  { label: 'Mes',    ppd: MIN_PPD },
  { label: 'Semana', ppd: 8       },
  { label: 'Día',    ppd: MAX_PPD },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function ZoomControl() {
  const { pixelsPerDay, setPixelsPerDay } = useCronogramaStore()
  const trackRef = useRef<HTMLDivElement>(null)

  const thumbPct = ppdToPercent(pixelsPerDay)

  // ── Drag the thumb ─────────────────────────────────────────────────────────
  const isDragging = useRef(false)

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    isDragging.current = true
    updateFromPointer(e.clientX)
  }

  const onDragMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    updateFromPointer(e.clientX)
  }

  const onDragEnd = () => {
    isDragging.current = false
  }

  const updateFromPointer = (clientX: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setPixelsPerDay(percentToPpd(pct))
  }

  // ── Click on track ─────────────────────────────────────────────────────────
  const onTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setPixelsPerDay(percentToPpd(pct))
  }

  // ── View label ─────────────────────────────────────────────────────────────
  const viewLabel =
    pixelsPerDay <= 4  ? 'Vista mensual'
    : pixelsPerDay <= 9 ? 'Vista semanal'
    : pixelsPerDay <= 14 ? 'Vista quincenal'
    : 'Vista diaria'

  return (
    <div
      className="flex items-center gap-4 px-5 py-3 select-none"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Label */}
      <span className="text-[9px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', minWidth: 80 }}>
        {viewLabel}
      </span>

      {/* Track + thumb ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {STOPS.map((stop, i) => (
          <span
            key={stop.label}
            className="text-[9px] font-medium cursor-pointer"
            style={{
              color: Math.abs(pixelsPerDay - stop.ppd) < 2
                ? 'rgba(255,255,255,0.7)'
                : 'rgba(255,255,255,0.2)',
              transition: 'color 0.15s',
            }}
            onPointerDown={() => setPixelsPerDay(stop.ppd)}
          >
            {stop.label}
          </span>
        ))}
      </div>

      {/* Slider ──────────────────────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="relative flex items-center cursor-pointer"
        style={{ width: TRACK_W, height: 20 }}
        onClick={onTrackClick}
      >
        {/* Track background */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{
            height: 3,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.08)',
          }}
        />

        {/* Active fill */}
        <div
          className="absolute left-0 rounded-full"
          style={{
            height: 3,
            top: '50%',
            transform: 'translateY(-50%)',
            width: `${thumbPct * 100}%`,
            background: 'linear-gradient(to right, #4C82EE, #a78bfa)',
            transition: 'width 0.05s',
          }}
        />

        {/* Stop dots */}
        {STOPS.map((stop) => (
          <div
            key={stop.ppd}
            className="absolute w-1 h-1 rounded-full -translate-x-0.5 -translate-y-0.5"
            style={{
              left:       `${ppdToPercent(stop.ppd) * 100}%`,
              top:        '50%',
              background: 'rgba(255,255,255,0.25)',
            }}
          />
        ))}

        {/* Thumb */}
        <motion.div
          className="absolute z-10"
          style={{
            left:   `${thumbPct * 100}%`,
            top:    '50%',
            x:      '-50%',
            y:      '-50%',
            width:  14,
            height: 14,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 0 2px rgba(76,130,238,0.4), 0 2px 8px rgba(0,0,0,0.4)',
            cursor: 'ew-resize',
            touchAction: 'none',
          }}
          whileTap={{ scale: 1.2 }}
          transition={spring.press}
          onPointerDown={startDrag}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
        />
      </div>

      {/* PPD indicator */}
      <span
        className="text-[9px] font-mono shrink-0"
        style={{ color: 'rgba(255,255,255,0.2)', minWidth: 60 }}
      >
        {pixelsPerDay}px/día
      </span>

      {/* Keyboard shortcuts hint */}
      <div className="ml-auto flex items-center gap-3">
        <button
          className="flex items-center justify-center rounded text-base font-bold"
          style={{
            width: 22, height: 22,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
          }}
          onPointerDown={() => setPixelsPerDay(pixelsPerDay - 1)}
        >
          −
        </button>
        <button
          className="flex items-center justify-center rounded text-base font-bold"
          style={{
            width: 22, height: 22,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
          }}
          onPointerDown={() => setPixelsPerDay(pixelsPerDay + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}
