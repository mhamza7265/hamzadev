import { prisma } from "@/lib/prisma";

export async function skillSeed() {
  await prisma.skill.deleteMany();
  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        name: skill.name,
        category: skill.category,
        level: skill.level,
        tag: skill.tag,
      },
    });
  }
}

const skills = [
  // Frontend
  { name: "React.js", category: "Frontend", level: 95, tag: "Expert" },
  { name: "TypeScript", category: "Frontend", level: 92, tag: "Expert" },
  { name: "Tailwind CSS", category: "Frontend", level: 94, tag: "Expert" },
  { name: "Redux Toolkit", category: "Frontend", level: 88, tag: "Advanced" },
  { name: "HTML5 / CSS3", category: "Frontend", level: 96, tag: "Expert" },
  {
    name: "RESTful API Integration",
    category: "Frontend",
    level: 90,
    tag: "Expert",
  },
  // Backend
  { name: "Node.js", category: "Backend", level: 90, tag: "Expert" },
  { name: "Express.js", category: "Backend", level: 89, tag: "Expert" },
  { name: "Laravel", category: "Backend", level: 85, tag: "Advanced" },
  { name: "REST APIs", category: "Backend", level: 92, tag: "Expert" },
  { name: "JWT Authentication", category: "Backend", level: 90, tag: "Expert" },
  {
    name: "WebSockets / Real-Time",
    category: "Backend",
    level: 82,
    tag: "Advanced",
  },
  // Cloud / DevOps
  { name: "MongoDB", category: "Cloud/DevOps", level: 90, tag: "Expert" },
  { name: "MySQL", category: "Cloud/DevOps", level: 87, tag: "Advanced" },
  {
    name: "AWS (EC2, S3)",
    category: "Cloud/DevOps",
    level: 84,
    tag: "Advanced",
  },
  { name: "Vercel", category: "Cloud/DevOps", level: 88, tag: "Expert" },
  { name: "Git / GitHub", category: "Cloud/DevOps", level: 93, tag: "Expert" },
];
