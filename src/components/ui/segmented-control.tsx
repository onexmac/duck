"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "motion/react"
import { spring } from "@/lib/motion-tokens"

// ─── Types ────────────────────────────────────────────────────────────────────

interface SegmentedControlProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onTabChange: (id: string) => void
}

// ─── TabLabel ─────────────────────────────────────────────────────────────────
// Defined outside SegmentedControl so React never treats it as a new component
// type on re-render — which would cause full unmount/remount and reset the
// useTransform motion state on every keystroke or state update above.

interface TabLabelProps {
  tab: { id: string; label: string }
  index: number
  pillX: MotionValue<number>
  tabWidth: number
  onPointerDown: (id: string) => void
}

function TabLabel({ tab, index, pillX, tabWidth, onPointerDown }: TabLabelProps) {
  const color = useTransform(pillX, (x) => {
    if (tabWidth <= 0) return "var(--color-text-secondary)"
    const center = index * tabWidth + tabWidth / 2
    const pillCenter = x + tabWidth / 2
    const distance = Math.abs(center - pillCenter)
    const t = Math.max(0, 1 - distance / tabWidth)
    return t > 0.5 ? "var(--color-text-primary)" : "var(--color-text-secondary)"
  })

  return (
    <motion.button
      type="button"
      onPointerDown={(e) => {
        e.preventDefault()
        onPointerDown(tab.id)
      }}
      className="relative z-10 flex-1 select-none text-center"
      style={{
        fontFamily: "Roboto, sans-serif",
        fontWeight: 700,
        fontSize: "16px",
        letterSpacing: "0.8px",
        color,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px 0",
      }}
    >
      {tab.label}
    </motion.button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SegmentedControl({
  tabs,
  activeTab,
  onTabChange,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const activeIndex = tabs.findIndex((t) => t.id === activeTab)
  const tabWidth = containerWidth / tabs.length

  // The pill x position driven by drag + programmatic animation
  const pillX = useMotionValue(activeIndex * tabWidth)

  // ─── Measure container ────────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      // containerWidth = inner width minus padding (4px each side)
      setContainerWidth(el.clientWidth - 8)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ─── Sync pill position when activeTab or measurements change ─────────

  useEffect(() => {
    if (tabWidth <= 0) return
    animate(pillX, activeIndex * tabWidth, spring.snappy)
  }, [activeIndex, tabWidth, pillX])

  // ─── Drag state ───────────────────────────────────────────────────────

  const dragStartX = useRef(0)
  const dragStartPillX = useRef(0)
  const isDragging = useRef(false)
  const lastPointerX = useRef(0)
  const lastTimestamp = useRef(0)
  const velocityX = useRef(0)

  const handlePillPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (tabWidth <= 0) return

      isDragging.current = true
      dragStartX.current = e.clientX
      dragStartPillX.current = pillX.get()
      lastPointerX.current = e.clientX
      lastTimestamp.current = e.timeStamp
      velocityX.current = 0

      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)
    },
    [pillX, tabWidth],
  )

  const handlePillPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || tabWidth <= 0) return

      const dx = e.clientX - dragStartX.current
      const maxX = (tabs.length - 1) * tabWidth
      const rawX = dragStartPillX.current + dx
      // Clamp with rubber-band feel at edges
      const clampedX = Math.max(-tabWidth * 0.1, Math.min(maxX + tabWidth * 0.1, rawX))

      pillX.set(clampedX)

      // Track velocity
      const dt = e.timeStamp - lastTimestamp.current
      if (dt > 0) {
        velocityX.current = (e.clientX - lastPointerX.current) / dt * 1000
      }
      lastPointerX.current = e.clientX
      lastTimestamp.current = e.timeStamp
    },
    [pillX, tabWidth, tabs.length],
  )

  const handlePillPointerUp = useCallback(() => {
    if (!isDragging.current || tabWidth <= 0) return
    isDragging.current = false

    const currentX = pillX.get()
    const offset = currentX - dragStartPillX.current
    const velocity = velocityX.current

    let targetIndex = activeIndex

    // Determine target based on offset or velocity thresholds
    if (offset > 30 || velocity > 200) {
      targetIndex = Math.min(activeIndex + 1, tabs.length - 1)
    } else if (offset < -30 || velocity < -200) {
      targetIndex = Math.max(activeIndex - 1, 0)
    } else {
      // Snap to nearest based on current position
      targetIndex = Math.round(currentX / tabWidth)
      targetIndex = Math.max(0, Math.min(tabs.length - 1, targetIndex))
    }

    if (targetIndex !== activeIndex) {
      onTabChange(tabs[targetIndex].id)
    } else {
      // Snap back to current active position
      animate(pillX, activeIndex * tabWidth, spring.snappy)
    }
  }, [pillX, tabWidth, activeIndex, tabs, onTabChange])

  // ─── Tab label tap ────────────────────────────────────────────────────

  const handleTabPointerDown = useCallback(
    (id: string) => {
      if (id !== activeTab) {
        onTabChange(id)
      }
    },
    [activeTab, onTabChange],
  )

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className="relative flex items-center rounded-[20px] bg-bg-page p-[4px]"
    >
      {/* Sliding pill indicator */}
      <motion.div
        className="absolute top-[4px] bottom-[4px] rounded-[20px] bg-bg-surface"
        style={{
          x: pillX,
          width: tabWidth > 0 ? tabWidth : "50%",
          boxShadow:
            "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
          touchAction: "none",
        }}
        onPointerDown={handlePillPointerDown}
        onPointerMove={handlePillPointerMove}
        onPointerUp={handlePillPointerUp}
        onPointerCancel={handlePillPointerUp}
      />

      {/* Tab labels */}
      {tabs.map((tab, i) => (
        <TabLabel
          key={tab.id}
          tab={tab}
          index={i}
          pillX={pillX}
          tabWidth={tabWidth}
          onPointerDown={handleTabPointerDown}
        />
      ))}
    </div>
  )
}
