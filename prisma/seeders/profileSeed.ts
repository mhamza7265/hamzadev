import { prisma } from "@/lib/prisma";

export async function profileSeed() {
  await prisma.profile.upsert({
    where: { id: 1 }, // Assuming ID 1 for your singleton profile
    update: {
      name: "Muhammad Hamza",
      firstName: "Hamza",
      professionalTitle: "Full Stack Engineer",
      tagline: "Building modern, scalable web applications.",
      location: "Pakistan",
      email: "contact@hamzahanif.dev",
      github: "https://github.com/hamzahanif",
      linkedin: "https://linkedin.com/in/hamzahanif",
      resumeLink: "https://hamzahanif.dev/resume.pdf",
    },
    create: {
      id: 1,
      name: "Muhammad Hamza",
      firstName: "Hamza",
      professionalTitle: "Full Stack Engineer",
      tagline: "Building modern, scalable web applications.",
      location: "Pakistan",
      email: "contact@hamzahanif.dev",
      github: "https://github.com/hamzahanif",
      linkedin: "https://linkedin.com/in/hamzahanif",
      resumeLink: "https://hamzahanif.dev/resume.pdf",
    },
  });
}
