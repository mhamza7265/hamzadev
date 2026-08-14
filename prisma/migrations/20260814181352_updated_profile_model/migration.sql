/*
  Warnings:

  - Made the column `name` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `professionalTitle` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tagline` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `github` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedin` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resumeLink` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "professionalTitle" SET NOT NULL,
ALTER COLUMN "tagline" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "github" SET NOT NULL,
ALTER COLUMN "linkedin" SET NOT NULL,
ALTER COLUMN "resumeLink" SET NOT NULL;
