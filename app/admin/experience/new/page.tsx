import { prisma } from "@/lib/prisma";
import ExperienceForm from "@/components/admin/experience/ExperienceForm";

export default async function NewExperiencePage() {
  const skills = await prisma.skill.findMany({
    orderBy: {
      name: "asc",
    },

    select: {
      id: true,
      name: true,
    },
  });

  return <ExperienceForm skills={skills} />;
}
