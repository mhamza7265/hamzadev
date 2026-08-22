"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { GeneralSettingsSchema } from "@/schemas/schemas";
import { updateGeneralSettings } from "@/actions/settings";

type GeneralSettingsFormData = z.infer<typeof GeneralSettingsSchema>;

type GeneralSettingsProps = {
  settings: {
    publicSiteTitle: string;
    publicSiteDescription: string;
    siteUrl: string;
    adminTitle: string;
    adminDescription: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    canonicalUrl: string;
    ogImageUrl: string;
  } | null;
};

const GeneralSettings = ({ settings }: GeneralSettingsProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeneralSettingsFormData>({
    resolver: zodResolver(GeneralSettingsSchema),
    defaultValues: {
      publicSiteTitle: settings?.publicSiteTitle || "",
      publicSiteDescription: settings?.publicSiteDescription || "",
      siteUrl: settings?.siteUrl || "",
      adminTitle: settings?.adminTitle || "",
      adminDescription: settings?.adminDescription || "",
      seoTitle: settings?.seoTitle || "",
      seoDescription: settings?.seoDescription || "",
      seoKeywords: settings?.seoKeywords || "",
      canonicalUrl: settings?.canonicalUrl || "",
      ogImageUrl: settings?.ogImageUrl || "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsSaving(true);

    const update = await updateGeneralSettings(data);

    setIsSaving(false);

    if (update.success) {
      toast.success("General settings updated successfully");
    } else {
      toast.error(update.error || "Error updating general settings");
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Public Website */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 lg:p-5">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">Public Website</h2>

          <p className="text-sm font-medium text-slate-400">
            Basic information used across your public portfolio.
          </p>
        </div>

        <div className="grid gap-5 p-5 lg:p-6">
          {/* Site Title */}
          <div>
            <label
              htmlFor="publicSiteTitle"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Site Title
            </label>

            <input
              {...register("publicSiteTitle")}
              id="publicSiteTitle"
              type="text"
              placeholder="Your Portfolio"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.publicSiteTitle && (
              <p className="mt-1 text-xs text-red-500">
                {errors.publicSiteTitle.message}
              </p>
            )}
          </div>

          {/* Site Description */}
          <div>
            <label
              htmlFor="publicSiteDescription"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Site Description
            </label>

            <textarea
              {...register("publicSiteDescription")}
              id="publicSiteDescription"
              rows={4}
              placeholder="A short description of your portfolio."
              className="w-full resize-none rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.publicSiteDescription && (
              <p className="mt-1 text-xs text-red-500">
                {errors.publicSiteDescription.message}
              </p>
            )}
          </div>

          {/* Site URL */}
          <div>
            <label
              htmlFor="siteUrl"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Site URL
            </label>

            <input
              {...register("siteUrl")}
              id="siteUrl"
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.siteUrl && (
              <p className="mt-1 text-xs text-red-500">
                {errors.siteUrl.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 lg:p-5">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Admin Dashboard
          </h2>

          <p className="text-sm text-slate-400">
            Information used for your admin dashboard.
          </p>
        </div>

        <div className="grid gap-5 p-5 lg:p-6">
          {/* Admin Title */}
          <div>
            <label
              htmlFor="adminTitle"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Admin Title
            </label>

            <input
              {...register("adminTitle")}
              id="adminTitle"
              type="text"
              placeholder="Admin Dashboard"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.adminTitle && (
              <p className="mt-1 text-xs text-red-500">
                {errors.adminTitle.message}
              </p>
            )}
          </div>

          {/* Admin Description */}
          <div>
            <label
              htmlFor="adminDescription"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Admin Description
            </label>

            <textarea
              {...register("adminDescription")}
              id="adminDescription"
              rows={4}
              placeholder="Manage your portfolio."
              className="w-full resize-none rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.adminDescription && (
              <p className="mt-1 text-xs text-red-500">
                {errors.adminDescription.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SEO & Metadata */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-1 lg:p-5">
        <div className="border-b border-slate-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">SEO & Metadata</h2>

          <p className="text-sm text-slate-400">
            Search engine and social sharing metadata for your portfolio.
          </p>
        </div>

        <div className="grid gap-5 p-5 lg:p-6">
          {/* SEO Title */}
          <div>
            <label
              htmlFor="seoTitle"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              SEO Title
            </label>

            <input
              {...register("seoTitle")}
              id="seoTitle"
              type="text"
              placeholder="Full Stack Developer | Your Name"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.seoTitle && (
              <p className="mt-1 text-xs text-red-500">
                {errors.seoTitle.message}
              </p>
            )}
          </div>

          {/* SEO Description */}
          <div>
            <label
              htmlFor="seoDescription"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              SEO Description
            </label>

            <textarea
              {...register("seoDescription")}
              id="seoDescription"
              rows={4}
              placeholder="A short description for search engines."
              className="w-full resize-none rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.seoDescription && (
              <p className="mt-1 text-xs text-red-500">
                {errors.seoDescription.message}
              </p>
            )}
          </div>

          {/* SEO Keywords */}
          {/* <div>
            <label
              htmlFor="seoKeywords"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              SEO Keywords
            </label>

            <input
              {...register("seoKeywords")}
              id="seoKeywords"
              type="text"
              placeholder="Next.js, React, Laravel, Full Stack Developer"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.seoKeywords && (
              <p className="mt-1 text-xs text-red-500">
                {errors.seoKeywords.message}
              </p>
            )}
          </div> */}

          {/* Canonical URL */}
          <div>
            <label
              htmlFor="canonicalUrl"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Canonical URL
            </label>

            <input
              {...register("canonicalUrl")}
              id="canonicalUrl"
              type="url"
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.canonicalUrl && (
              <p className="mt-1 text-xs text-red-500">
                {errors.canonicalUrl.message}
              </p>
            )}
          </div>

          {/* OG Image */}
          <div>
            <label
              htmlFor="ogImageUrl"
              className="mb-2 block text-sm font-medium text-slate-400"
            >
              Open Graph Image URL
            </label>

            <input
              {...register("ogImageUrl")}
              id="ogImageUrl"
              type="url"
              placeholder="https://example.com/og-image.png"
              className="w-full rounded-lg border border-slate-700 px-3 py-2.5 text-sm text-slate-400 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-gray-900 placeholder:text-slate-600"
            />

            {errors.ogImageUrl && (
              <p className="mt-1 text-xs text-red-500">
                {errors.ogImageUrl.message}
              </p>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 mt-1">
          {/* <button
          type="button"
          onClick={handleCancel}
          className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl border border-brand-600 px-4 py-2.5 text-sm font-medium text-brand-400 shadow-glow transition-transform hover:scale-[1.03] hover:bg-brand-600 hover:text-white"
        >
          Cancel
        </button> */}

          <button
            type="submit"
            disabled={isSaving}
            className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default GeneralSettings;
