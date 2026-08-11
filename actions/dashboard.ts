"use server";

import { prisma } from "@/lib/prisma";
import { Stat } from "@/types/types";

export async function dashboardData() {
  try {
    const messages = await prisma.contactMessage.findMany();
    const skills = await prisma.skill.findMany();
    const projects = await prisma.project.findMany();

    const stats: Stat[] = [
      {
        title: "Projects",
        key: "projects",
        total: projects.length,
      },
      {
        title: "Messages",
        key: "messages",
        total: messages.length,
        unread: messages.filter((message) => !message.read).length,
      },
      {
        title: "Skills",
        key: "skills",
        total: skills.length,
      },
    ];

    return {
      stats,
    };
  } catch (err) {
    console.error("Dashboard data error:", err);
    throw new Error("Failed to load dashboard data");
  }
}

export async function getMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  } catch (err) {
    console.error("Dashboard data error:", err);
    throw new Error("Failed to load dashboard data");
  }
}
