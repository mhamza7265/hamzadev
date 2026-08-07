"use client";

import { motion } from "framer-motion";
import { Briefcase, Check, MapPin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career"
          title={<>Work Experience & Milestones</>}
          description="Roles where I shipped commercial software, designed APIs, deployed to the cloud, and mentored other developers."
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-brand-500 via-brand-500/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="relative pl-12 sm:pl-0"
              >
                <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-400 text-white shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                  <Briefcase className="h-4 w-4" />
                </span>

                <div
                  className={`rounded-2xl glass p-6 transition-shadow hover:shadow-glow ${
                    i % 2 === 0
                      ? "sm:mr-[calc(50%+2rem)]"
                      : "sm:ml-[calc(50%+2rem)]"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-bold max-w-[62%]">
                      {exp.role}
                    </h3>
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-500 dark:text-brand-300 max-w-[36%]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-ink-600 dark:text-ink-200">
                    {exp.company}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                    {exp.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-200"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-success-500/15 text-success-500 dark:text-success-400">
                          <Check className="h-3 w-3" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-hairline bg-ink-100/40 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-white/5 dark:text-ink-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
