"use server";

import { prisma } from "@/lib/prisma";

export async function getExperienceData() {
  try {
    const rawExperiences = await prisma.experience.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        stack: {
          orderBy: { sortOrder: "asc" },
          select: {
            skill: true,
          },
        },
        bullets: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    const experiences = rawExperiences.map((exp) => ({
      ...exp,
      stack: exp.stack.map((item) => item.skill),
    }));

    return { success: true, experiences };
  } catch (err) {
    console.error("Error getting experience data", err);
    return {
      success: false,
      error: "Error getting experience data",
    };
  }
}
