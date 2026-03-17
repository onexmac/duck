"use client";
import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({ checked = false, onChange, label, description, disabled, className }: ToggleProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-[var(--motion-duration-normal)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "bg-[var(--color-interactive-primary)]"
            : "bg-[var(--color-border-strong)]"
        )}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
