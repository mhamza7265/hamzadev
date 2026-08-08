import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seed started");

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin email and Admin password are required");
  }

  console.log("Environment variables loaded");

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: "Hamza",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created/verified.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
