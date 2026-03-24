import { create } from 'zustand'
import {
  ACTIVITIES,
  GROUPS,
  Activity,
  ActivityGroup,
  CategoryId,
  Status,
  PROJECT_START,
  offsetToDate,
} from '@/components/cronograma/data'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FilterState {
  status:   Status | 'all'
  category: CategoryId | 'all'
  search:   string
}

interface CronogramaStore {
  // Data
  activities:      Activity[]
  groups:          ActivityGroup[]

  // UI state
  filter:          FilterState
  pixelsPerDay:    number
  collapsedGroups: CategoryId[]

  // Actions
  updateActivity:  (id: string, startDayOffset: number, newDuration: number) => void
  setFilter:       (partial: Partial<FilterState>) => void
  setPixelsPerDay: (ppd: number) => void
  toggleGroup:     (groupId: CategoryId) => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCronogramaStore = create<CronogramaStore>((set) => ({
  activities:      ACTIVITIES,
  groups:          GROUPS,
  filter:          { status: 'all', category: 'all', search: '' },
  pixelsPerDay:    7,
  collapsedGroups: [],

  updateActivity: (id, startDayOffset, newDuration) =>
    set((s) => ({
      activities: s.activities.map((a) => {
        if (a.id !== id) return a
        const start = offsetToDate(startDayOffset)
        const end   = offsetToDate(startDayOffset + newDuration)
        const fmt   = (d: Date) => d.toISOString().split('T')[0]
        return { ...a, startDate: fmt(start), endDate: fmt(end), duration: newDuration }
      }),
    })),

  setFilter: (partial) =>
    set((s) => ({ filter: { ...s.filter, ...partial } })),

  setPixelsPerDay: (ppd) => set({ pixelsPerDay: Math.max(3, Math.min(24, ppd)) }),

  toggleGroup: (groupId) =>
    set((s) => ({
      collapsedGroups: s.collapsedGroups.includes(groupId)
        ? s.collapsedGroups.filter((id) => id !== groupId)
        : [...s.collapsedGroups, groupId],
    })),
}))

// ─── Selectors ────────────────────────────────────────────────────────────────

export function useFilteredActivities() {
  const { activities, filter } = useCronogramaStore()
  return activities.filter((a) => {
    if (filter.status   !== 'all' && a.status  !== filter.status)   return false
    if (filter.category !== 'all' && a.groupId !== filter.category) return false
    if (filter.search && !a.name.toLowerCase().includes(filter.search.toLowerCase())) return false
    return true
  })
}
