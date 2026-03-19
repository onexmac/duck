# MAGI

**Trigger:** User says "run magi", "magi check", "magi status", or "check magi".

## What This Skill Does

MAGI is the three-unit decision system monitoring your design-to-code sync. Each unit runs an independent check. Together they produce a **Sync Level** — the overall health of your pipeline.

```
MELCHIOR  →  Design source integrity   (Figma connection, token source)
BALTHASAR →  Component sync            (Code Connect, library mapping)
CASPER    →  Local environment         (file integrity, git state, config)
```

---

## Sync Level Scale

| Level | Status | Meaning |
|-------|--------|---------|
| 100% | NOMINAL | All three units fully operational. Design ↔ Code link is solid. |
| 80–99% | STABLE | Minor drift. Non-critical warnings in one unit. |
| 50–79% | ADVISORY | One unit degraded. Sync is partial — review recommended. |
| 20–49% | WARNING | Two units degraded. Design-to-code link is at risk. |
| 1–19% | CRITICAL | All three units reporting failures. Sync is broken. |
| 0% | LINK SEVERED | No signal. Broken link with your EVA. |

---

## How to Calculate Sync Level

Each unit contributes up to **33 points**. Total = sum of all three (max 99, round 99 → 100%).

### MELCHIOR (Design Source)
- Figma URL present in project or recent context → **+15**
- Design tokens found (file or package) → **+10**
- Token format is valid / parseable → **+8**

### BALTHASAR (Component Sync)
- Component library detected in `package.json` → **+12**
- Code Connect config present (`.figma/`, `figma.config.js`) → **+12**
- At least one Code Connect mapping exists → **+9**

### CASPER (Local Environment)
- Repo is a git repo with commits → **+10**
- No uncommitted breaking changes to token/config files → **+13**
- Theme / style config file is present and non-empty → **+10**

---

## Output Format

```
───────────────────────────────────
        M A G I  S Y S T E M
───────────────────────────────────
MELCHIOR  [████████░░]  [score]/33  [status]
BALTHASAR [████░░░░░░]  [score]/33  [status]
CASPER    [██████████]  [score]/33  [status]
───────────────────────────────────
SYNC LEVEL:  [XX]%  —  [STATUS LABEL]
───────────────────────────────────
[One-line summary of what's working and what needs attention]
```

Fill the bar `█` proportionally to the unit's score out of 33.

---

## Warning System

Attach warnings when a unit drops below its threshold:

- **MELCHIOR < 20**: `[MELCHIOR] Design source undetected — Figma not linked`
- **BALTHASAR < 15**: `[BALTHASAR] Component map incomplete — Code Connect not configured`
- **CASPER < 15**: `[CASPER] Environment unstable — check git state and config files`
- **Total < 20%**: `[MAGI] CRITICAL — Link with EVA compromised. Immediate action required.`
- **Total = 0%**: `[MAGI] SIGNAL LOST — No design-to-code connection detected.`

---

## Behavior Notes

- Run all three unit checks before computing the total
- If a file check is ambiguous, score conservatively (lower)
- Never inflate the score — false positives are worse than warnings
- The final line should always tell the user what to do next if score < 100%
