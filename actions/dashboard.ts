"use server";

import { prisma } from "@/lib/prisma";

export async function dashboardData() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { messages };
  } catch (err) {
    console.error("Dashboard data error:", err);
    throw new Error("Failed to load dashboard data");
  }
}
