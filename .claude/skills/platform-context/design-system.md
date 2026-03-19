# Design System Pipeline

## Token Pipeline

```
Figma (Primitives → Semantic → Components with Slots)
    │
    └─► Tokens Studio (plugin — manages token sets)
            │
            └─► GitHub (token JSON committed on publish)
                    │
                    └─► Style Dictionary (transforms to platform targets)
                                │
                                ├─► CSS Custom Properties
                                └─► Tailwind theme config
                                            │
                                            └─► shadcn/ui components
```

## Token Hierarchy

- **Primitives** — raw values (`#1a1a2e`, `16px`)
- **Semantic** — purpose-named (`color.surface.primary`, `spacing.md`)
- **Component-level** — scoped overrides per component

**Never use raw Tailwind color values.** Always reference CSS custom properties
that trace back through the token pipeline.

## Tailwind Config Pattern

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        surface:          "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        text:             "var(--color-text)",
        "text-muted":     "var(--color-text-muted)",
        accent:           "var(--color-accent)",
        danger:           "var(--color-danger)",
      }
    }
  }
}
```

## Figma Slots

New Figma feature — design equivalent of React `children` / render props.
Closes the historic gap where Figma needed variant explosions while React used composition.
With Slots, Figma component structure maps 1:1 to code — same mental model for designer and dev.

## shadcn/ui

Components are **copied into the codebase** via CLI — not a runtime npm dependency.
They live in `src/components/ui/`. Edit them directly. They are fully owned.

```bash
npx shadcn@latest add button checkbox input
```
