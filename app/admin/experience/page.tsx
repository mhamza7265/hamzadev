import { prisma } from "@/lib/prisma";
import ExperienceTable from "@/components/admin/experience/ExperienceTable";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: {
      sortOrder: "asc",
    },

    include: {
      stack: {
        orderBy: {
          sortOrder: "asc",
        },

        include: {
          skill: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return <ExperienceTable experiences={experiences} />;
}
