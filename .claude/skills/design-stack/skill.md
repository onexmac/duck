# Design Stack

**Trigger:** User says "design stack", "check design stack", or asks about the current design platform context.

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
