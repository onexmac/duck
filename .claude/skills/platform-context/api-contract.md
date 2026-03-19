# API Contract

## Endpoints (Fixed — Do Not Add or Change)

| Method | Path | Backend | Purpose |
|---|---|---|---|
| `POST` | `/orders` | Business Central | Submit orders from the sales UI |
| `POST` | `/interactions` | Azure SQL | Log all session/interaction/ML data |

**Never write interaction, session, or ML data to Business Central.**
**Do not add new routes pointing to BC for any other purpose.**

---

## /orders → Business Central

Used exclusively for order creation from the sales workflow.

```ts
// Request shape (abbreviated)
interface OrderPayload {
  customerId: string
  lineItems: LineItem[]
  scheduledDate?: string
}

await fetch("/orders", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
```

---

## /interactions → Azure SQL

Used for everything else: clicks, drags, AI suggestions accepted/rejected,
session timing, feature telemetry, model feedback signals.

```ts
interface InteractionPayload {
  sessionId: string
  eventType: string          // "task_complete" | "swipe_action" | "ai_accept" | ...
  payload: Record<string, unknown>
  timestamp: string          // ISO 8601
}

await fetch("/interactions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(interaction),
})
```
