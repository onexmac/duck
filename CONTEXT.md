# GoPato Prototype — Full Dev Context

## Project identity

- **Repo:** `duck` · Vercel project: `duck` (org: `onexmacs-projects`)
- **Live preview:** https://duck-git-claude-setup-design-tokens-go9qf-onexmacs-projects.vercel.app/gopato/prototype
- **Design system page:** `.../design-system`
- **Figma file:** `NbNiRiH3IEkE2BuYkmSQzM` (Duck System)
  - Prototype canvas node: `7486:6775`
  - ServiceUp sheet node: `7486:7391`
  - Bottom nav node: `7486:7392`
  - Week calendar node: `7486:7388`
  - Appointment card node: `7486:7355`
- **Dev branch:** `claude/setup-design-tokens-GO9Qf`

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 App Router | File-based routing, RSC, fast |
| Motion | `motion/react` (formerly Framer Motion) | Spring physics, `useMotionValue`, `useTransform`, `animate()` |
| Drag-and-drop | `@dnd-kit/core` + `@dnd-kit/sortable` | Stable API, works with Motion layout |
| State | Zustand | Synchronous, flat stores, no cascade re-renders |
| Styling | Tailwind + CSS custom properties | Token system on top of Tailwind |
| Tokens | Tokens Studio → Style Dictionary | Figma Variables → CSS vars + Tailwind theme |
| UI primitives | shadcn/ui | Unstyled base, styled via token layer |
| Language | TypeScript | Strict mode |

---

## Interaction model — core rules

1. **`onPointerDown`, never `onClick`** — `onClick` fires after release, adding ~100ms perceived latency. All interactive elements respond on `onPointerDown`.
2. **Springs only on interactive elements** — No `duration`/`ease` curves on buttons, drags, or press feedback. Only spring presets (see below).
3. **Never animate `width`/`height`** — Causes layout recalc every frame. Animate `x`, `y`, `scale`, `opacity` only.
4. **Never animate `layout` siblings with `layoutId`** — Broadcasts recalc to all motion siblings; breaks performance.
5. **Animation state stays local** — `useState`/`useRef` only. Zustand is for data, never UI.
6. **`AnimatePresence` on every mount/unmount** — Without it, exit animations don't run.

---

## Spring presets (`src/lib/motion-tokens.ts`)

```ts
export const spring = {
  snappy: { type: "spring", stiffness: 400, damping: 30 },  // buttons, checkboxes, day selection
  press:  { type: "spring", stiffness: 600, damping: 35 },  // immediate pointerDown feedback
  panel:  { type: "spring", stiffness: 280, damping: 26 },  // bottom sheets, sidebars
  heavy:  { type: "spring", stiffness: 200, damping: 40 },  // drag-drop landing
}
```

---

## Design token palette (Figma Quarks)

| Name | Hex | CSS var |
|------|-----|---------|
| Duck Yellow | `#F4CC00` | `--color-brand-yellow` |
| BlueBlue | `#4C82EE` | `--color-brand-blue` |
| RedRed | `#F95C5C` | `--color-brand-red` |
| Very Dark | `#2F3644` | `--color-brand-very-dark` |
| Notso Dark | `#9494AD` | `--color-brand-notso-dark` |
| Kinda Gray | `#B4B8D2` | `--color-brand-kinda-gray` |
| Notso White | `#EBEDF2` | `--color-brand-notso-white` |
| Kinda White | `#F4F4F4` | `--color-brand-kinda-white` |

### Semantic tokens (light mode)
```
--color-bg-page       → page background (Notso White #EBEDF2)
--color-bg-surface    → cards, pills, sheets (white)
--color-bg-subtle     → muted fills
--color-text-primary  → Very Dark #2F3644
--color-text-secondary → Notso Dark #9494AD
--color-interactive-primary → BlueBlue #4C82EE
--color-interactive-success → Duck Yellow #F4CC00
```
Dark mode: `.dark` class on `<html>` — all components update automatically, zero JS changes.

---

## Token pipeline

```
Figma Variables (4 collections)
  → Tokens Studio export → JSON
  → Style Dictionary v4
  → src/styles/generated/tokens.css  (light)
  → src/styles/generated/dark.css    (dark)
  → tailwind-tokens.cjs              (Tailwind theme extension)
```

**Never hardcode hex values** — always reference CSS vars or Tailwind token classes.

---

## File structure

```
src/
  app/
    gopato/prototype/page.tsx       ← main prototype page
    design-system/page.tsx          ← component showcase (all tokens + components)
  components/
    ui/                             ← Duck System primitives
      button.tsx
      card.tsx
      checkbox.tsx
      toggle.tsx
      segmented-control.tsx         ← draggable spring-snap tab selector
      tabs.tsx
      badge.tsx
      avatar.tsx
      input.tsx
      select.tsx
      alert.tsx
      progress.tsx
    gopato/                         ← GoPato feature components
      AppointmentCard.tsx           ← home appointment card with service icons
      ServiceList.tsx               ← bottom sheet + SegmentedControl + service list
      WeekCalendar.tsx              ← interactive week selector
      BottomNav.tsx                 ← nav bar with SVG mask-image icons
      StatusBar.tsx                 ← mobile status bar
      StateSection.tsx              ← appointment state display
    ThemeToggle.tsx
  lib/
    motion-tokens.ts                ← spring presets + duration/easing
    figma-icons.ts                  ← icon paths + Figma asset URLs
    utils.ts                        ← cn() helper
  styles/
    generated/                      ← Auto-generated by Style Dictionary (do not edit)
public/
  icons/
    nav-home.svg                    ← 22×22
    nav-chat.svg                    ← 24×22
    nav-orders.svg                  ← 20×24
    nav-avatar.svg                  ← 22×20
```

---

## Key components

### `SegmentedControl` (`src/components/ui/segmented-control.tsx`)
Draggable spring-snap tab selector. Pill follows pointer, snaps to target tab on release.
- Container: `rounded-[20px]`, `bg-bg-page`, `p-[4px]`
- Pill: `rounded-[20px]`, `bg-bg-surface`, shadow `0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)`
- Labels: Roboto Bold 16px, `letterSpacing: "0.8px"`
- Drag: raw pointer events + `setPointerCapture` on the pill `<motion.div>`
- Velocity tracking: `(Δx / Δt) * 1000` → snap thresholds ±30px offset or ±200px/s velocity
- Color interpolation: `useTransform(pillX, fn)` → live active/inactive text color during drag
- `ResizeObserver` keeps `tabWidth` correct at any container width

**Usage:**
```tsx
import { SegmentedControl } from "@/components/ui/segmented-control";

<SegmentedControl
  tabs={[{ id: "recents", label: "Recents" }, { id: "popular", label: "Popular" }]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

**Important:** When nesting inside a vertically-draggable sheet (like `ServiceList`), place `SegmentedControl` OUTSIDE the sheet's `onPointerDown={dragControls.start}` zone. The sheet's drag interceptor would capture the pill's horizontal pointer events and break the drag.

### `ServiceList` (`src/components/gopato/ServiceList.tsx`)
Bottom sheet with spring snap to 3 positions: FULL (0), HALF (220), PEEK (490).
- Sheet height: 680px
- Drag: `useDragControls` + `dragListener={false}` — manual `onPointerDown={startHeaderDrag}` on header only
- Snap logic: velocity > 400px/s → directional, else nearest snap point
- Content: scrollable, `touchAction: "pan-y"` for native scroll + no conflict with sheet drag
- Tab: `SegmentedControl` between header and content, outside sheet drag zone

### `WeekCalendar` (`src/components/gopato/WeekCalendar.tsx`)
Interactive 7-day week selector.
- Props: `activeDate`, `onSelect`, `weekOffset`, `onWeekChange`
- Press animation on each day circle: `spring.press`
- Active day: filled `--color-brand-blue` circle, white text
- Inactive days: `--color-text-secondary` / `--color-brand-kinda-gray` letters

### `BottomNav` (`src/components/gopato/BottomNav.tsx`)
4-tab navigation. Icons rendered as CSS `mask-image` from SVG files in `/public/icons/`.
- Inactive color: `#B4B8D2` (Kinda Gray)
- Active color: `#4C82EE` (BlueBlue)
- Icon sizing: Home 22×22, Chat 24×22, Orders 20×24, Avatar 22×20
- Mask pattern:
```tsx
style={{
  maskImage: `url(/icons/${file}.svg)`,
  WebkitMaskImage: `url(/icons/${file}.svg)`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  backgroundColor: isActive ? "#4C82EE" : "#B4B8D2",
}}
```

### `AppointmentCard` (`src/components/gopato/AppointmentCard.tsx`)
Home appointment card. Service icons from `SERVICE_ICONS` in `@/lib/figma-icons`.
- Card shadow: `0px 1px 6px 0px rgba(180,184,210,0.3)`
- Title: Roboto Black (font-weight 900), 20px, tracking-tight
- Service icon circles: 48×48, `rounded-[14px]`
- Service icon backgrounds: category-specific (not design-system tokens)
  - Clean: `var(--color-interactive-success)` (Duck Yellow)
  - Refill: `#f0776f`
  - Pets: `#8ad1e1`
  - Bolt: `#7c83f5`

---

## Icon system (`src/lib/figma-icons.ts`)

```ts
export const NAV_ICONS = {
  home:   "/icons/nav-home.svg",    // committed to /public/icons/
  chat:   "/icons/nav-chat.svg",
  orders: "/icons/nav-orders.svg",
  avatar: "/icons/nav-avatar.svg",
}

export const SERVICE_ICONS = {     // Figma asset URLs — expire 7 days after fetch
  clean, pet, gift, bread, drinks, slice, orange
}
```

Nav icons are committed SVGs — resolution-independent, crisp on all displays.
Service icons are Figma CDN URLs — re-fetch via `scripts/fetch-icons.mjs` when they expire.

---

## Figma integration

- **MCP server:** `figma` — tools: `get_design_context`, `get_metadata`, `get_screenshot`
- **Workflow:** `get_metadata` first to explore canvas, then `get_design_context` on specific node IDs for exact spacing/color/typography
- **File key:** `NbNiRiH3IEkE2BuYkmSQzM`
- **Design tokens come from** the Figma Quarks collection — do not hardcode values visible in Figma

---

## Git workflow

- Branch: `claude/setup-design-tokens-GO9Qf`
- Push: `git push -u origin claude/setup-design-tokens-GO9Qf`
- Branch naming: must start with `claude/`, end with session ID (`GO9Qf`)
- Preview auto-deploys on Vercel after each push

---

## What NOT to do

- No `duration`/`ease` on interactive elements — springs only
- No hardcoded colors — tokens only
- No `onClick` for primary interactions — `onPointerDown`
- No `width`/`height` animations — use `scale`, `x`, `y`, `opacity`
- No Zustand for animation state — keep it local
- Do not edit `src/styles/generated/` — auto-generated by Style Dictionary
- Do not use `layoutId` on elements with many motion siblings — performance
