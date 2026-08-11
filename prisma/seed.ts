import { prisma } from "@/lib/prisma";
import { adminSeed } from "./seeders/adminSeed";
import { projectSeed } from "./seeders/projectSeed";
import { skillSeed } from "./seeders/skillSeed";

async function main() {
  await adminSeed();
  await skillSeed();
  await projectSeed();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
