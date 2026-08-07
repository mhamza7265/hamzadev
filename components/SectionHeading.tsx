"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-500 backdrop-blur dark:bg-white/5 dark:text-brand-300">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink-500 dark:text-ink-300">
          {description}
        </p>
      )}
    </motion.div>
  );
}
