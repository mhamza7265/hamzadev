/*
  Warnings:

  - You are about to drop the column `level` on the `Skill` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tag` on the `Skill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('Frontend', 'Backend', 'Cloud_DevOps');

-- CreateEnum
CREATE TYPE "SkillTag" AS ENUM ('Advanced', 'Expert');

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "level",
DROP COLUMN "category",
ADD COLUMN     "category" "SkillCategory" NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" "SkillTag" NOT NULL;
