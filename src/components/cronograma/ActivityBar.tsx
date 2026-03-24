'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import { spring } from '@/lib/motion-tokens'
import { Activity, dayOffset, formatDate, TOTAL_DAYS } from './data'
import { ActivityGroup } from './data'

// ─── Constants ────────────────────────────────────────────────────────────────

const BAR_HEIGHT     = 26
const ROW_HEIGHT     = 40
const HANDLE_WIDTH   = 8
const MIN_DAYS       = 1

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActivityBarProps {
  activity:      Activity
  group:         ActivityGroup
  pixelsPerDay:  number
  todayOffset:   number
  onUpdate:      (id: string, startDayOffset: number, newDuration: number) => void
}

type DragType = 'move' | 'resize-l' | 'resize-r' | null

// ─── Component ────────────────────────────────────────────────────────────────

export function ActivityBar({ activity, group, pixelsPerDay, todayOffset, onUpdate }: ActivityBarProps) {
  const barRef   = useRef<HTMLDivElement>(null)
  const [hoverZone, setHoverZone]   = useState<DragType>(null)
  const [activeType, setActiveType] = useState<DragType>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  const startDay = dayOffset(activity.startDate)
  const left     = startDay * pixelsPerDay
  const width    = activity.duration * pixelsPerDay

  // Motion values for smooth live drag
  const xMV = useMotionValue(left)
  const wMV = useMotionValue(Math.max(pixelsPerDay * MIN_DAYS, width))

  // Sync when pixelsPerDay or activity data changes (from outside drag)
  const prevPPD = useRef(pixelsPerDay)
  const prevLeft  = useRef(left)
  const prevWidth = useRef(width)
  if (prevPPD.current !== pixelsPerDay || prevLeft.current !== left || prevWidth.current !== width) {
    if (activeType === null) {
      xMV.set(left)
      wMV.set(Math.max(pixelsPerDay * MIN_DAYS, width))
    }
    prevPPD.current   = pixelsPerDay
    prevLeft.current  = left
    prevWidth.current = width
  }

  // Drag state ref — avoids closure issues inside handlers
  const dragState = useRef<{
    type:        Exclude<DragType, null>
    startClientX: number
    startX:      number
    startW:      number
  } | null>(null)

  // ── Pointer handlers ────────────────────────────────────────────────────────

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()

    const rect = barRef.current!.getBoundingClientRect()
    const localX = e.clientX - rect.left
    const type: Exclude<DragType, null> =
      localX < HANDLE_WIDTH ? 'resize-l'
      : localX > rect.width - HANDLE_WIDTH ? 'resize-r'
      : 'move'

    barRef.current!.setPointerCapture(e.pointerId)
    dragState.current = {
      type,
      startClientX: e.clientX,
      startX: xMV.get(),
      startW: wMV.get(),
    }
    setActiveType(type)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current
    if (!ds) {
      // Update hover cursor
      const rect = barRef.current!.getBoundingClientRect()
      const localX = e.clientX - rect.left
      if (localX < HANDLE_WIDTH) setHoverZone('resize-l')
      else if (localX > rect.width - HANDLE_WIDTH) setHoverZone('resize-r')
      else setHoverZone('move')
      return
    }

    const delta = e.clientX - ds.startClientX

    if (ds.type === 'move') {
      const newX = Math.max(0, Math.min(ds.startX + delta, (TOTAL_DAYS - activity.duration) * pixelsPerDay))
      xMV.set(newX)
    } else if (ds.type === 'resize-r') {
      const newW = Math.max(pixelsPerDay * MIN_DAYS, ds.startW + delta)
      wMV.set(newW)
    } else {
      // resize-l: move left edge, shrink/grow from left
      const newW = Math.max(pixelsPerDay * MIN_DAYS, ds.startW - delta)
      const newX = ds.startX + ds.startW - newW
      xMV.set(Math.max(0, newX))
      wMV.set(newW)
    }
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragState.current
    if (!ds) return

    const delta = e.clientX - ds.startClientX

    // Snap to day grid
    let newStartDay = Math.round(xMV.get() / pixelsPerDay)
    let newDuration = Math.round(wMV.get() / pixelsPerDay)

    newStartDay = Math.max(0, Math.min(newStartDay, TOTAL_DAYS - newDuration))
    newDuration = Math.max(MIN_DAYS, newDuration)

    const snappedX = newStartDay * pixelsPerDay
    const snappedW = newDuration * pixelsPerDay

    animate(xMV, snappedX, spring.snappy)
    animate(wMV, snappedW, spring.snappy)

    onUpdate(activity.id, newStartDay, newDuration)

    dragState.current = null
    setActiveType(null)
  }

  const onPointerLeave = () => {
    if (!dragState.current) setHoverZone(null)
  }

  // ── Visual state ─────────────────────────────────────────────────────────────

  const isPending  = activity.status === 'pendiente'
  const isDragging = activeType !== null

  const cursor =
    activeType === 'move'     ? 'grabbing'
    : activeType === 'resize-l' || activeType === 'resize-r' ? 'ew-resize'
    : hoverZone === 'move'    ? 'grab'
    : hoverZone ? 'ew-resize'
    : 'grab'

  const barTop = (ROW_HEIGHT - BAR_HEIGHT) / 2

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ height: ROW_HEIGHT }}
    >
      {/* Today line — rendered per-row so it doesn't require a global overlay */}
      {todayOffset >= 0 && todayOffset <= TOTAL_DAYS && (
        <div
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{
            left:       todayOffset * pixelsPerDay,
            background: 'rgba(239,68,68,0.35)',
            zIndex:     1,
          }}
        />
      )}

      {/* ── The bar itself ──────────────────────────────────────────────────── */}
      <motion.div
        ref={barRef}
        className="absolute pointer-events-auto"
        style={{
          top:     barTop,
          height:  BAR_HEIGHT,
          x:       xMV,
          width:   wMV,
          cursor,
          zIndex:  isDragging ? 10 : 2,
          borderRadius: 6,
          overflow: 'hidden',
          // Pending = dashed/muted; En proceso = solid
          background: isPending
            ? `repeating-linear-gradient(
                -45deg,
                ${group.color}33 0px,
                ${group.color}33 4px,
                ${group.color}1a 4px,
                ${group.color}1a 8px
              )`
            : `linear-gradient(135deg, ${group.color}ee 0%, ${group.color}bb 100%)`,
          border: `1px solid ${group.color}${isPending ? '55' : '88'}`,
          boxShadow: isDragging
            ? `0 4px 24px ${group.glowColor}, 0 0 0 1px ${group.color}88`
            : `0 1px 4px rgba(0,0,0,0.4)`,
          userSelect: 'none',
          touchAction: 'none',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        transition={spring.snappy}
      >
        {/* ── Left resize handle indicator ─────────────────────────────────── */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width:      HANDLE_WIDTH,
            background: `linear-gradient(to right, ${group.color}44, transparent)`,
            cursor:     'ew-resize',
          }}
        />

        {/* ── Bar label (activity name) ─────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center overflow-hidden"
          style={{ paddingLeft: HANDLE_WIDTH + 4, paddingRight: HANDLE_WIDTH + 4 }}
        >
          <span
            className="text-[10px] font-semibold truncate leading-none"
            style={{
              color:      isPending ? `${group.color}cc` : '#fff',
              textShadow: isPending ? 'none' : '0 1px 2px rgba(0,0,0,0.5)',
              letterSpacing: '0.01em',
            }}
          >
            {activity.name}
          </span>
        </div>

        {/* ── Right resize handle indicator ────────────────────────────────── */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width:      HANDLE_WIDTH,
            background: `linear-gradient(to left, ${group.color}44, transparent)`,
            cursor:     'ew-resize',
          }}
        />
      </motion.div>

      {/* ── Tooltip ──────────────────────────────────────────────────────────── */}
      {showTooltip && !isDragging && (
        <motion.div
          className="absolute pointer-events-none z-50"
          style={{ top: barTop - 36, left: xMV }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="flex flex-col rounded-lg px-3 py-2 text-[11px] whitespace-nowrap shadow-xl"
            style={{
              background:  '#1e2235',
              border:      `1px solid ${group.color}44`,
              color:       '#e8eaf0',
              boxShadow:   `0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`,
            }}
          >
            <span className="font-semibold mb-0.5">{activity.name}</span>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>
              {formatDate(activity.startDate)} → {formatDate(activity.endDate)}
              {' · '}{activity.duration} días
            </span>
            {activity.comments && (
              <span className="mt-1" style={{ color: '#fb923c', fontSize: 10 }}>
                {activity.comments}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
