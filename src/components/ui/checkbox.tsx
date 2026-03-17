"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`;

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={checkId}
            type="checkbox"
            ref={ref}
            className={cn(
              "peer h-4 w-4 shrink-0 appearance-none rounded border cursor-pointer",
              "border-[var(--color-border-strong)]",
              "checked:bg-[var(--color-interactive-primary)] checked:border-[var(--color-interactive-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors duration-[var(--motion-duration-fast)]",
              className
            )}
            {...props}
          />
          <svg
            className="absolute h-3 w-3 pointer-events-none hidden peer-checked:block"
            style={{ color: "var(--color-interactive-primary-text)" }}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={checkId}
                className="text-sm font-medium cursor-pointer"
                style={{ color: "var(--color-text-primary)" }}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
