"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { purgeAnalytics, updateAnalyticsSettings } from "@/actions/settings";
import { useRouter } from "next/navigation";
import { AnalyticsSettingsSchema } from "@/schemas/schemas";

type AnalyticsSettingsFormData = z.infer<typeof AnalyticsSettingsSchema>;

type AnalyticsSettingsProps = {
  settings: {
    analyticsRetentionDays: number;
  } | null;
  purgeCount: number;
};

const AnalyticsSettings = ({
  settings,
  purgeCount,
}: AnalyticsSettingsProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnalyticsSettingsFormData>({
    resolver: zodResolver(AnalyticsSettingsSchema),
    defaultValues: {
      analyticsRetentionDays: settings?.analyticsRetentionDays || 90,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsSaving(true);

    const update = await updateAnalyticsSettings({
      analyticsRetentionDays: Number(data.analyticsRetentionDays),
    });

    setIsSaving(false);

    if (update.success) {
      toast.success("Analytics settings updated successfully");
      router.refresh();
    } else {
      toast.error(update.error || "Error updating analytics settings");
    }
  };

  const handlePurge = async () => {
    if (purgeCount === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${purgeCount} analytics records? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setIsPurging(true);

    const result = await purgeAnalytics();

    setIsPurging(false);

    if (result.success) {
      toast.success(result.message || "Analytics data purged successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Error purging analytics data");
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Retention */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 lg:p-5"
      >
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">Data Retention</h2>

          <p className="text-sm text-slate-400">
            Configure how long analytics data should be retained.
          </p>
        </div>

        <div className="p-5 lg:p-6">
          <div className="max-w-sm">
            <label
              htmlFor="analyticsRetentionDays"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Retention Period
            </label>

            <div className="flex items-center gap-3">
              <input
                {...register("analyticsRetentionDays", {
                  valueAsNumber: true,
                })}
                id="analyticsRetentionDays"
                type="number"
                min={1}
                max={3650}
                className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900"
              />

              <span className="text-sm text-slate-500">days</span>
            </div>

            {errors.analyticsRetentionDays && (
              <p className="mt-1 text-xs text-red-500">
                {errors.analyticsRetentionDays.message}
              </p>
            )}

            <p className="mt-2 text-xs text-slate-500">
              Analytics records older than this period will be eligible for
              deletion.
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-800 px-5 py-4">
          <button
            type="submit"
            disabled={isSaving}
            className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Purge */}
      <section className="rounded-xl border border-red-900/50 bg-slate-900/70 p-1 lg:p-5">
        <div className="border-b border-red-900/50 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Purge Analytics Data
          </h2>

          <p className="text-sm text-slate-400">
            Permanently delete analytics records older than your retention
            period.
          </p>
        </div>

        <div className="space-y-4 p-5 lg:p-6">
          <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">
                {purgeCount.toLocaleString()}
              </span>{" "}
              analytics {purgeCount === 1 ? "record is" : "records are"}{" "}
              currently eligible for deletion.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handlePurge}
              disabled={isPurging || purgeCount === 0}
              className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-red-600 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPurging
                ? "Deleting..."
                : `Delete ${purgeCount.toLocaleString()} ${
                    purgeCount === 1 ? "Record" : "Records"
                  }`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsSettings;
