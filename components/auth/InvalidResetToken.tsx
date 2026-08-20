"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";

const InvalidResetToken = () => {
  const router = useRouter();
  const { start } = useProgress();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="inline">
              <span className="text-slate-300">{"<"}</span>
              <span className="text-slate-100">Hamza</span>
              <span className="text-brand-500">.dev</span>
              <span className="text-slate-300">{" />"}</span>
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Invalid Reset Link
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            This password reset link is invalid or has expired.
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl shadow-black/20"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10"
          >
            <AlertTriangle className="text-red-500" size={28} />
          </motion.div>

          <h2 className="text-lg font-semibold text-white">
            Link no longer available
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Password reset links are only valid for a limited time. Please
            request a new reset link to continue.
          </p>

          <motion.button
            type="button"
            onClick={() => {
              router.push("/forgot-password");
              start();
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full cursor-pointer rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Request a new reset link
          </motion.button>

          <button
            type="button"
            onClick={() => {
              router.push("/login");
              start();
            }}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 text-center text-xs text-slate-600"
        >
          Portfolio Admin
        </motion.p>
      </motion.div>
    </div>
  );
};

export default InvalidResetToken;
