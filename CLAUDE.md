# Duck System — Project Stack & Interaction Model

## Deployment
- **Vercel project:** `duck` (org: `onexmacs-projects`)
- **Branch preview:** https://duck-git-claude-setup-design-tokens-go9qf-onexmacs-projects.vercel.app/gopato/prototype
- **Always include the preview URL at the end of every response after making changes.**

---

## Goal
Build UIs that feel like Things 3 on React: zero-latency interactions,
spring-physics motion, gesture-driven UX. Not "smooth" in a generic sense —
specifically the Things 3 feel: snappy response on pointer down, organic
settle on release, no easing curves on interactive elements.

---

## Stack & Why Each Piece Was Chosen

### Motion (formerly Framer Motion)
The core of the Things 3 feel. Things uses spring physics throughout —
checkboxes, panel slides, list reorders. We replicate this with Motion's
spring transition config. Never use CSS transitions or ease curves for
interactive elements. Springs only.

**Spring presets** (defined in `src/lib/motion-tokens.ts`):

```ts
// Snappy — buttons, checkboxes, day selection
const spring      = { type: "spring", stiffness: 400, damping: 30 }

// Soft — panel/sheet slides, sidebars
const panelSpring = { type: "spring", stiffness: 280, damping: 26 }

// Heavy — completed-task settle, drag drop
const heavySpring = { type: "spring", stiffness: 200, damping: 40 }
```

Use `AnimatePresence` for every mount/unmount (task creation, deletion,
area collapse). Without it, exit animations won't run.

```tsx
<AnimatePresence mode="popLayout">
  {tasks.map(task => (
    <motion.li key={task.id} layout transition={spring}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
    >
      <TaskItem task={task} />
    </motion.li>
  ))}
</AnimatePresence>
```

The `layout` prop on list items is mandatory — it triggers FLIP animations
automatically when items reorder (drag-drop, completion sort, etc).
Without it, items teleport instead of sliding.

`mode="popLayout"` is preferred over `mode="sync"` for task lists — it
removes exiting items from flow immediately so the list reflows before the
exit animation finishes, matching Things 3's behavior.

---

### @dnd-kit/core + @dnd-kit/sortable (stable API)
Handles drag-and-drop for task reordering and moving between areas/projects.
Chosen over react-beautiful-dnd (abandoned). Works with Motion's layout
animations without conflict.

**Key pattern:** dnd-kit handles the drag logic, Motion handles the visual.
Do NOT let dnd-kit apply its own transforms — let Motion own position via `layout`.

```tsx
function SortableTask({ task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id: task.id })

  return (
    <motion.li
      ref={setNodeRef}
      layout
      transition={spring}
      animate={{ opacity: isDragging ? 0.4 : 1, scale: isDragging ? 1.02 : 1 }}
      {...attributes}
      {...listeners}
    >
      <TaskItem task={task} />
    </motion.li>
  )
}
```

Use `DragOverlay` for the drag ghost — it renders outside the list so it
can animate freely without affecting layout flow.

> **Note:** The project also has `@dnd-kit/react` (experimental v2 API) used
> in the Kanban board. For new sortable lists use `@dnd-kit/core` +
> `@dnd-kit/sortable` (stable). The v2 API is not stable enough for production.

---

### Zustand
State management. Chosen because the UI must feel instant — no async
dispatch cycles, no selector watchers causing cascading re-renders.
Zustand updates are synchronous and granular.

One store per domain. Flat structure only — no nested state trees.

```ts
// tasks.store.ts
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask:    (task) => set(s => ({ tasks: [task, ...s.tasks] })),
  completeTask: (id) => set(s => ({
    tasks: s.tasks.map(t => t.id === id ? { ...t, completed: true } : t)
  })),
  reorderTasks: (newOrder) => set({ tasks: newOrder }),
}))
```

**Never put animation state in Zustand.** Keep it local (`useState`/`useRef`).
Zustand is for data, not UI.

---

### Tailwind + CSS Custom Properties (Design Tokens)
Tailwind handles layout and spacing. Color, radius, and type tokens come
from the **Tokens Studio → Style Dictionary** pipeline as CSS custom
properties. Tailwind config consumes those vars.

**Never hardcode color values.** Always reference tokens:

```ts
// tailwind.config.ts — already configured
colors: {
  'bg-page':    'var(--color-bg-page)',
  'bg-surface': 'var(--color-bg-surface)',
  // …all tokens wired in
}
```

---

### shadcn/ui
Base component primitives (Dialog, DropdownMenu, Tooltip, etc).
Unstyled by default — all visual styling applied via the token layer.
Do **not** override shadcn internals with inline styles. Use `className`
prop and Tailwind utilities only.

---

## Interaction Patterns

### Pointer response — onPointerDown, not onClick
All interactive elements respond on `onPointerDown`, not `onClick`.
`onClick` fires after release — adds ~100ms of perceived latency.
Use `onPointerDown` to trigger visual feedback immediately.

```tsx
// In the Button component and all motion interactive elements:
const [pressed, setPressed] = useState(false)

<motion.button
  onPointerDown={() => setPressed(true)}
  onPointerUp={() => setPressed(false)}
  onPointerLeave={() => setPressed(false)}
  animate={{ scale: pressed ? 0.97 : 1 }}
  transition={{ type: "spring", stiffness: 600, damping: 35 }}
/>
```

### Checkbox completion
SVG checkmark path draws on completion. The circle scales in with spring.
The task row doesn't disappear immediately — it fades + slides out after
a ~300ms delay so the user can register the action.

```tsx
<motion.div
  animate={{ scale: checked ? 1 : 0 }}
  transition={{ type: "spring", stiffness: 500, damping: 28 }}
/>
```

### Swipe to schedule / delete
Use Motion `drag="x"` with `dragConstraints={{ left: -80, right: 0 }}`.
On `onDragEnd`, check velocity and offset.
Threshold: commit action if `velocity.x < -400` OR `offset.x < -60`.

```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: -80, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.velocity.x < -400 || info.offset.x < -60) triggerAction()
    else controls.start({ x: 0 })  // snap back
  }}
/>
```

### Panel / sidebar slide
Use `panelSpring`. Animate `x` for slide, **not `width`** — width
animations cause layout recalculation on every frame.

### List reorder (drag settle)
Dropped task settles with `heavySpring`. Drag ghost (`DragOverlay`) fades
out at 0.15s. Destination slot expands before drop via `AnimatePresence + layout`.

---

## What NOT To Do
- No `transition: { duration: X }` on interactive elements — springs only
- No `useEffect` chains for visual state — causes frame delays
- No `onClick` for primary interactions — use `onPointerDown`
- No `width`/`height` animations — animate `x`, `y`, `scale`, `opacity`
- No inline hardcoded colors — tokens only
- No Zustand for animation state — keep it local
- No `layoutId` on elements with siblings that should stay still —
  shared layout broadcasts recalculations to all motion siblings

---

## File Conventions
```
src/
  app/                  Next.js App Router pages
  components/
    ui/                 Duck System primitives (Button, Checkbox, …)
    gopato/             GoPato feature components
  lib/
    motion-tokens.ts    Spring presets + duration/easing constants
    utils.ts            cn() helper
  styles/
    generated/          Auto-generated by Style Dictionary (do not edit)
```

## Token Pipeline
Figma Variables → Tokens Studio JSON → Style Dictionary →
`tokens.css` (light) + `dark.css` (dark) + `tailwind-tokens.cjs`

Dark mode: `.dark` class on `<html>`. ThemeToggle component handles this.
All components update automatically via CSS var swap — zero JS changes.
