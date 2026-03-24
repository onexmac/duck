'use client'

import { motion, AnimatePresence } from 'motion/react'
import { spring } from '@/lib/motion-tokens'
import { useCronogramaStore } from '@/store/cronograma.store'
import { GROUPS, CategoryId, Status, STATUS_LABELS, CATEGORY_LABELS } from './data'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Chip {
  id:     string
  label:  string
  color?: string
}

// ─── Chip component ───────────────────────────────────────────────────────────

function FilterChip({
  chip,
  isActive,
  onSelect,
}: {
  chip:     Chip
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onPointerDown={onSelect}
      whileTap={{ scale: 0.95 }}
      transition={spring.press}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold shrink-0 select-none"
      style={{
        background: isActive
          ? chip.color
            ? `${chip.color}28`
            : 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0.04)',
        border: isActive
          ? `1px solid ${chip.color ?? 'rgba(255,255,255,0.25)'}55`
          : '1px solid rgba(255,255,255,0.07)',
        color: isActive
          ? chip.color ?? '#e8eaf0'
          : 'rgba(255,255,255,0.35)',
        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
      }}
    >
      {chip.color && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: chip.color, opacity: isActive ? 1 : 0.4 }}
        />
      )}
      {chip.label}
    </motion.button>
  )
}

// ─── Separator ────────────────────────────────────────────────────────────────

function Sep() {
  return (
    <div
      className="shrink-0 self-stretch w-px"
      style={{ background: 'rgba(255,255,255,0.07)', margin: '4px 4px' }}
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FilterBar() {
  const { filter, setFilter, activities } = useCronogramaStore()

  // Status chips
  const statusChips: Chip[] = [
    { id: 'all',        label: 'Todo' },
    { id: 'en_proceso', label: STATUS_LABELS.en_proceso, color: '#22d3ee' },
    { id: 'pendiente',  label: STATUS_LABELS.pendiente,  color: '#fb923c' },
    { id: 'completado', label: STATUS_LABELS.completado, color: '#4ade80' },
  ]

  // Category chips (only show if group has activities)
  const categoryChips: Chip[] = [
    { id: 'all', label: 'Todas' },
    ...GROUPS.map((g) => ({ id: g.id, label: CATEGORY_LABELS[g.id], color: g.color })),
  ]

  // Active count for context
  const inProgressCount = activities.filter((a) => a.status === 'en_proceso').length
  const pendingCount    = activities.filter((a) => a.status === 'pendiente').length

  return (
    <div
      className="flex items-center gap-2 px-5 py-2.5 overflow-x-auto"
      style={{
        borderBottom:   '1px solid rgba(255,255,255,0.05)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Status */}
      <span className="text-[9px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>
        Estado
      </span>
      <div className="flex items-center gap-1.5">
        {statusChips.map((chip) => (
          <FilterChip
            key={chip.id}
            chip={chip}
            isActive={filter.status === chip.id}
            onSelect={() => setFilter({ status: chip.id as Status | 'all' })}
          />
        ))}
      </div>

      <Sep />

      {/* Category */}
      <span className="text-[9px] font-bold uppercase tracking-widest shrink-0"
        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em' }}>
        Sección
      </span>
      <div className="flex items-center gap-1.5">
        {categoryChips.map((chip) => (
          <FilterChip
            key={chip.id}
            chip={chip}
            isActive={filter.category === chip.id}
            onSelect={() => setFilter({ category: chip.id as CategoryId | 'all' })}
          />
        ))}
      </div>

      <Sep />

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          minWidth: 160,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="4.5" cy="4.5" r="3.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <path d="M7.5 7.5L9 9" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Buscar actividad…"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="bg-transparent text-[11px] outline-none w-full"
          style={{ color: '#e8eaf0' }}
        />
        <AnimatePresence>
          {filter.search && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={spring.snappy}
              onPointerDown={() => setFilter({ search: '' })}
              className="shrink-0"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2L8 8M8 2L2 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Live count */}
      <div className="ml-auto shrink-0 flex items-center gap-2">
        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <span style={{ color: '#22d3ee', fontWeight: 700 }}>{inProgressCount}</span>
          {' '}activas · {' '}
          <span style={{ color: '#fb923c', fontWeight: 700 }}>{pendingCount}</span>
          {' '}pendientes
        </span>
      </div>
    </div>
  )
}
