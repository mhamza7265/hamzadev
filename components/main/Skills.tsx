"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cloud, Code, Server } from "lucide-react";
import SectionHeading from "@/components/main/SectionHeading";
import { skills, type Skill, type SkillCategory } from "@/data/portfolio";

type Filter = "All" | SkillCategory;

const filters: Filter[] = ["All", "Frontend", "Backend", "Cloud/DevOps"];

const tagColor: Record<Skill["tag"], string> = {
  Expert:
    "text-success-500 dark:text-success-400 bg-success-500/10 border-success-500/25",
  Advanced:
    "text-brand-500 dark:text-brand-300 bg-brand-500/10 border-brand-500/25",
  Proficient:
    "text-accent-500 dark:text-accent-300 bg-accent-500/10 border-accent-500/25",
  Intermediate:
    "text-warning-500 dark:text-warning-400 bg-warning-500/10 border-warning-500/25",
};

const tagLabel: Record<Skill["tag"], string> = {
  Expert: "Production-Ready",
  Advanced: "Advanced",
  Proficient: "Proficient",
  Intermediate: "Intermediate",
};

const categoryIcon: Record<SkillCategory, typeof Code> = {
  Frontend: Code,
  Backend: Server,
  "Cloud/DevOps": Cloud,
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All" ? skills : skills.filter((s) => s.category === filter),
    [filter],
  );

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title={<>Technical Skill Matrix</>}
          description="A categorized view of the tools I use to design, build, and ship full-stack applications — filterable by discipline."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "text-white"
                  : "text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="skill-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => {
              const Icon = categoryIcon[skill.category];
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 16 }}
                  transition={{ duration: 0.4, ease }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-glow"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-colors group-hover:bg-brand-500/20 dark:text-brand-300">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold leading-tight">
                            {skill.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-ink-400">
                            {skill.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tagColor[skill.tag]}`}
                      >
                        {tagLabel[skill.tag]}
                      </span>
                      {/* <span className="font-mono text-[10px] uppercase tracking-wide text-ink-400">
                      {skill.category}
                    </span> */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
