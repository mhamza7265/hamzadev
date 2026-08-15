"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
// import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/main/icons";
import { ProfileType } from "@/types/types";
import { trackAppEvent, trackEvent } from "@/lib/analytics";

const codeLines = [
  { t: "import", c: " { useEffect, useState } ", k: "from", q: "'react'" },
  { t: "", c: "", k: "", q: "" },
  { t: "interface", c: " Engineer {", k: "", q: "" },
  { t: "  name", c: ": ", k: "string", q: "" },
  { t: "  stack", c: ": ", k: "string[]", q: "" },
  { t: "  cloud", c: ": ", k: "'AWS' | 'Vercel'", q: "" },
  { t: "  ship", c: ": ", k: "() => Promise<Deploy>", q: "" },
  { t: "}", c: "", k: "", q: "" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ profile }: { profile: ProfileType | null }) {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="about"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-20 right-1/4 h-80 w-80 rounded-full bg-accent-400/20 blur-3xl animate-blob [animation-delay:-6s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="min-w-0 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/60 px-3 py-1.5 text-xs font-medium text-ink-600 backdrop-blur dark:bg-white/5 dark:text-ink-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            Available for full-stack & cloud projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Full-Stack Engineer
            <br />
            <span className="text-gradient">building for the cloud.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 dark:text-ink-300 sm:text-lg"
          >
            {profile?.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="mt-3 max-w-xl text-sm leading-relaxed text-ink-400 dark:text-ink-400"
          >
            Modern frontend development with React, TypeScript, and Tailwind CSS
            — paired with robust backend APIs in Node/Express and Laravel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => scrollTo("#projects")}
              className="group cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              onClick={() =>
                trackEvent("resume_download", {
                  location: "hero",
                })
              }
              href={profile?.resumeLink || "#"}
              className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-white/60 px-5 py-3 text-sm font-semibold text-ink-700 backdrop-blur transition-colors hover:border-brand-500/50 hover:text-brand-500 dark:bg-white/5 dark:text-ink-100 dark:hover:text-brand-300"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-ink-500 dark:text-ink-300"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-brand-500" />
              {profile?.location}
            </span>
            <span className="h-4 w-px bg-ink-300/50 dark:bg-white/10" />
            <a
              href={profile?.github || "https://github.com/"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-500 dark:hover:text-brand-300"
              onClick={() => {
                trackEvent("github_click", {
                  location: "hero",
                });
                trackAppEvent({
                  event: "github_click",
                  path: window.location.pathname,
                });
              }}
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile?.linkedin || "https://linkedin.com/in/"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-500 dark:hover:text-brand-300"
              onClick={() => {
                trackEvent("linkedin_click", {
                  location: "hero",
                });
                trackAppEvent({
                  event: "linkedin_click",
                  path: window.location.pathname,
                });
              }}
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="min-w-0 lg:col-span-5"
        >
          <CodeCard />
        </motion.div>
      </div>
    </section>
  );
}

function CodeCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-brand-500/30 to-accent-400/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-ink-900/20">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-error-500/80" />
            <span className="h-3 w-3 rounded-full bg-warning-500/80" />
            <span className="h-3 w-3 rounded-full bg-success-500/80" />
          </div>
          <span className="font-mono text-xs text-ink-400">useEngineer.ts</span>
          <span className="text-xs text-ink-400">TS</span>
        </div>

        <div className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
          <pre className="whitespace-pre">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.09, duration: 0.35, ease }}
                className="flex"
              >
                <span
                  className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                  style={{ width: "1.5rem" }}
                >
                  {i + 1}
                </span>
                <span>
                  {line.t && (
                    <span className="text-brand-500 dark:text-brand-300">
                      {line.t}
                    </span>
                  )}
                  {line.c && (
                    <span className="text-ink-700 dark:text-ink-100">
                      {line.c}
                    </span>
                  )}
                  {line.k && (
                    <span className="text-accent-500 dark:text-accent-300">
                      {line.k}
                    </span>
                  )}
                  {line.q && (
                    <span className="text-success-500 dark:text-success-400">
                      {line.q}
                    </span>
                  )}
                </span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + codeLines.length * 0.09 + 0.1 }}
              className="flex"
            >
              <span
                className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                style={{ width: "1.5rem" }}
              >
                {codeLines.length + 1}
              </span>
              <span className="text-brand-500 dark:text-brand-300">const </span>{" "}
              <span className="text-accent-500 dark:text-accent-300">
                hamza
              </span>
              <span className="text-ink-700 dark:text-ink-100">
                : Engineer ={" "}
              </span>
              <span className="text-ink-400">{"{"}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + codeLines.length * 0.09 + 0.18 }}
              className="flex"
            >
              <span
                className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                style={{ width: "1.5rem" }}
              >
                {codeLines.length + 2}
              </span>
              <span className="pl-4 text-ink-700 dark:text-ink-100">
                name:{" "}
                <span className="text-success-500 dark:text-success-400">
                  {"'Hamza Hanif'"}
                </span>
                ,
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + codeLines.length * 0.09 + 0.26 }}
              className="flex"
            >
              <span
                className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                style={{ width: "1.5rem" }}
              >
                {codeLines.length + 3}
              </span>
              <span className="pl-4 text-ink-700 dark:text-ink-100">
                stack: [
                <span className="text-success-500 dark:text-success-400">
                  {"'React'"}
                </span>
                ,{" "}
                <span className="text-success-500 dark:text-success-400">
                  {"'Node'"}
                </span>
                ,{" "}
                <span className="text-success-500 dark:text-success-400">
                  {"'AWS'"}
                </span>
                ],
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + codeLines.length * 0.09 + 0.34 }}
              className="flex"
            >
              <span
                className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                style={{ width: "1.5rem" }}
              >
                {codeLines.length + 4}
              </span>
              <span className="pl-4 text-ink-400">{"}"}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + codeLines.length * 0.09 + 0.42 }}
              className="flex"
            >
              <span
                className="mr-4 select-none text-right text-ink-300/60 dark:text-white/20"
                style={{ width: "1.5rem" }}
              >
                {codeLines.length + 5}
              </span>
              <span className="text-ink-700 dark:text-ink-100">
                <span className="animate-caret">▍</span>
              </span>
            </motion.div>
          </pre>
        </div>
      </div>
    </div>
  );
}
