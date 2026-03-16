"use client";

/**
 * TokenSwatch — visualises a single CSS custom property token.
 * Used on the home page to show the generated design token output.
 */

import { motion } from "motion/react";
import { transition } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";

interface SwatchProps {
  cssVar: string;   // e.g. "--color-bg-page"
  label?: string;
  className?: string;
  textDark?: boolean;
}

export function TokenSwatch({ cssVar, label, className, textDark }: SwatchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={transition.pop}
      className={cn(
        "flex h-20 flex-col justify-end rounded-lg p-2 shadow-sm",
        className
      )}
      style={{ backgroundColor: `var(${cssVar})` }}
    >
      <p
        className={cn(
          "truncate text-[10px] font-mono leading-tight",
          textDark ? "text-neutral-900" : "text-neutral-100"
        )}
      >
        {label ?? cssVar}
      </p>
    </motion.div>
  );
}

interface SwatchGroupProps {
  title: string;
  swatches: SwatchProps[];
}

export function SwatchGroup({ title, swatches }: SwatchGroupProps) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">
        {title}
      </h4>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {swatches.map((s) => (
          <TokenSwatch key={s.cssVar} {...s} />
        ))}
      </div>
    </div>
  );
}
