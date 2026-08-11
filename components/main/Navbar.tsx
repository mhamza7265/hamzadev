"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "mt-2" : "mt-0"
          }`}
        >
          <div
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
              scrolled ? "glass-strong-nav shadow-lg shadow-ink-900/5" : ""
            }`}
          >
            <button
              onClick={() => handleNav("#about")}
              className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
            >
              {/* <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-400 text-white shadow-glow transition-transform group-hover:scale-105">
                MH
              </span> */}
              <span className="hidden sm:inline">
                <span className="text-ink-400 dark:text-ink-300">{"<"}</span>
                Hamza
                <span className="text-brand-500">.dev</span>
                <span className="text-ink-400 dark:text-ink-300">{" />"}</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    active === link.href
                      ? "text-brand-500 dark:text-brand-300"
                      : "text-ink-500 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-ink-100/60 text-ink-600 transition-colors hover:text-brand-500 dark:bg-white/5 dark:text-ink-200 dark:hover:text-brand-300 cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.span
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => handleNav("#contact")}
                className="hidden rounded-lg bg-gradient-to-r cursor-pointer from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
              >
                Hire Me
              </button>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-ink-100/60 text-ink-700 dark:bg-white/5 dark:text-ink-100 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col glass-strong p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold">
                  <span className="text-ink-400">{"<"}</span>Hamza
                  <span className="text-brand-500">.dev</span>
                  <span className="text-ink-400">{" />"}</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-ink-100/60 text-ink-700 dark:bg-white/5 dark:text-ink-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    onClick={() => handleNav(link.href)}
                    className={`rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      active === link.href
                        ? "bg-brand-500/10 text-brand-500 dark:text-brand-300"
                        : "text-ink-600 hover:bg-ink-100/60 dark:text-ink-200 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => handleNav("#contact")}
                  className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-glow"
                >
                  Hire Me
                </button>
                <a
                  href={profile.resumeUrl}
                  className="rounded-xl border border-hairline px-4 py-3 text-center text-sm font-semibold text-ink-700 dark:text-ink-100"
                >
                  Download Resume
                </a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
