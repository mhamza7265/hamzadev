"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckIcon, Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { resetPwSchema } from "@/schemas/schemas";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";
import { z } from "zod";
import { resetPassword } from "@/actions/auth";

type ResetPasswordType = z.infer<typeof resetPwSchema>;

type StatusType = "idle" | "resetting" | "success" | "error";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [status, setStatus] = useState<StatusType>("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { start } = useProgress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPwSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token) {
      setStatus("error");
      setSubmitError("This password reset link is invalid or has expired.");
      return;
    }

    setStatus("resetting");
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const result = await resetPassword(token, data.password);

      if (!result.success) {
        setStatus("error");
        setSubmitError(result.error || "Unable to reset your password.");
        return;
      }

      setStatus("success");
      setSubmitSuccess(
        result.message || "Your password has been reset successfully.",
      );
      setTimeout(() => {
        router.push("/login");
        start();
      }, 3000);
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

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
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Enter a new password for your account
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/20"
        >
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Error Banner */}
            {submitError && (
              <div className="relative flex min-h-10 w-full items-center rounded-full bg-red-500 px-5 py-2 pr-12">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} color="#fff" />
                  <p className="text-sm text-white">{submitError}</p>
                </div>

                <Button
                  type="button"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent hover:bg-transparent [&:active:not([aria-haspopup])]:-translate-y-1/2"
                  onClick={() => setSubmitError("")}
                >
                  <X className="text-white" />
                </Button>
              </div>
            )}

            {/* Success Banner */}
            {submitSuccess && (
              <div className="relative flex min-h-10 w-full items-center rounded-full bg-green-500 px-5 py-2 pr-12">
                <div className="flex items-center gap-3">
                  <CheckIcon size={18} color="#fff" />
                  <p className="text-sm text-white">{submitSuccess}</p>
                </div>

                <Button
                  type="button"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent hover:bg-transparent [&:active:not([aria-haspopup])]:-translate-y-1/2"
                  onClick={() => setSubmitSuccess("")}
                >
                  <X className="text-white" />
                </Button>
              </div>
            )}

            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                New password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your new password"
                  disabled={status === "success"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm your new password"
                  disabled={status === "success"}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-200"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "resetting" || status === "success"}
              {...(status !== "resetting" &&
                status !== "success" && {
                  whileHover: { scale: 1.01 },
                  whileTap: { scale: 0.98 },
                })}
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-colors focus:outline-none ${
                status === "resetting" || status === "success"
                  ? "cursor-not-allowed bg-gray-600"
                  : "cursor-pointer bg-brand-500 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              }`}
            >
              {status === "resetting"
                ? "Resetting password..."
                : status === "success"
                  ? "Password reset"
                  : "Reset password"}
            </motion.button>

            {/* Login */}
            <div className="text-center">
              <span
                className="cursor-pointer text-sm text-blue-400 transition hover:text-blue-300"
                onClick={() => {
                  router.push("/login");
                  start();
                }}
              >
                ← Back to sign in
              </span>
            </div>
          </form>
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

export default ResetPasswordForm;
