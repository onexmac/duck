# UI Stack

## Core Libraries

| Library | Package | Purpose |
|---|---|---|
| React | `react` | UI framework |
| Motion | `motion` | Animation (spring physics, layout, presence) |
| dnd-kit | `@dnd-kit/core` `@dnd-kit/sortable` | Drag and drop |
| Zustand | `zustand` | Global state |
| Tailwind CSS | `tailwindcss` | Utility-first styling |
| shadcn/ui | copied into `src/components/ui/` | Accessible component primitives |

---

## Motion (`motion/react`)

```bash
npm install motion
```

```ts
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react"
```

Key APIs used in this project:
- `motion.div` / `motion.li` — animated elements
- `AnimatePresence mode="popLayout"` — exit animations for list items
- `AnimatePresence mode="wait"` — page/section transitions
- `layout` prop — automatic FLIP animation on position change
- `useMotionValue` — imperative motion values (drag tracking, no re-render)
- `animate()` — imperative animation (snap-back, programmatic)

---

## dnd-kit

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

```ts
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
```

Always `PointerSensor`. Never `MouseSensor` / `TouchSensor` separately.

---

## Zustand

```bash
npm install zustand
```

```ts
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist, devtools } from "zustand/middleware"
```

---

## Tailwind + shadcn

```bash
npm install -D tailwindcss
npx shadcn@latest init
npx shadcn@latest add button checkbox input sheet
```

shadcn components are copied into `src/components/ui/` — edit them in place.
They are not a runtime dependency. Never import from a shadcn npm package.
