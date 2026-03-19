---
name: platform-context
description: >
  Full platform context for Marcos's React thin client platform built on Business Central + Azure SQL.
  Load this skill when working on: the task app prototype, any React thin client, the dual write pattern,
  API contracts, the design system pipeline, spring physics animations, drag-and-drop, or anything
  touching the Microsoft stack. Also loads the MAGI context health monitor.
---
# Platform Context Skill
This skill loads the full architectural and UI context for the platform.
Reference the supporting files below — they are colocated in this skill's folder.
## Supporting Files in This Skill
| File | What it contains |
|---|---|
| `architecture.md` | Platform architecture: dual write pattern, BC rules, Azure SQL schema, API contract, AI agent layer |
| `design-system.md` | Figma → Tokens Studio → Style Dictionary → CSS vars + Tailwind + shadcn pipeline |
| `ui-stack.md` | Full React library stack: Motion, @dnd-kit, Zustand, Tailwind, shadcn — with install commands, exact APIs, and reasoning |
| `animation.md` | The three spring presets (SNAPPY/PANEL/HEAVY), AnimatePresence patterns, useMotionValue |
| `interactions.md` | Interaction patterns: pointer events, checkbox sequence, swipe-to-action, FLIP reorder |
| `state-management.md` | Zustand store patterns, middleware (immer/persist/devtools), when to use local state |
| `api-contract.md` | Fixed API endpoints: /orders → BC, /interactions → Azure SQL |
| `dnd.md` | dnd-kit PointerSensor setup, SortableContext, useSortable pattern |
| `hard-rules.md` | Non-negotiable rules Claude Code must follow without being asked |
| `magi.md` | MAGI context health monitor — NGE-themed context load alerts |
When loaded, read all supporting files and apply their contents to the current task.
Do not summarize them — internalize and apply them.
