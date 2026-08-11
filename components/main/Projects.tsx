"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import SectionHeading from "@/components/main/SectionHeading";
import ProjectModal from "@/components/main/ProjectModal";
import { GithubIcon } from "@/components/main/icons";
import { projects, type Project } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-72 bg-gradient-to-b from-brand-500/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title={<>Featured Projects & Case Studies</>}
          description="Interactive case studies spanning decoupled multi-tenant platforms, custom CMS builds, and real-time workspaces."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl glass transition-shadow hover:shadow-glow"
            >
              <ProjectPreview project={project} />

              <div className="flex flex-1 flex-col p-5 justify-between">
                <div>
                  <h3 className="text-lg font-bold leading-snug">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
                    {project.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-hairline bg-ink-100/40 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-white/5 dark:text-ink-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-hairline pt-4">
                  <button
                    onClick={() => setActive(project)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-brand-500/10 px-3 py-2 text-xs font-semibold text-brand-500 transition-colors hover:bg-brand-500/20 dark:text-brand-300"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    View Case Study
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live preview"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:text-brand-500 dark:hover:text-brand-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Source code"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:text-brand-500 dark:hover:text-brand-300"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative h-44 overflow-hidden border-b border-hairline dark:bg-ink-950">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-10 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="absolute inset-0 flex justify-center">
        <div className="relative w-full">
          <div className="overflow-hidden rounded-t-lg border border-white/10 bg-ink-900/90 shadow-2xl shadow-ink-950/60 h-full">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-800/80 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-error-500/70" />
              <span className="h-2 w-2 rounded-full bg-warning-500/70" />
              <span className="h-2 w-2 rounded-full bg-success-500/70" />
              <span className="ml-2 font-mono text-[9px] text-ink-400">
                {project.icon === "car"
                  ? "fleet.ts"
                  : project.icon === "cms"
                    ? "PageController.php"
                    : "presence.ts"}
              </span>
            </div>
            <div className="p-3 font-mono text-[9px] leading-relaxed">
              <PreviewCode project={project} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-2 left-3 flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-ink-950/60 px-2 py-0.5 text-[10px] font-medium text-ink-200 backdrop-blur"
          >
            {tech}
          </span>
        ))}
      </div> */}
    </div>
  );
}

function PreviewCode({ project }: { project: Project }) {
  if (project.icon === "car") {
    return (
      <pre className="whitespace-pre-wrap">
        <span className="text-brand-300">{"const"}</span>{" "}
        <span className="text-accent-300">fleet</span>{" "}
        <span className="text-ink-400">{"="}</span>{" "}
        <span className="text-brand-300">{"await"}</span>{" "}
        <span className="text-accent-300">Vehicle</span>
        <span className="text-ink-400">.</span>
        <span className="text-accent-300">find</span>
        <span className="text-ink-200">(</span>
        <span className="text-ink-200">{"{"}</span>
        {"\n    "}
        <span className="text-warning-400">{"'status'"}</span>
        <span className="text-ink-400">{":"}</span>{" "}
        <span className="text-warning-400">{"'available'"}</span>
        <span className="text-ink-400">{","}</span>
        {"\n    "}
        <span className="text-warning-400">{"'vendorId'"}</span>
        <span className="text-ink-400">{":"}</span>{" "}
        <span className="text-brand-300">{"req"}</span>
        <span className="text-ink-400">.</span>
        <span className="text-accent-300">vendor</span>
        <span className="text-ink-400">.</span>
        <span className="text-accent-300">id</span>
        {"\n  "}
        <span className="text-ink-200">{"}"}</span>
        <span className="text-ink-200">)</span>
        <span className="text-ink-400">.</span>
        <span className="text-accent-300">populate</span>
        <span className="text-ink-200">(</span>
        <span className="text-warning-400">{"'location'"}</span>
        <span className="text-ink-200">);</span>
        {"\n\n"}
        <span className="text-ink-500">{"// sync fleet media to aws s3"}</span>
        {"\n"}
        <span className="text-accent-300">S3Storage</span>
        <span className="text-ink-400">.</span>
        <span className="text-accent-300">uploadMedia</span>
        <span className="text-ink-200">(</span>
        <span className="text-accent-300">fleet</span>
        <span className="text-ink-200">);</span>
      </pre>
    );
  }
  if (project.icon === "cms") {
    return (
      <pre className="whitespace-pre-wrap">
        <span className="text-brand-300">{"$cmsData"}</span>{" "}
        <span className="text-ink-400">{"="}</span>{" "}
        <span className="text-accent-300">PageContent</span>
        <span className="text-ink-400">::</span>
        <span className="text-accent-300">where</span>
        <span className="text-ink-200">(</span>
        <span className="text-warning-400">{"'slug'"}</span>
        <span className="text-ink-400">,</span>{" "}
        <span className="text-brand-300">{"$slug"}</span>
        <span className="text-ink-200">)</span>
        {"\n  "}
        <span className="text-ink-400">{"->"}</span>
        <span className="text-accent-300">firstOrFail</span>
        <span className="text-ink-200">();</span>
        {"\n\n"}
        <span className="text-brand-300">{"return"}</span>{" "}
        <span className="text-accent-300">response</span>
        <span className="text-ink-200">()</span>
        <span className="text-ink-400">{"->"}</span>
        <span className="text-accent-300">json</span>
        <span className="text-ink-200">(</span>
        <span className="text-brand-300">{"$cmsData"}</span>
        <span className="text-ink-200">);</span>
      </pre>
    );
  }
  if (project.icon === "cart") {
    return (
      <pre className="whitespace-pre-wrap">
        <span className="text-brand-300">{"$product"}</span>
        <span className="text-ink-400">{"->"}</span>
        <span className="text-accent-300">where</span>
        <span className="text-ink-200">(</span>
        <span className="text-warning-400">{"'stock'"}</span>
        <span className="text-ink-400">,</span>{" "}
        <span className="text-warning-400">{"'>'"}</span>
        <span className="text-ink-400">,</span>{" "}
        <span className="text-brand-400">0</span>
        <span className="text-ink-200">)</span>
        {"\n  "}
        <span className="text-ink-400">{"->"}</span>
        <span className="text-accent-300">paginate</span>
        <span className="text-ink-200">(</span>
        <span className="text-brand-300">24</span>
        <span className="text-ink-200">);</span>
        {"\n\n"}
        <span className="text-ink-500">{"// auto restock alert"}</span>
        {"\n"}
        <span className="text-accent-300">StockAlert</span>
        <span className="text-ink-400">::</span>
        <span className="text-accent-300">dispatch</span>
        <span className="text-ink-200">(</span>
        <span className="text-warning-400">{"'low'"}</span>
        <span className="text-ink-200">);</span>
      </pre>
    );
  }
  return (
    <pre className="whitespace-pre-wrap">
      <span className="text-brand-300">io</span>
      <span className="text-ink-400">.</span>
      <span className="text-accent-300">on</span>
      <span className="text-ink-200">(</span>
      <span className="text-warning-400">{"'message'"}</span>
      <span className="text-ink-400">,</span>{" "}
      <span className="text-ink-200">(</span>
      <span className="text-accent-300">msg</span>
      <span className="text-ink-200">) </span>
      <span className="text-brand-300">{"=>"}</span>{" "}
      <span className="text-ink-200">{"}{"}</span>
      {"\n  "}
      <span className="text-accent-300">presence</span>
      <span className="text-ink-400">.</span>
      <span className="text-accent-300">set</span>
      <span className="text-ink-200">(</span>
      <span className="text-warning-400">{"'online'"}</span>
      <span className="text-ink-200">);</span>
      {"\n  "}
      <span className="text-accent-300">broadcast</span>
      <span className="text-ink-400">.</span>
      <span className="text-accent-300">emit</span>
      <span className="text-ink-200">(</span>
      <span className="text-accent-300">msg</span>
      <span className="text-ink-200">);</span>
      {"\n"}
      <span className="text-ink-200">{"}"}</span>
      <span className="text-ink-200">);</span>
    </pre>
  );
}
