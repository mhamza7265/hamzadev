"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  GitBranch,
  Globe,
  Layers,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { architectureNodes, type ArchitectureNode } from "@/data/portfolio";

const iconMap: Record<ArchitectureNode["icon"], typeof Globe> = {
  frontend: Globe,
  gateway: Server,
  database: Database,
  cdn: Cloud,
  storage: Layers,
};

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    icon: GitBranch,
    title: "Decoupled Micro-Services",
    body: "Admin, Vendor, and API apps ship independently over versioned REST contracts, so a change in one never blocks the others.",
  },
  {
    icon: Shield,
    title: "JWT + Role-Based Access",
    body: "Every request is authenticated and authorized by tenant and role, enforced at the API gateway before reaching business logic.",
  },
  {
    icon: Zap,
    title: "Horizontal Scalability",
    body: "Stateless API instances scale out behind a load balancer, and each tier grows on its own cadence as traffic demands.",
  },
];

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="System Design"
          title={<>Architecture & Cloud Breakdown</>}
          description="How the car rental platform was architected across separate AWS EC2 instances — decoupled services, independent deploys, and commercial scalability."
        />

        <div className="relative mt-14">
          <FlowConnectors />

          <div className="relative grid gap-4 lg:grid-cols-5">
            {architectureNodes.map((node, i) => {
              const Icon = iconMap[node.icon];
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative z-10 overflow-hidden rounded-2xl glass p-5 transition-shadow hover:shadow-glow"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-400/20 text-brand-500 transition-transform group-hover:scale-110 dark:text-brand-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold leading-tight">
                    {node.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-accent-500 dark:text-accent-300">
                    {node.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-ink-500 dark:text-ink-300">
                    {node.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl glass-strong p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-500 dark:text-brand-300">
            <Cloud className="h-4 w-4" />
            Request Flow
          </div>
          <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            {[
              "Client",
              "React SPA",
              "API Gateway",
              "Business Logic",
              "MongoDB / S3",
            ].map((step, i, arr) => (
              <div key={step} className="flex flex-1 items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex-1 rounded-xl border border-hairline bg-ink-100/40 px-3 py-2.5 text-center text-xs font-semibold dark:bg-white/5"
                >
                  {step}
                </motion.span>
                {i < arr.length - 1 && (
                  <span className="hidden text-brand-500/60 sm:inline dark:text-brand-300/60">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="rounded-2xl glass p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-3 text-sm font-bold">{p.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-500 dark:text-ink-300">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FlowConnectors() {
  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(34 211 238)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[1, 2, 3, 4].map((gap) => (
          <line
            key={gap}
            x1={`${(gap * 100) / 5 - 1.2}%`}
            y1="50%"
            x2={`${(gap * 100) / 5 + 1.2}%`}
            y2="50%"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            className="animate-flow"
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-10 lg:hidden">
        {[1, 2, 3, 4].map((gap) => (
          <svg
            key={gap}
            className="h-4 w-4 text-brand-500/50 dark:text-brand-300/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </>
  );
}
