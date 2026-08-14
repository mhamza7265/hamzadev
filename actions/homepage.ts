"use server";

import { prisma } from "@/lib/prisma";
import { codeToHtml } from "shiki";

export async function getHomepageData() {
  try {
    const skills = await prisma.skill.findMany();
    const projects = await prisma.project.findMany({
      include: { technologies: true, features: true, highlights: true },
    });

    const projectsWithCode = await Promise.all(
      projects.map(async (project) => {
        let highlightedCode = null;

        if (project.previewCode) {
          highlightedCode = await codeToHtml(project.previewCode, {
            lang: project.codeLanguage ?? "text",
            theme: "vitesse-dark",
          });
        }

        return {
          ...project,
          highlightedCode,
        };
      }),
    );

    return { skills, projectsWithCode };
  } catch (err) {
    console.error("Response err", err);
  }
}
