"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Eye, EyeClosed, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";
import { Button } from "../ui/button";
import { loginSchema } from "@/schemas/schemas";

type Status = "idle" | "loggingIn" | "success" | "error";

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [displayPass, setDisplayPass] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { start } = useProgress();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setStatus("loggingIn");

    try {
      const login = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (login?.error) {
        setStatus("error");
        setSubmitError(
          login?.status === 401
            ? "Invalid email or password"
            : "Error signing in",
        );
        console.error("Login:error", login.error);
        return;
      }

      if (login?.ok) {
        setStatus("success");
        router.push("/admin");
        start();
        reset();
      }
    } catch (error) {
      console.error("Login:exception", error);
      setSubmitError("Some error occured, Please try.");
      setStatus("error");
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
            className=""
          >
            <span className="inline">
              <span className="text-slate-300 dark:text-ink-300">{"<"}</span>
              <span className="text-slate-100">Hamza</span>
              <span className="text-brand-500">.dev</span>
              <span className="text-slate-300 dark:text-ink-300">{" />"}</span>
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your portfolio dashboard
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
            {/* Banner */}
            {submitError && (
              <div className="relative mb-6 flex h-10 w-full items-center rounded-full bg-red-500 px-5 pr-12 transition-all">
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
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              {errors && errors.email && (
                <span className="text-red-500">{errors.email?.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-200"
                >
                  Password
                </label>

                <span
                  className="cursor-pointer text-sm text-blue-400 transition hover:text-blue-300"
                  onClick={() => {
                    router.push("/forgot-password");
                    start();
                  }}
                >
                  Forgot password?
                </span>
              </div>

              <div className="relative flex justify-between items-center">
                <input
                  id="password"
                  type={displayPass ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <span
                  className="absolute right-3 cursor-pointer"
                  onClick={() => {
                    setDisplayPass(!displayPass);
                  }}
                >
                  {!displayPass ? (
                    <Eye color="#64748B" size={18}></Eye>
                  ) : (
                    <EyeClosed color="#64748B" size={18}></EyeClosed>
                  )}
                </span>
              </div>
              {errors && errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
            </div>

            {/* Remember me */}
            {/* <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-2 focus:ring-blue-500/30"
              />
              Remember me
            </label> */}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "loggingIn"}
              {...(status !== "loggingIn" && {
                whileHover: { scale: 1.01 },
                whileTap: { scale: 0.98 },
              })}
              className={`w-full rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition-colors focus:outline-none ${
                status === "loggingIn"
                  ? "cursor-not-allowed bg-gray-600"
                  : "cursor-pointer bg-brand-500 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              }`}
            >
              {status === "loggingIn" ? "Signing in..." : "Sign in"}
            </motion.button>
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

export default Login;
