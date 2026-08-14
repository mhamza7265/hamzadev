"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "@/components/main/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/main/icons";
import { contactFormSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProfileType } from "@/types/types";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact({ profile }: { profile: ProfileType | null }) {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Contact:res err", response.json());
      throw new Error("Failed to submit");
    }

    const result = await response.json();
    console.log("Contact:result", result);
    setStatus("sent");
    reset();
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email,
      href: `mailto:${profile?.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile?.location,
      href: undefined,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "github.com",
      href: profile?.github,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "linkedin.com",
      href: profile?.linkedin,
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3"
            noValidate
          >
            <div className="rounded-2xl glass-strong p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  register={register}
                  error={errors}
                  placeholder="Your name"
                  type="text"
                />
                <Field
                  label="Email"
                  register={register}
                  error={errors}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div className="mt-4">
                <Field
                  label="Subject"
                  register={register}
                  error={errors}
                  placeholder="Project inquiry"
                  type="text"
                />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-300">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className={`w-full resize-none rounded-xl border bg-white/60 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none transition-colors focus:border-brand-500 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500 ${
                    errors.message ? "border-error-500/60" : "border-hairline"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-error-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="relative cursor-pointer inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
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
  register: UseFormRegister<FormState>;
  error: FieldErrors<FormState>;
  placeholder: string;
  type: string;
}

function Field({ label, register, error, placeholder, type }: FieldProps) {
  const fieldName = label.toLowerCase() as keyof FormState;
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-ink-300">
        {label}
      </label>
      <input
        type={type}
        {...register(fieldName)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none transition-colors focus:border-brand-500 dark:bg-white/5 dark:text-ink-100 dark:placeholder:text-ink-500 ${
          error?.[fieldName] ? "border-error-500/60" : "border-hairline"
        }`}
      />
      {error?.[fieldName] && (
        <p className="mt-1.5 text-xs text-error-500">
          {error?.[fieldName].message}
        </p>
      )}
    </div>
  );
}
