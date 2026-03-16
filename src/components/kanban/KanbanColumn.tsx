"use client";

/**
 * KanbanColumn — a droppable column wrapping sortable cards.
 *
 * useDroppable registers the column element as a drop zone so cards can be
 * dropped onto empty columns. Cards themselves are sortable within and across
 * columns via useSortable's `group` prop.
 */

import { useDroppable } from "@dnd-kit/react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { KanbanCard, type KanbanCardData } from "./KanbanCard";
import { transition } from "@/lib/motion-tokens";

export interface ColumnData {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCardData[];
}

interface KanbanColumnProps {
  column: ColumnData;
  onAddCard?: (columnId: string) => void;
}

export function KanbanColumn({ column, onAddCard }: KanbanColumnProps) {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    data: { type: "column" } as Record<string, unknown>,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={transition.slideUp}
      className="flex w-72 shrink-0 flex-col"
    >
      {/* Column header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {column.color && (
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: column.color }}
            />
          )}
          <h3 className="text-sm font-semibold text-text-primary">
            {column.title}
          </h3>
          <span className="rounded-full bg-bg-subtle px-2 py-0.5 text-xs font-medium text-text-muted">
            {column.cards.length}
          </span>
        </div>

        {onAddCard && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onAddCard(column.id)}
            aria-label={`Add card to ${column.title}`}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Card list — also the droppable target */}
      <div
        ref={ref}
        className={cn(
          "flex flex-1 flex-col gap-2 rounded-xl p-2 transition-colors duration-token-fast",
          "min-h-[200px]",
          isDropTarget ? "bg-feedback-info-bg ring-2 ring-border-focus" : "bg-bg-subtle"
        )}
      >
        <AnimatePresence initial={false}>
          {column.cards.map((card, index) => (
            <KanbanCard key={card.id} card={card} index={index} />
          ))}
        </AnimatePresence>

        {column.cards.length === 0 && !isDropTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-border-subtle py-10"
          >
            <p className="text-xs text-text-muted">Drop cards here</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
