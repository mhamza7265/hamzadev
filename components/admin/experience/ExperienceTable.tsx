"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GripVertical,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { deleteExperience } from "@/actions/experience";

type Experience = {
  id: number;
  jobTitle: string;
  employer: string;
  location: string;
  startDate: number;
  endDate: number | null;
  isContinued: boolean;
  stack: {
    skill: {
      id: number;
      name: string;
    };
  }[];
};

type Props = {
  experiences: Experience[];
};

export default function ExperienceTable({ experiences }: Props) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [deleteError, setDeleteError] = useState("");

  async function handleDelete(experience: Experience) {
    const confirmed = window.confirm(
      `Delete "${experience.jobTitle}" at ${experience.employer}?\n\nThis will also delete its responsibilities and selected stack.`,
    );

    if (!confirmed) return;

    setDeleteError("");
    setDeletingId(experience.id);

    try {
      const result = await deleteExperience(experience.id);

      if (!result.success) {
        setDeleteError(result.error);
      }
    } catch (error) {
      console.error(error);
      setDeleteError("Failed to delete experience.");
    } finally {
      setDeletingId(null);
      setOpenMenu(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Experience</h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your professional experience and career history.
          </p>
        </div>

        <Link
          href="/admin/experience/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Link>
      </div>

      {/* Error */}
      {deleteError && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {deleteError}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="border-b border-slate-800 bg-slate-900/50">
              <tr>
                <th className="w-12 px-4 py-3" />

                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Position
                </th>

                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Employer
                </th>

                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Location
                </th>

                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Period
                </th>

                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Stack
                </th>

                <th className="w-16 px-4 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <p className="text-sm text-slate-400">
                      No experience entries yet.
                    </p>

                    <Link
                      href="/admin/experience/new"
                      className="mt-3 inline-block text-sm text-white hover:underline"
                    >
                      Add your first experience
                    </Link>
                  </td>
                </tr>
              ) : (
                experiences.map((experience) => (
                  <tr
                    key={experience.id}
                    className="transition hover:bg-slate-900/40"
                  >
                    {/* Future drag handle */}
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        disabled
                        title="Drag to reorder"
                        className="cursor-grab text-slate-700"
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>
                    </td>

                    {/* Position */}
                    <td className="px-4 py-4">
                      <span className="font-medium text-slate-200">
                        {experience.jobTitle}
                      </span>
                    </td>

                    {/* Employer */}
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {experience.employer}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4 text-sm text-slate-400">
                      {experience.location}
                    </td>

                    {/* Period */}
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                      {experience.startDate}
                      {" – "}
                      {experience.isContinued
                        ? "Present"
                        : (experience.endDate ?? "—")}
                    </td>

                    {/* Stack */}
                    <td className="px-4 py-4">
                      <div className="flex max-w-[320px] flex-wrap gap-1.5">
                        {experience.stack.slice(0, 4).map(({ skill }) => (
                          <span
                            key={skill.id}
                            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300"
                          >
                            {skill.name}
                          </span>
                        ))}

                        {experience.stack.length > 4 && (
                          <span className="rounded-md px-2 py-1 text-xs text-slate-500">
                            +{experience.stack.length - 4}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="relative px-4 py-4">
                      <button
                        type="button"
                        disabled={deletingId === experience.id}
                        onClick={() =>
                          setOpenMenu(
                            openMenu === experience.id ? null : experience.id,
                          )
                        }
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:opacity-50"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>

                      {openMenu === experience.id && (
                        <div className="absolute right-4 top-12 z-30 w-36 rounded-lg border border-slate-700 bg-slate-900 p-1 shadow-xl">
                          <Link
                            href={`/admin/experience/${experience.id}/edit`}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>

                          <button
                            type="button"
                            disabled={deletingId === experience.id}
                            onClick={() => handleDelete(experience)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 transition hover:bg-slate-800 disabled:opacity-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
