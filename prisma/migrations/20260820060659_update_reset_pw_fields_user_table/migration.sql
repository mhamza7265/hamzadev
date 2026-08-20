/*
  Warnings:

  - You are about to drop the column `resetPwCreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPwToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPwCreatedAt",
DROP COLUMN "resetPwToken",
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);
