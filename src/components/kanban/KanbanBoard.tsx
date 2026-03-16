"use client";

/**
 * KanbanBoard — multi-column drag-and-drop board.
 *
 * Architecture:
 *   DragDropProvider  (dnd-kit context + event handler)
 *   └── KanbanColumn[] (useDroppable — column-level drop target)
 *       └── KanbanCard[]  (useSortable — card-level, group=columnId)
 *
 * On dragEnd:
 *   1. Read operation.source.id  → dragged card id
 *   2. Read operation.target.id  → target card OR target column id
 *   3. Mutate columns state to reflect the new position/column
 *
 * Token usage:
 *   Layout  → --space-* CSS vars
 *   Colours → --color-bg-* / --color-border-* semantic tokens
 *   Motion  → @/lib/motion-tokens duration/easing
 */

import { useState, useCallback } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { motion } from "motion/react";
import { KanbanColumn, type ColumnData } from "./KanbanColumn";
import { type KanbanCardData } from "./KanbanCard";

// ─── Seed data ───────────────────────────────────────────────────────────────
const INITIAL_COLUMNS: ColumnData[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "var(--color-text-muted)",
    cards: [
      {
        id: "card-1",
        title: "Define token naming convention",
        description:
          "Agree on a naming structure for all 4 collections before exporting from Figma.",
        priority: "high",
        assignee: "Alex Kim",
        tags: ["tokens", "figma"],
        column: "backlog",
      },
      {
        id: "card-2",
        title: "Set up Tokens Studio plugin",
        description:
          "Install and configure the Tokens Studio Figma plugin with GitHub sync.",
        priority: "medium",
        assignee: "Sam Lee",
        tags: ["tokens", "setup"],
        column: "backlog",
      },
      {
        id: "card-3",
        title: "Document dark mode palette",
        priority: "low",
        tags: ["docs", "dark-mode"],
        column: "backlog",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "var(--color-interactive-primary)",
    cards: [
      {
        id: "card-4",
        title: "Style Dictionary config",
        description:
          "Write the SD config that transforms Tokens Studio JSON → CSS vars, Tailwind, and TS object.",
        priority: "high",
        assignee: "Jordan P",
        tags: ["sd", "pipeline"],
        column: "in-progress",
      },
      {
        id: "card-5",
        title: "Tailwind token extension",
        description:
          "Generate tailwind-tokens.cjs so Tailwind classes reference CSS vars automatically.",
        priority: "medium",
        assignee: "Alex Kim",
        tags: ["tailwind", "pipeline"],
        column: "in-progress",
      },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "var(--color-feedback-warning)",
    cards: [
      {
        id: "card-6",
        title: "shadcn/ui Button component",
        description:
          "Token-driven Button variants — all colours from CSS vars so dark mode is automatic.",
        priority: "medium",
        assignee: "Morgan T",
        tags: ["shadcn", "component"],
        column: "review",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "var(--color-feedback-success)",
    cards: [
      {
        id: "card-7",
        title: "Primitive token collection",
        description:
          "Full colour palette + spacing + typography + radii in DTCG format.",
        priority: "low",
        assignee: "Sam Lee",
        tags: ["tokens", "done"],
        column: "done",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function findColumnByCardId(
  columns: ColumnData[],
  cardId: string
): ColumnData | undefined {
  return columns.find((c) => c.cards.some((card) => card.id === cardId));
}

function findColumnById(
  columns: ColumnData[],
  id: string
): ColumnData | undefined {
  return columns.find((c) => c.id === id);
}

// ─── Board ────────────────────────────────────────────────────────────────────
export function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnData[]>(INITIAL_COLUMNS);

  const handleDragEnd = useCallback(
    // dnd-kit v2 onDragEnd signature: { operation, canceled }
    // operation.source = Draggable, operation.target = Droppable | null
    (event: { operation: { source: { id: unknown } | null; target: { id: unknown } | null }; canceled: boolean }) => {
      const { operation, canceled } = event;
      if (canceled || !operation.source || !operation.target) return;

      const draggedId = String(operation.source.id);
      const targetId = String(operation.target.id);

      if (draggedId === targetId) return;

      setColumns((prev) => {
        // Deep clone columns
        const next = prev.map((col) => ({
          ...col,
          cards: [...col.cards],
        }));

        const sourceCol = next.find((c) =>
          c.cards.some((card) => card.id === draggedId)
        );
        if (!sourceCol) return prev;

        const cardIdx = sourceCol.cards.findIndex((c) => c.id === draggedId);
        const [card] = sourceCol.cards.splice(cardIdx, 1);

        // Target is a column droppable
        const targetCol =
          next.find((c) => c.id === targetId) ??
          next.find((c) => c.cards.some((card) => card.id === targetId));

        if (!targetCol) {
          // Rollback
          sourceCol.cards.splice(cardIdx, 0, card);
          return prev;
        }

        card.column = targetCol.id;

        // Insert before target card if target is a card, else append
        const targetCardIdx = targetCol.cards.findIndex(
          (c) => c.id === targetId
        );

        if (targetCardIdx !== -1) {
          targetCol.cards.splice(targetCardIdx, 0, card);
        } else {
          targetCol.cards.push(card);
        }

        return next;
      });
    },
    []
  );

  const handleAddCard = useCallback((columnId: string) => {
    const newCard: KanbanCardData = {
      id: `card-${Date.now()}`,
      title: "New task",
      priority: "low",
      column: columnId,
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <DragDropProvider onDragEnd={handleDragEnd as any}>
      <motion.div
        className="flex gap-4 overflow-x-auto pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onAddCard={handleAddCard}
          />
        ))}
      </motion.div>
    </DragDropProvider>
  );
}
