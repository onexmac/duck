'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import { spring } from '@/lib/motion-tokens'
import { GanttChart }  from '@/components/cronograma/GanttChart'
import { FilterBar }   from '@/components/cronograma/FilterBar'
import { ZoomControl } from '@/components/cronograma/ZoomControl'
import { ACTIVITIES, GROUPS, PROJECT_START, PROJECT_END, STATUS_LABELS } from '@/components/cronograma/data'

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
  delay = 0,
}: {
  value: string | number
  label: string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl"
      style={{
        background:  'rgba(255,255,255,0.04)',
        border:      '1px solid rgba(255,255,255,0.07)',
        minWidth:    72,
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.snappy, delay }}
    >
      <span className="text-xl font-black leading-none" style={{ color }}>
        {value}
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
        {label}
      </span>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CronogramaPage() {
  // Compute stats
  const stats = useMemo(() => {
    const total      = ACTIVITIES.length
    const inProgress = ACTIVITIES.filter((a) => a.status === 'en_proceso').length
    const pending    = ACTIVITIES.filter((a) => a.status === 'pendiente').length
    const completed  = ACTIVITIES.filter((a) => a.status === 'completado').length

    const totalDays = Math.round(
      (PROJECT_END.getTime() - PROJECT_START.getTime()) / 86_400_000,
    )
    const today      = new Date()
    const elapsed    = Math.max(
      0,
      Math.round((today.getTime() - PROJECT_START.getTime()) / 86_400_000),
    )
    const progress   = Math.min(100, Math.round((elapsed / totalDays) * 100))

    const formattedEnd = PROJECT_END.toLocaleDateString('es-CR', {
      day: 'numeric', month: 'short', year: 'numeric',
    })

    return { total, inProgress, pending, completed, progress, formattedEnd }
  }, [])

  return (
    // Force dark mode for this page
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: '#0d0f14', color: '#e8eaf0', fontFamily: 'system-ui, sans-serif' }}
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-4 px-5 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Title */}
        <div>
          <div className="flex items-center gap-2">
            {/* Logo mark */}
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #4C82EE, #a78bfa)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="3" width="10" height="2" rx="1" fill="white" />
                <rect x="1" y="7" width="7"  height="2" rx="1" fill="white" opacity="0.6" />
              </svg>
            </div>
            <div>
              <h1
                className="text-[13px] font-black leading-none tracking-tight"
                style={{ color: '#e8eaf0' }}
              >
                Hacienda II
              </h1>
              <p
                className="text-[9px] font-medium leading-none mt-0.5"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Cronograma · {stats.formattedEnd}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.07)', margin: '2px 4px' }} />

        {/* Stats */}
        <div className="flex items-center gap-2">
          <StatCard value={stats.total}      label="Total"      color="#e8eaf0"  delay={0}    />
          <StatCard value={stats.inProgress} label="En proceso" color="#22d3ee"  delay={0.04} />
          <StatCard value={stats.pending}    label="Pendiente"  color="#fb923c"  delay={0.08} />
          <StatCard value={`${stats.progress}%`} label="Avance" color="#4C82EE" delay={0.12} />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Groups legend */}
        <div className="flex items-center gap-3">
          {GROUPS.map((g) => (
            <div key={g.id} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: g.color, boxShadow: `0 0 4px ${g.color}88` }}
              />
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {g.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar strip */}
        <div className="flex items-center gap-2">
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 100, height: 4, background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(to right, #4C82EE, #a78bfa)' }}
              initial={{ width: 0 }}
              animate={{ width: `${stats.progress}%` }}
              transition={{ ...spring.panel, delay: 0.2 }}
            />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {stats.progress}%
          </span>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────────── */}
      <FilterBar />

      {/* ── Gantt chart (fills remaining space) ─────────────────────────────── */}
      <GanttChart />

      {/* ── Zoom control ────────────────────────────────────────────────────── */}
      <ZoomControl />
    </div>
  )
}
