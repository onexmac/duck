# Interaction Patterns

## 1. Pointer Events (applies to ALL interactive elements)

Never use `onClick` for primary interactions. Always use pointer events.

```jsx
const [pressed, setPressed] = useState(false)

<div
  onPointerDown={() => setPressed(true)}
  onPointerUp={() => { setPressed(false); handleAction() }}
  onPointerLeave={() => setPressed(false)}   // cancels if user drags off
  style={{ transform: pressed ? "scale(0.96)" : "scale(1)" }}
>
```

**Why:** "Fires instantly on contact (no browser tap delay). Enables press state before release. `onPointerLeave` cancels cleanly on drag-off. Single handler for mouse + touch + stylus."

---

## 2. Checkbox Completion Sequence

1. `onPointerDown` → scale row to `0.98` with `SPRING_SNAPPY`
2. `onPointerUp` → mark complete; text animates to `opacity: 0.4` + `textDecoration: line-through`
3. Hold 400ms (user sees the confirmation)
4. `AnimatePresence` exits the row: `y: -6, opacity: 0` with `SPRING_SNAPPY`
5. Remaining rows slide into the gap via `layout` prop + `SPRING_HEAVY`

---

## 3. Swipe-to-Action

```js
const x = useMotionValue(0)   // tracks x without re-renders

const VELOCITY_THRESHOLD = 0.5   // fast flick — distance doesn't matter
const DISTANCE_THRESHOLD = 80    // slow deliberate swipe, in px

// On drag end:
if (velocity.x > VELOCITY_THRESHOLD || offset.x > DISTANCE_THRESHOLD) {
  triggerRightAction()   // complete / schedule
} else if (velocity.x < -VELOCITY_THRESHOLD || offset.x < -DISTANCE_THRESHOLD) {
  triggerLeftAction()    // delete / defer
} else {
  animate(x, 0, { type: "spring", ...SPRING_SNAPPY })   // snap back
}
```

---

## 4. Drag Reorder (FLIP via Motion + dnd-kit)

```jsx
// layout prop = FLIP is automatic. Motion measures old/new positions and
// animates the delta. No manual position calculation needed.

<AnimatePresence mode="popLayout">
  {tasks.map(task => (
    <motion.div
      key={task.id}
      layout                                           // ← FLIP
      transition={{ type: "spring", ...SPRING_HEAVY }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <SortableTaskRow task={task} />
    </motion.div>
  ))}
</AnimatePresence>
```
