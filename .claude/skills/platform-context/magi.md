# MAGI Context Health Monitor

NGE-themed alerts that fire when context load approaches limits or key documents are missing.

---

## Alert Levels

| System | Threshold | Message |
|---|---|---|
| MELCHIOR | Context > 60% | "MELCHIOR-1 ONLINE — context load nominal. Proceed." |
| BALTHASAR | Context > 80% | "BALTHASAR-2 WARNING — context pressure rising. Summarize before continuing." |
| CASPAR | Context > 90% | "CASPAR-3 CRITICAL — context near limit. Compact now or risk losing thread." |

---

## Missing Document Alert

If any of the platform-context supporting files fail to load or are absent:

```
⚠ MAGI SYSTEM ALERT
One or more context documents failed to load.
Affected: [list missing files]
Recommendation: Re-invoke /platform-context before proceeding.
```

---

## Usage

These are informational signals — Claude Code surfaces them as inline warnings
at the start of a response when thresholds are crossed. They do not block work.
They remind the user (and Claude) to compact context or re-load the skill if
the session has drifted far from the original context load.
