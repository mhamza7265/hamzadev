"use client";

import { useState } from "react";
import SkillDialog from "./SkillDialog";

const SkillCreateButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="relative cursor-pointer inline-flex items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
      >
        Create New
      </button>
      <SkillDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
};

export default SkillCreateButton;
