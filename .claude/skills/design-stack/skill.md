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

## Things 3 Principles (the "gopato" standard)

These define the feel and behavior target for this design system. Reference them whenever evaluating, building, or refining UI.

### Snappy & Responsive
- Interactions feel **instant** — no perceived lag on taps, clicks, or transitions
- Animations are **purposeful and short** (150–250ms), never decorative
- Feedback is immediate — hover, press, and focus states respond at the gesture

### Spatial Clarity
- **Whitespace is load-bearing** — breathing room is not wasted space, it creates hierarchy
- Elements are grouped by proximity, not by borders or dividers
- The grid is invisible but strict — alignment is never approximate

### Typography First
- Type hierarchy does the heavy lifting — size, weight, and color before icons or labels
- One type scale, used consistently — no one-off sizes
- Body text is always readable; secondary text fades, never disappears

### Minimal Chrome
- The UI gets out of the way — content and actions are the hero
- Controls appear when needed, not always
- No decorative shadows, gradients, or surfaces unless they carry meaning

### Focused Actions
- One clear primary action per view
- Destructive actions are never the easiest tap
- Progressive disclosure — complexity is hidden until the user reaches for it

### Tactile Feel
- Interactions feel **physical** — things slide, spring, and settle
- Drag, swipe, and long-press are first-class — not afterthoughts
- State changes feel like consequences, not teleportation

### Calm Density
- Information density is **medium** — not sparse, not cluttered
- Lists breathe; rows have enough padding to feel tappable
- Empty states are considered, not placeholders

### Polish Parity
- Light and dark mode receive equal care — neither is an afterthought
- Every edge state (loading, error, empty, single item) is designed, not assumed

---

## "More Gopato" — How to Apply

When the user says **"more gopato"**, take the current component or screen in context and:

1. **Audit against the principles above** — identify what's off (too dense, slow, cluttered, chrome-heavy)
2. **List the gaps** briefly (2–5 bullets max)
3. **Apply the fixes directly** — don't just describe them, make the changes
4. **Prioritize feel over feature** — snappiness and clarity before adding anything new

Do not redesign from scratch. Gopato is a refinement pass, not a rewrite.
