# Animation System

## Library

```ts
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react"
// NOT "framer-motion" — the package is "motion"
```

---

## Spring Presets

Always use named presets. Never hand-tune spring values per component.

```ts
export const SPRING_SNAPPY: SpringOptions = {
  type: "spring",
  stiffness: 400,
  damping: 30,
}

export const SPRING_PANEL: SpringOptions = {
  type: "spring",
  stiffness: 300,
  damping: 35,
}

export const SPRING_HEAVY: SpringOptions = {
  type: "spring",
  stiffness: 200,
  damping: 40,
}
```

| Preset | Use for |
|---|---|
| `SPRING_SNAPPY` | Micro-interactions: press states, checkbox, swipe snap-back |
| `SPRING_PANEL` | Sheets, drawers, sidebars sliding in/out |
| `SPRING_HEAVY` | List reorder FLIP, layout shifts with items |

---

## AnimatePresence

```jsx
// Always use mode="popLayout" for lists — removes the exiting item from flow
// immediately so remaining items can FLIP into position.
<AnimatePresence mode="popLayout">
  {items.map(item => (
    <motion.div key={item.id} layout exit={{ opacity: 0, scale: 0.95 }}>
      ...
    </motion.div>
  ))}
</AnimatePresence>

// Use mode="wait" for page transitions or section swaps (one out, then one in)
<AnimatePresence mode="wait">
  <motion.div key={currentView} ...>
    ...
  </motion.div>
</AnimatePresence>
```

---

## useMotionValue

Use for values that change frequently (drag position, scroll offset) without triggering re-renders.

```ts
const x = useMotionValue(0)
// Drive CSS directly — no useState, no re-render on every pointer move
<motion.div style={{ x }} />
```
