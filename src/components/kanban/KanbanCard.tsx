"use client";

/**
 * KanbanCard — a sortable task card using @dnd-kit/react v2 API.
 *
 * useSortable({ id, index, group }) makes every card both draggable and droppable.
 * The `group` prop equals the column id — dnd-kit uses it to track cross-column moves.
 * Visual state comes from `status` ("idle" | "dragging" | "dropping").
 */

import { useSortable } from "@dnd-kit/react/sortable";
import { motion } from "motion/react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { transition } from "@/lib/motion-tokens";

export type Priority = "low" | "medium" | "high";

export interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  assignee?: string;
  tags?: string[];
  column: string;
}

const priorityVariant: Record<Priority, "success" | "warning" | "danger"> = {
  low: "success",
  medium: "warning",
  high: "danger",
};

interface KanbanCardProps {
  card: KanbanCardData;
  index: number;
}

export function KanbanCard({ card, index }: KanbanCardProps) {
  const { ref, handleRef, isDragSource, status } = useSortable({
    id: card.id,
    index,
    group: card.column,
    data: { column: card.column, type: "card" } as Record<string, unknown>,
    transition: {
      duration: 200,
      easing: "ease-out",
      idle: false,
    },
  });

  const isDragging = status === "dragging";
  const isDropping = status === "dropping";

  return (
    <motion.div
      ref={ref}
      layout
      layoutId={card.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: isDragging ? 0.35 : 1,
        y: 0,
        scale: isDragging ? 0.96 : 1,
        boxShadow: isDragging
          ? "0 10px 30px rgba(0,0,0,0.18)"
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
      transition={transition.slideUp}
      className={cn(
        "group relative rounded-lg border border-border-default bg-bg-surface p-4",
        "cursor-grab active:cursor-grabbing select-none",
        isDropping && "ring-2 ring-border-focus"
      )}
    >
      {/* Drag handle */}
      <button
        ref={handleRef}
        className={cn(
          "absolute right-2 top-2 rounded p-0.5",
          "text-text-muted opacity-0 group-hover:opacity-100",
          "transition-opacity duration-token-fast",
          "touch-none"
        )}
        tabIndex={-1}
        aria-label="Drag handle"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Priority */}
      {card.priority && (
        <div className="mb-2">
          <Badge variant={priorityVariant[card.priority]}>{card.priority}</Badge>
        </div>
      )}

      {/* Title */}
      <p className="pr-5 text-sm font-medium leading-snug text-text-primary">
        {card.title}
      </p>

      {/* Description */}
      {card.description && (
        <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
          {card.description}
        </p>
      )}

      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {card.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Assignee */}
      {card.assignee && (
        <div className="mt-3">
          <Avatar fallback={card.assignee} size="sm" />
        </div>
      )}
    </motion.div>
  );
}
