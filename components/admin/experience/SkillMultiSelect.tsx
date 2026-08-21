"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";

type Skill = {
  id: number;
  name: string;
};

type SkillMultiSelectProps = {
  skills: Skill[];
  value: number[];
  onChange: (value: number[]) => void;
  error?: string;
};

export default function SkillMultiSelect({
  skills,
  value,
  onChange,
  error,
}: SkillMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSkills = skills.filter((skill) => value.includes(skill.id));

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  function toggleSkill(skillId: number) {
    if (value.includes(skillId)) {
      onChange(value.filter((id) => id !== skillId));
    } else {
      onChange([...value, skillId]);
    }
  }

  function removeSkill(event: React.MouseEvent, skillId: number) {
    event.stopPropagation();

    onChange(value.filter((id) => id !== skillId));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border bg-slate-950 px-3 py-2 text-left outline-none transition ${
          error
            ? "border-red-500/70"
            : "border-slate-700 hover:border-slate-600"
        }`}
      >
        <div className="flex flex-1 flex-wrap gap-1.5">
          {selectedSkills.length === 0 ? (
            <span className="py-0.5 text-sm text-slate-500">
              Select technologies...
            </span>
          ) : (
            selectedSkills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300"
              >
                {skill.name}

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => removeSkill(event, skill.id)}
                  className="cursor-pointer text-slate-500 transition hover:text-white"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))
          )}
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 p-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills..."
                autoFocus
                className="w-full rounded-md border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-slate-500"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {filteredSkills.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-slate-500">
                No skills found.
              </div>
            ) : (
              filteredSkills.map((skill) => {
                const selected = value.includes(skill.id);

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    <span>{skill.name}</span>

                    {selected && <Check className="h-4 w-4 text-white" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
