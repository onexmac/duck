# Drag and Drop (dnd-kit)

## Sensor Rule

Always use `PointerSensor`. Never use `MouseSensor` or `TouchSensor` separately.

```ts
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"

const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,   // px — prevents accidental drag on tap
    },
  })
)
```

---

## Sortable List Pattern

```tsx
function TaskList() {
  const { tasks, reorderTasks } = useTaskStore()

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = tasks.findIndex(t => t.id === active.id)
    const to   = tasks.findIndex(t => t.id === over.id)
    reorderTasks(from, to)
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <AnimatePresence mode="popLayout">
          {tasks.map(task => (
            <motion.div key={task.id} layout transition={SPRING_HEAVY}>
              <SortableTaskRow task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  )
}
```

---

## useSortable in Row

```tsx
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableTaskRow({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      <TaskRow task={task} />
    </div>
  )
}
```
