"use client";

import { Skill } from "@/types/types";
import SkillItem from "./SkillItem";
import { deleteSkill } from "@/actions/skill";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SkillContainer = ({ skills }: { skills: Skill[] }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async (skillId: number) => {
    if (!confirm("Do you want to delete this skill?")) {
      return;
    }

    const toastId = toast.loading("Deleting skill...");

    try {
      setIsDeleting(true);
      const result = await deleteSkill(skillId);

      if (result.success) {
        toast.update(toastId, {
          render: "Skill deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        router.refresh();
      } else {
        toast.update(toastId, {
          render: result.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Delete failed:", error);

      toast.update(toastId, {
        render: "Failed to delete skill",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-col-1 lg:grid-cols-2 gap-4">
      {skills?.map((skill) => (
        <SkillItem
          key={skill.id}
          skill={{
            id: skill.id,
            name: skill.name,
            category: skill.category,
            tag: skill.tag,
          }}
          handleDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default SkillContainer;
