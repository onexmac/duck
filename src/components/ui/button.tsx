/**
 * Button — Duck System component (faithful to Figma node 250:624)
 *
 * 7 Figma variants:
 *   primary   — solid blue  (#4C82EE)
 *   default   — outlined blue
 *   success   — solid yellow (#F4CC00), black text
 *   dismiss   — outlined muted (#9494AD)
 *   warning   — outlined red
 *   danger    — solid red (#F95C5C)
 *   naked     — text-only blue
 *
 * Press animation: onPointerDown pattern (instant response) with spring settle.
 * See CLAUDE.md — never use onClick for visual feedback, never use whileTap.
 * Dark mode: CSS var swap, zero component changes.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "motion/react";
import { spring } from "@/lib/motion-tokens";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-[12px] font-medium tracking-[0.6px] uppercase",
    "transition-colors duration-[var(--motion-duration-fast)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Figma: Primary — solid blue
        primary:
          "rounded bg-[var(--color-interactive-primary)] text-[var(--color-interactive-primary-text)] hover:bg-[var(--color-interactive-primary-hover)]",

        // Figma: Default — outlined blue
        default:
          "rounded border border-[var(--color-interactive-primary)] bg-[var(--color-interactive-secondary)] text-[var(--color-interactive-secondary-text)] hover:bg-[var(--color-interactive-secondary-hover)]",

        // Figma: Success — solid yellow
        success:
          "rounded bg-[var(--color-interactive-success)] text-[var(--color-interactive-success-text)] hover:bg-[var(--color-interactive-success-hover)]",

        // Figma: Dismiss — outlined muted
        dismiss:
          "rounded border border-[var(--color-interactive-dismiss-border)] bg-[var(--color-interactive-dismiss)] text-[var(--color-interactive-dismiss-text)] hover:bg-[var(--color-bg-subtle)]",

        // Figma: Warning — outlined red
        warning:
          "rounded border border-[var(--color-interactive-warning-border)] bg-[var(--color-interactive-warning)] text-[var(--color-interactive-warning-text)] hover:bg-[var(--color-feedback-error-bg)]",

        // Figma: Danger — solid red
        danger:
          "rounded bg-[var(--color-interactive-danger)] text-[var(--color-interactive-danger-text)] hover:opacity-90",

        // Figma: Naked — text-only blue
        naked:
          "text-[var(--color-interactive-primary)] hover:underline",

        // shadcn/ui aliases
        destructive:
          "rounded bg-[var(--color-interactive-danger)] text-[var(--color-interactive-danger-text)] hover:opacity-90",
        outline:
          "rounded border border-[var(--color-interactive-primary)] bg-[var(--color-interactive-secondary)] text-[var(--color-interactive-secondary-text)] hover:bg-[var(--color-interactive-secondary-hover)]",
        secondary:
          "rounded border border-[var(--color-interactive-dismiss-border)] bg-[var(--color-interactive-dismiss)] text-[var(--color-interactive-dismiss-text)] hover:bg-[var(--color-bg-subtle)]",
        ghost:
          "text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-ghost-hover)]",
        link:
          "text-[var(--color-text-link)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm:      "h-8 px-4 text-[11px]",
        lg:      "h-12 px-8",
        icon:    "h-10 w-10 rounded",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onPointerDown, onPointerUp, onPointerLeave, ...props }, ref) => {
    const [pressed, setPressed] = React.useState(false);
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return <Slot className={classes} ref={ref} {...props} />;
    }

    return (
      // onPointerDown pattern: instant visual response on press, spring settle on release.
      // See CLAUDE.md — never whileTap, never onClick for feedback.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <motion.button
        className={classes}
        ref={ref}
        animate={{ scale: pressed ? 0.96 : 1 }}
        transition={spring.press}
        onPointerDown={(e) => { setPressed(true); (onPointerDown as any)?.(e); }}
        onPointerUp={(e) => { setPressed(false); (onPointerUp as any)?.(e); }}
        onPointerLeave={(e) => { setPressed(false); (onPointerLeave as any)?.(e); }}
        {...(props as unknown as React.ComponentPropsWithoutRef<typeof motion.button>)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
