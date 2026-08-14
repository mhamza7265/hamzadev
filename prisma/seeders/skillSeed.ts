import { prisma } from "@/lib/prisma";
import { SkillCategory, SkillTag } from "@/generated/prisma/enums";

type SkillData = {
  name: string;
  category: SkillCategory;
  tag: SkillTag;
};

export async function skillSeed() {
  await prisma.skill.deleteMany();
  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        name: skill.name,
        category: skill.category,
        tag: skill.tag,
      },
    });
  }
}

const skills: SkillData[] = [
  // Frontend
  { name: "React.js", category: "Frontend", tag: "Expert" },
  { name: "TypeScript", category: "Frontend", tag: "Expert" },
  { name: "Tailwind CSS", category: "Frontend", tag: "Expert" },
  { name: "Redux Toolkit", category: "Frontend", tag: "Advanced" },
  { name: "HTML5 / CSS3", category: "Frontend", tag: "Expert" },
  {
    name: "RESTful API Integration",
    category: "Frontend",
    tag: "Expert",
  },
  // Backend
  { name: "Node.js", category: "Backend", tag: "Expert" },
  { name: "Express.js", category: "Backend", tag: "Expert" },
  { name: "Laravel", category: "Backend", tag: "Advanced" },
  { name: "REST APIs", category: "Backend", tag: "Expert" },
  { name: "JWT Authentication", category: "Backend", tag: "Expert" },
  {
    name: "WebSockets / Real-Time",
    category: "Backend",
    tag: "Advanced",
  },
  // Cloud / DevOps
  { name: "MongoDB", category: "Cloud_DevOps", tag: "Expert" },
  { name: "MySQL", category: "Cloud_DevOps", tag: "Advanced" },
  {
    name: "AWS (EC2)",
    category: "Cloud_DevOps",
    tag: "Advanced",
  },
  {
    name: "AWS (S3)",
    category: "Cloud_DevOps",
    tag: "Advanced",
  },
  { name: "Vercel", category: "Cloud_DevOps", tag: "Expert" },
  { name: "Git / GitHub", category: "Cloud_DevOps", tag: "Expert" },
];
