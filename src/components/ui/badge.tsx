import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-interactive-primary text-interactive-primary-text",
        secondary:
          "border-transparent bg-interactive-secondary text-interactive-secondary-text",
        outline:
          "border-border-default text-text-primary",
        success:
          "border-transparent bg-feedback-success-bg text-feedback-success",
        warning:
          "border-transparent bg-feedback-warning-bg text-feedback-warning",
        danger:
          "border-transparent bg-feedback-error-bg text-feedback-error",
        info:
          "border-transparent bg-feedback-info-bg text-feedback-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
