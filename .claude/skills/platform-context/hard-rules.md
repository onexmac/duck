# Hard Rules

These decisions are already made. Apply them without being asked.

```
NEVER write interaction/session/ML data to Business Central.

ALWAYS use onPointerDown + onPointerUp + onPointerLeave.
NEVER use onClick for primary interactions.

ALWAYS import Motion from "motion/react".
NEVER import from "framer-motion".

ALWAYS use named spring presets: SPRING_SNAPPY / SPRING_PANEL / SPRING_HEAVY.
NEVER use raw CSS easing or generic transition values for these interactions.

ALWAYS use AnimatePresence mode="popLayout" for animated lists.

ALWAYS use Zustand for shared state.
NEVER use useState prop chains or Context for global state.

NEVER use raw Tailwind color values.
ALWAYS use CSS custom properties from the token pipeline.

API contract is fixed:
  POST /orders       → Business Central
  POST /interactions → Azure SQL
  Do not add routes to BC for anything else.

shadcn/ui components live in src/components/ui/ — edit them directly.
They are not a runtime dependency.

ALWAYS use PointerSensor from @dnd-kit/core.
NEVER use MouseSensor or TouchSensor separately.
```
