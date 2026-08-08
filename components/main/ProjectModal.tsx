"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ExternalLink, Layers, X } from "lucide-react";
import { GithubIcon } from "@/components/main/icons";
import type { Project } from "@/data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl glass-strong shadow-2xl sm:rounded-3xl"
          >
            <div
              className={`relative h-28 bg-gradient-to-r ${project.accent} sm:h-32`}
            >
              <div className="absolute inset-0 bg-grid opacity-30" />
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950/30 text-white backdrop-blur transition-colors hover:bg-ink-950/50"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                <Layers className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  Case Study
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="text-2xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                {project.tagline}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-hairline bg-ink-100/40 p-3 dark:bg-white/5"
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">
                      {h.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{h.value}</p>
                  </div>
                ))}
              </div>

              <h4 className="mt-7 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-200">
                {project.description}
              </p>

              <h4 className="mt-7 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Key Features
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    className="flex items-start gap-2.5 text-sm text-ink-600 dark:text-ink-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-success-500/15 text-success-500 dark:text-success-400">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <h4 className="mt-7 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Tech Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-hairline bg-ink-100/50 px-3 py-1 text-xs font-medium text-ink-600 dark:bg-white/5 dark:text-ink-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-hairline p-4 sm:px-8">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Preview
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-hairline px-4 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-500 dark:text-ink-100 dark:hover:text-brand-300"
                >
                  <GithubIcon className="h-4 w-4" />
                  Source Code
                </a>
              )}
              <button
                onClick={onClose}
                className="ml-auto text-sm font-medium text-ink-400 transition-colors hover:text-ink-700 dark:hover:text-ink-100"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
