"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SkillDialogSchema } from "@/schemas/schemas";
import { Skill } from "@/types/types";
import { useEffect, useState } from "react";
import { createSkill, updateSkill } from "@/actions/skill";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type SkillDialogType = z.infer<typeof SkillDialogSchema>;

interface SkillDialogProps {
  open: boolean;
  skill?: Skill | null;
  onClose: () => void;
}

export default function SkillDialog({
  open,
  skill,
  onClose,
}: SkillDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillDialogType>({
    resolver: zodResolver(SkillDialogSchema),
    defaultValues: {
      name: "",
      category: "",
      tag: "",
    },
  });

  useEffect(() => {
    reset({
      name: skill?.name ?? "",
      category: skill?.category ?? "",
      tag: skill?.tag ?? "",
    });
  }, [skill, reset]);

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }

    return () => {
      body.style.overflowY = "";
    };
  }, [open]);

  const isEditing = Boolean(skill);

  if (!open) return null;

  const onSubmit = async (data: SkillDialogType) => {
    setSubmitting(true);

    try {
      if (isEditing) {
        if (!skill?.id) {
          toast.error("Skill ID is missing");
          return;
        }

        const updateSkillRes = await updateSkill({
          ...(data as Skill),
          id: skill.id,
        });

        if (!updateSkillRes.success) {
          toast.error(updateSkillRes.message);
          return;
        }

        toast.success("Skill updated successfully");
      } else {
        const createSkillRes = await createSkill(data as Skill);

        if (!createSkillRes.success) {
          toast.error(createSkillRes.message);
          return;
        }

        toast.success("Skill created successfully");
      }

      reset();
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              {isEditing ? "Edit Skill" : "Add Skill"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the skill information."
                : "Add a new skill to your portfolio."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 px-6 py-6">
            {/* Name */}
            <div>
              <label
                htmlFor="skill-name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Skill name
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder="e.g. React.js"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors?.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="skill-category"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Category
              </label>

              <select
                {...register("category")}
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Cloud_DevOps">Cloud/DevOps</option>
              </select>
              {errors?.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.category?.message}
                </p>
              )}
            </div>

            {/* Tag */}
            <div>
              <label
                htmlFor="skill-tag"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Tag
              </label>

              <select
                {...register("tag")}
                className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Select Tag</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
              </select>

              {errors?.tag && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.tag?.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 bg-slate-950/40 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className={`relative cursor-pointer inline-flex items-center gap-2 overflow-hidden rounded-xl border border-brand-600 px-4 py-2.5 text-sm font-medium text-brand-400 shadow-glow ${submitting ? "" : "transition-transform hover:scale-[1.03] hover:bg-brand-600 hover:text-white"}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className={`relative cursor-pointer inline-flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow active:scale-95 disabled:cursor-not-allowed disabled:opacity-80 ${submitting ? "" : "transition-transform hover:scale-[1.03]"}`}
            >
              {isEditing
                ? !submitting
                  ? "Save Changes"
                  : "Saving..."
                : !submitting
                  ? "Add Skill"
                  : "Adding..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
