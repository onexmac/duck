import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  label?: string;
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" };
const variantMap = {
  default: "var(--color-interactive-primary)",
  success: "var(--color-feedback-success)",
  warning: "var(--color-feedback-warning)",
  error: "var(--color-feedback-error)",
};

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  label,
  showValue,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs tabular-nums" style={{ color: "var(--color-text-muted)" }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn("w-full rounded-full overflow-hidden", sizeMap[size])}
        style={{ background: "var(--color-bg-subtle)" }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: variantMap[variant] }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
