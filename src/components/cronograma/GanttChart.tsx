'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { spring } from '@/lib/motion-tokens'
import { useCronogramaStore, useFilteredActivities } from '@/store/cronograma.store'
import {
  GROUPS,
  CategoryId,
  TOTAL_DAYS,
  dayOffset,
  PROJECT_START,
  CATEGORY_LABELS,
  STATUS_LABELS,
} from './data'
import { TimeHeader } from './TimeHeader'
import { ActivityBar } from './ActivityBar'

// ─── Layout constants ─────────────────────────────────────────────────────────

const LEFT_PANEL_W  = 280  // px — sticky label column
const ROW_HEIGHT    = 40   // px — task row
const GROUP_ROW_H   = 36   // px — group header row
const MIN_BAR_LABEL = 48   // px — below this width, hide label inside bar

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayOffsetDays(): number {
  const today = new Date()
  return Math.round((today.getTime() - PROJECT_START.getTime()) / 86_400_000)
}

// ─── Group row ────────────────────────────────────────────────────────────────

function GroupRow({
  groupId,
  pixelsPerDay,
  isCollapsed,
  onToggle,
  activityCount,
}: {
  groupId:       CategoryId
  pixelsPerDay:  number
  isCollapsed:   boolean
  onToggle:      () => void
  activityCount: number
}) {
  const group      = GROUPS.find((g) => g.id === groupId)!
  const totalWidth = TOTAL_DAYS * pixelsPerDay

  return (
    <div
      className="flex sticky z-10"
      style={{
        height:     GROUP_ROW_H,
        background: '#0d0f14',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        top: 53, // below time header (sticky)
      }}
    >
      {/* ── Left label (sticky) ─────────────────────────────────────────── */}
      <div
        className="sticky left-0 z-20 flex items-center gap-2 px-4"
        style={{
          width:      LEFT_PANEL_W,
          flexShrink: 0,
          background: '#0d0f14',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <motion.button
          onPointerDown={onToggle}
          className="flex items-center justify-center rounded"
          style={{
            width: 18, height: 18,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
          }}
          animate={{ rotate: isCollapsed ? -90 : 0 }}
          transition={spring.snappy}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 3L4 5.5L6.5 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.button>

        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: group.color, boxShadow: `0 0 6px ${group.color}88` }}
        />

        <span
          className="text-[11px] font-bold truncate flex-1"
          style={{ color: group.color, letterSpacing: '0.02em' }}
        >
          {group.label}
        </span>

        <span
          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{
            background: `${group.color}18`,
            color:       `${group.color}99`,
            border:      `1px solid ${group.color}22`,
          }}
        >
          {activityCount}
        </span>
      </div>

      {/* ── Summary bar in timeline ──────────────────────────────────────── */}
      <div
        className="relative flex-1 flex items-center"
        style={{ width: totalWidth }}
      >
        {/* Group span bar — start to end of all children */}
        <div
          className="absolute h-1 rounded-full opacity-25"
          style={{
            left:       dayOffset(group.startDate) * pixelsPerDay,
            width:      (dayOffset(group.endDate) - dayOffset(group.startDate)) * pixelsPerDay,
            background: group.color,
          }}
        />
      </div>
    </div>
  )
}

// ─── Activity row ─────────────────────────────────────────────────────────────

function ActivityRow({
  activity,
  isOdd,
  pixelsPerDay,
  todayOff,
}: {
  activity:     ReturnType<typeof useFilteredActivities>[number]
  isOdd:        boolean
  pixelsPerDay: number
  todayOff:     number
}) {
  const { updateActivity } = useCronogramaStore()
  const group     = GROUPS.find((g) => g.id === activity.groupId)!
  const totalWidth = TOTAL_DAYS * pixelsPerDay

  return (
    <motion.div
      layout
      transition={spring.snappy}
      className="flex"
      style={{
        height:       ROW_HEIGHT,
        background:   isOdd ? '#111318' : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.025)',
      }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
    >
      {/* ── Label (sticky) ──────────────────────────────────────────────── */}
      <div
        className="sticky left-0 z-10 flex items-center gap-3 pl-9 pr-4"
        style={{
          width:      LEFT_PANEL_W,
          flexShrink: 0,
          background: isOdd ? '#111318' : '#0d0f14',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        {/* Status dot */}
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: activity.status === 'en_proceso' ? '#22d3ee'
              : activity.status === 'completado' ? '#4ade80'
              : 'rgba(255,255,255,0.2)',
            boxShadow: activity.status === 'en_proceso'
              ? '0 0 4px rgba(34,211,238,0.6)'
              : 'none',
          }}
        />

        <span
          className="text-[11px] truncate flex-1"
          style={{
            color: activity.status === 'pendiente'
              ? 'rgba(255,255,255,0.35)'
              : 'rgba(255,255,255,0.75)',
            fontWeight: 500,
          }}
          title={activity.name}
        >
          {activity.name}
        </span>

        {/* Duration badge */}
        <span
          className="shrink-0 text-[9px] font-medium"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          {activity.duration}d
        </span>
      </div>

      {/* ── Timeline area ──────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{ width: totalWidth, flexShrink: 0 }}
      >
        <ActivityBar
          activity={activity}
          group={group}
          pixelsPerDay={pixelsPerDay}
          todayOffset={todayOff}
          onUpdate={updateActivity}
        />
      </div>
    </motion.div>
  )
}

// ─── Main GanttChart ──────────────────────────────────────────────────────────

export function GanttChart() {
  const { pixelsPerDay, collapsedGroups, toggleGroup } = useCronogramaStore()
  const filteredActivities = useFilteredActivities()
  const scrollRef = useRef<HTMLDivElement>(null)

  const todayOff   = todayOffsetDays()
  const totalWidth = TOTAL_DAYS * pixelsPerDay

  // Group activities
  const groupedActivities = GROUPS.map((g) => ({
    group:      g,
    activities: filteredActivities.filter((a) => a.groupId === g.id),
  })).filter((g) => g.activities.length > 0)

  // Scroll to today on mount / when ppd changes
  const scrollToToday = () => {
    if (!scrollRef.current) return
    const x = LEFT_PANEL_W + todayOff * pixelsPerDay - 200
    scrollRef.current.scrollLeft = Math.max(0, x)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ minHeight: 0 }}>
      {/* ── Scrollable chart area ──────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
      >
        <div style={{ minWidth: LEFT_PANEL_W + totalWidth + 80 }}>

          {/* ── Sticky time header ────────────────────────────────────────── */}
          <div
            className="sticky top-0 z-20 flex"
            style={{
              background:   '#0d0f14',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Corner cell */}
            <div
              className="sticky left-0 z-30 flex items-end px-4 pb-1.5"
              style={{
                width:      LEFT_PANEL_W,
                flexShrink: 0,
                background: '#0d0f14',
                borderRight: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}
              >
                Actividad
              </span>

              {/* Today shortcut */}
              <button
                className="ml-auto text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  border:     '1px solid rgba(239,68,68,0.3)',
                  color:      '#ef4444',
                  cursor:     'pointer',
                }}
                onPointerDown={scrollToToday}
              >
                Hoy
              </button>
            </div>

            {/* Time header */}
            <TimeHeader pixelsPerDay={pixelsPerDay} todayOffset={todayOff} />
          </div>

          {/* ── Rows ──────────────────────────────────────────────────────── */}
          {groupedActivities.map(({ group, activities }) => {
            const isCollapsed = collapsedGroups.includes(group.id)

            return (
              <div key={group.id}>
                <GroupRow
                  groupId={group.id}
                  pixelsPerDay={pixelsPerDay}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleGroup(group.id)}
                  activityCount={activities.length}
                />

                <AnimatePresence initial={false}>
                  {!isCollapsed &&
                    activities.map((activity, idx) => (
                      <ActivityRow
                        key={activity.id}
                        activity={activity}
                        isOdd={idx % 2 === 1}
                        pixelsPerDay={pixelsPerDay}
                        todayOff={todayOff}
                      />
                    ))}
                </AnimatePresence>
              </div>
            )
          })}

          {/* Empty state */}
          {groupedActivities.length === 0 && (
            <div
              className="flex flex-col items-center justify-center gap-3 py-20"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="4" y="15" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.25" />
                <rect x="4" y="22" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
              </svg>
              <span className="text-[12px]">Sin actividades para los filtros seleccionados</span>
            </div>
          )}

          {/* Bottom padding */}
          <div style={{ height: 40 }} />
        </div>
      </div>
    </div>
  )
}
