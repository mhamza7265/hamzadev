"use client";

import { Skill, SkillCategory } from "@/types/types";
import SkillDialog from "./SkillDialog";
import { useState } from "react";
import { Cloud, Code, Server } from "lucide-react";

const categoryIcon: Record<SkillCategory, typeof Code> = {
  Frontend: Code,
  Backend: Server,
  Cloud_DevOps: Cloud,
};

interface SkillItemProps {
  skill: Skill;
  isDeleting: boolean;
  handleDelete: (skillId: number) => void;
}

export default function SkillItem({
  skill,
  isDeleting,
  handleDelete,
}: SkillItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const Icon = categoryIcon[skill.category];

  return (
    <>
      <div className="group relative rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-all duration-200 hover:border-indigo-500/40 hover:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div className="flex w-full justify-between">
            {/* Skill info */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                {skill.icon ?? (
                  <span className="text-sm font-semibold">
                    <Icon />
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-100">
                  {skill.name}
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {skill.category}
                </p>
              </div>
            </div>

            <div className="mt-2 min-w-0">
              <p className="mt-0.5 rounded-xl bg-green-700 px-2 py-1 text-xs text-white">
                {skill.tag}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute inset-0 flex items-center justify-end lg:justify-center rounded-xl opacity-100 pointer-events-auto md:pointer-events-none md:opacity-0 md:bg-slate-950/70 md:backdrop-blur-[2px] md:group-hover:pointer-events-auto md:group-hover:opacity-100 transition-opacity duration-200">
          {/* Edit */}
          <div className="flex gap-2 max-w-max bg-indigo-900 p-2 rounded-lg me-2">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setIsDialogOpen(true)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/15 text-indigo-400 shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:scale-105 hover:border-indigo-400/50 hover:bg-indigo-500/25 hover:text-indigo-300 disabled:cursor-not-allowed"
              aria-label={`Edit ${skill.name}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                />
              </svg>
            </button>

            {/* Delete */}
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => handleDelete(skill.id)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-red-400/30 bg-red-500/15 text-red-400 shadow-lg shadow-red-500/10 transition-all duration-200 hover:scale-105 hover:border-red-400/50 hover:bg-red-500/25 hover:text-red-300 disabled:cursor-not-allowed"
              aria-label={`Delete ${skill.name}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 6V4h8v2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 6l-1 14H6L5 6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 11v5M14 11v5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <SkillDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        skill={skill}
      />
    </>
  );
}
