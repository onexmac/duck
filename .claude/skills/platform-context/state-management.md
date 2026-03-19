# State Management

## Rule

Use **Zustand** for all shared/global state.
Never use `useState` prop chains or React Context for state that crosses component boundaries.

---

## Store Pattern

```ts
// src/store/taskStore.ts
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface TaskState {
  tasks: Task[]
  addTask: (task: Task) => void
  completeTask: (id: string) => void
  reorderTasks: (from: number, to: number) => void
}

export const useTaskStore = create<TaskState>()(
  immer((set) => ({
    tasks: [],
    addTask: (task) => set((state) => { state.tasks.push(task) }),
    completeTask: (id) =>
      set((state) => {
        const t = state.tasks.find(t => t.id === id)
        if (t) t.completed = true
      }),
    reorderTasks: (from, to) =>
      set((state) => {
        const [moved] = state.tasks.splice(from, 1)
        state.tasks.splice(to, 0, moved)
      }),
  }))
)
```

---

## Middleware

| Middleware | When to use |
|---|---|
| `immer` | Whenever store state is mutated (arrays, nested objects) |
| `persist` | If state should survive page refreshes (use `localStorage`) |
| `devtools` | Development only, wrap outermost |

```ts
import { devtools, persist } from "zustand/middleware"

export const useStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({ ... })),
      { name: "duck-store" }
    )
  )
)
```

---

## Local State

`useState` is fine for:
- UI-only state scoped to a single component (hover, focus, open/closed)
- Ephemeral form values before submission
- Animation intermediaries already tracked by `useMotionValue`
