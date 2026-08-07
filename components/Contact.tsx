"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Add a subject.";
    if (!form.message.trim()) next.message = "Add a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 3500);
    }, 1400);
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: undefined,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com",
      href: profile.github,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "linkedin.com",
      href: profile.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-accent-400/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title={"Let's Build Something"}
          description="Have a full-stack or cloud project in mind? Send a message and I'll get back to you shortly."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const content = (
                  <div className="group h-full rounded-2xl glass p-5 transition-shadow hover:shadow-glow">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition-transform group-hover:scale-110 dark:text-brand-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-xs font-medium uppercase tracking-wide text-ink-400">
                      {card.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{card.value}</p>
                  </div>
                );
                return card.href ? (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block h-full"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={card.label} className="h-full">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3" noValidate>
            <div className="rounded-2xl glass-strong p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  placeholder="Your name"
                  type="text"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Subject"
                  value={form.subject}
                  onChange={(v) => update("subject", v)}
                  error={errors.subject}
                  placeholder="Project inquiry"
                  type="text"
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-300">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className={`w-full resize-none rounded-xl border bg-white/60 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none transition-colors focus:border-brand-500 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500 ${
                    errors.message ? "border-error-500/60" : "border-hairline"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-error-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "sending" && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Message Sent
                      </motion.span>
                    )}
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="inline-flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <AnimatePresence>
                  {status === "sent" && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-success-500 dark:text-success-400"
                    >
                      {"Thanks — I'll reply within 24 hours."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder: string;
  type: string;
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type,
}: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none transition-colors focus:border-brand-500 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500 ${
          error ? "border-error-500/60" : "border-hairline"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
    </div>
  );
}
