"use client";

import { ArrowUp, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/main/icons";
import { navLinks } from "@/data/portfolio";
import { ProfileType } from "@/types/types";
import { trackAppEvent, trackEvent } from "@/lib/analytics";

export default function Footer({ profile }: { profile: ProfileType | null }) {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <button
              onClick={() => scrollTo("#about")}
              className="font-mono text-sm font-semibold"
            >
              <span className="text-ink-400">{"<"}</span>Hamza
              <span className="text-brand-500">.dev</span>
              <span className="text-ink-400">{" />"}</span>
            </button>
            <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
              {profile?.professionalTitle} based in {profile?.location}.
              Building scalable, decoupled web applications and cloud-backed
              architectures.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm cursor-pointer text-ink-500 transition-colors hover:text-brand-500 dark:text-ink-300 dark:hover:text-brand-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile?.github || "https://github.com/"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-ink-500 transition-colors hover:text-brand-500 dark:text-ink-300 dark:hover:text-brand-300"
              onClick={() => {
                trackEvent("github_click", {
                  location: "footer",
                });
                trackAppEvent({
                  event: "github_click",
                  path: window.location.pathname,
                });
              }}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile?.linkedin || "https://linkedin/in/"}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-ink-500 transition-colors hover:text-brand-500 dark:text-ink-300 dark:hover:text-brand-300"
              onClick={() => {
                trackEvent("linkedin_click", {
                  location: "footer",
                });
                trackAppEvent({
                  event: "linkedin_click",
                  path: window.location.pathname,
                });
              }}
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile?.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-ink-500 transition-colors hover:text-brand-500 dark:text-ink-300 dark:hover:text-brand-300"
              onClick={() => {
                trackEvent("email_click", {
                  location: "footer",
                });
              }}
            >
              <span className="text-sm">@</span>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 sm:flex-row">
          <p className="text-center text-xs text-ink-400">
            © {year} {profile?.name}. Built with{" "}
            <Heart className="inline h-3.5 w-3.5 text-brand-500" /> using
            Next.js, TypeScript & Tailwind CSS.
          </p>
          <button
            onClick={() => scrollTo("#about")}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-ink-500 transition-colors hover:text-brand-500 dark:text-ink-300 dark:hover:text-brand-300"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
