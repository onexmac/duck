# Design Stack

**Trigger:** User says "design stack", "check design stack", or asks about the current design platform context.
**Trigger:** User says "more gopato" → apply the Things 3 principles below to the current component or UI in context.

## What This Skill Does

Gives you a full snapshot of the active design platform context: what tools are connected, what tokens are in use, what component libraries are linked, and where the source of truth lives.

## Output Format

Report back in this structure:

```
DESIGN STACK
─────────────────────────────
Platform:        [Figma / Sketch / etc]
File:            [File name or "Not connected"]
Node:            [Active node ID or "None"]
Design Tokens:   [Source file / "Not defined"]
Component Lib:   [Library name(s) or "None"]
Code Connect:    [Mapped / Partial / None]
Local Styles:    [Detected / Not detected]
─────────────────────────────
```

## Context to Pull

1. **Figma** — check for any Figma URLs in recent conversation, open files, or project config
2. **Design tokens** — look for `tokens.json`, `tokens/`, `design-tokens/`, or style dictionary config files in the repo
3. **Component library** — check `package.json` for known design system packages (e.g. `@radix-ui`, `shadcn`, `@mui`, `@chakra-ui`, custom internal libs)
4. **Code Connect** — check if `.figma/` or `figma.config.js` exists, and whether mappings are set
5. **Local styles** — check for CSS variables, Tailwind config tokens, or theme files

## Behavior Notes

- If Figma is not connected, still report the rest of the stack
- If a token source is ambiguous, list all candidates
- Keep it concise — this is a status read, not an audit
- If nothing is configured, say so clearly rather than guessing

---

## Gopato — Core Stack

The gopato feel comes down to three properties: **zero-latency UI**, **physics-based gesture interactions**, and **buttery micro-animations**. These are the specific tools that get you there in React.

### Framework — Next.js (App Router) or Vite + React
- Next.js if you need routing or server components
- Vite if it's pure client-side
- Both give you fast HMR and lean bundles — the foundation for zero-latency dev and production performance

### Animation — Motion (formerly Framer Motion) `motion`
**Non-negotiable.** Things 3's feel lives in spring physics, not easing curves. Use it as follows:
- `spring` transitions with custom `stiffness` / `damping` — replicates snappy-but-organic motion
- `AnimatePresence` — list item enter/exit (tasks completing, appearing)
- `layout` prop — automatic FLIP animations when items reorder; no manual coordinate math

```tsx
// The spring signature for gopato feel
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```

### Drag — `@dnd-kit/core`
- Lighter than `react-beautiful-dnd`, composes cleanly with Motion
- Native keyboard + pointer event support
- For Things-style sidebar dragging: combine with Motion's `useDragControls`

### State — Zustand
Things 3 feels fast partly because state updates are synchronous and local.
- No boilerplate, no cascading re-renders like Redux
- Store updates are direct — UI responds at the frame, not after a dispatch cycle
- For a task/list app, this is the exact right fit

### Virtualization — TanStack Virtual
- Keeps long task lists scrolling at 60fps
- Things 3 doesn't render thousands of items — but if your list might grow, this is non-optional
- Add it before you need it, not after scrolling degrades

### Styling — Tailwind + CSS Custom Properties
- Tailwind for layout and spacing
- CSS vars for design tokens (piped through Style Dictionary)
- **Avoid runtime CSS-in-JS** — it adds latency on every render, which kills the zero-latency feel

---

## Things 3 Design Principles (supporting context)

These back up the stack choices above. Reference when evaluating or auditing UI.

| Principle | What it means |
|---|---|
| Snappy & Responsive | Feedback tied to gesture, not result. 150–250ms is the perception threshold. |
| Spatial Clarity | Whitespace creates hierarchy — no borders or dividers needed. |
| Typography First | Weight and opacity express hierarchy before size jumps or icons. |
| Minimal Chrome | Controls appear when needed. Visible-but-unused controls are cognitive load. |
| Focused Actions | One primary action per view. Every equal-weight option adds decision cost. |
| Tactile Feel | Physical metaphors: spring, settle, collapse. State changes feel earned. |
| Calm Density | Medium density — tappable rows, breathing room, no wasted screen space. |
| Polish Parity | Every edge state designed: loading, error, empty, dark mode. No fallbacks. |

---

## "More Gopato" — How to Apply

When the user says **"more gopato"**, take the current component or screen in context and:

1. **Check the stack first** — is Motion being used for this interaction? Is state in Zustand? Is there a CSS-in-JS runtime adding latency?
2. **Audit against the principles** — identify what's off (too dense, wrong animation, chrome-heavy, easing curves instead of springs)
3. **List the gaps** briefly (2–5 bullets max)
4. **Apply the fixes directly** — don't describe them, make the changes
5. **Prioritize feel over feature** — snappiness and physics before adding anything new

Gopato is a refinement pass, not a rewrite.
