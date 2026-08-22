"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { ChangePasswordSchema } from "@/schemas/schemas";
import { changePassword } from "@/actions/settings";
import { Eye, EyeClosed } from "lucide-react";

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

const SecuritySettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isCurPwVisible, setIsCurPwVisible] = useState(false);
  const [isNewPwVisible, setIsNewPwVisible] = useState(false);
  const [isConfPwVisible, setIsConfPwVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsSaving(true);

    const update = await changePassword(data);

    setIsSaving(false);

    if (update.success) {
      toast.success("Password changed successfully");
      reset();
    } else {
      toast.error(update.error || "Error changing password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 lg:p-5">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Change Password
          </h2>

          <p className="text-sm text-slate-400">
            Update the password used to access your admin dashboard.
          </p>
        </div>

        <div className="space-y-5 p-5 lg:p-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Current Password
            </label>

            <div className="relative flex justify-between items-center">
              <input
                {...register("currentPassword")}
                id="currentPassword"
                type={isCurPwVisible ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your current password"
                className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900"
              />
              <span
                className="absolute right-3 cursor-pointer"
                onClick={() => {
                  setIsCurPwVisible(!isCurPwVisible);
                }}
              >
                {!isCurPwVisible ? (
                  <Eye color="#64748B" size={18} />
                ) : (
                  <EyeClosed color="#64748B" size={18} />
                )}
              </span>
            </div>

            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              New Password
            </label>
            <div className="relative flex justify-between items-center">
              <input
                {...register("newPassword")}
                id="newPassword"
                type={isNewPwVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your new password"
                className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900"
              />
              <span
                className="absolute right-3 cursor-pointer"
                onClick={() => {
                  setIsNewPwVisible(!isNewPwVisible);
                }}
              >
                {!isNewPwVisible ? (
                  <Eye color="#64748B" size={18} />
                ) : (
                  <EyeClosed color="#64748B" size={18} />
                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Confirm New Password
            </label>

            <div className="relative flex justify-between items-center">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={isConfPwVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your new password for confirmation"
                className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900"
              />
              <span
                className="absolute right-3 cursor-pointer"
                onClick={() => {
                  setIsConfPwVisible(!isConfPwVisible);
                }}
              >
                {!isConfPwVisible ? (
                  <Eye color="#64748B" size={18} />
                ) : (
                  <EyeClosed color="#64748B" size={18} />
                )}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 mt-1">
          <button
            type="button"
            onClick={() => reset()}
            className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-brand-600 px-4 py-2.5 text-sm font-medium text-brand-400 shadow-glow transition-transform hover:scale-[1.03] hover:bg-brand-600 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isSaving ? "Changing..." : "Change Password"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default SecuritySettings;
