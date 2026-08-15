/*
  Warnings:

  - You are about to drop the column `userAgent` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `AnalyticsEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `AnalyticsEvent` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `event` on the `AnalyticsEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `sessionId` on table `AnalyticsEvent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visitorId` on table `AnalyticsEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AnalyticsEventName" AS ENUM ('page_view', 'github_click', 'linkedin_click', 'email_click', 'project_demo_click', 'project_github_click', 'generate_lead');

-- DropIndex
DROP INDEX "AnalyticsEvent_visitorId_idx";

-- AlterTable
ALTER TABLE "AnalyticsEvent" DROP COLUMN "userAgent",
ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" TEXT,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "title" TEXT,
DROP COLUMN "event",
ADD COLUMN     "event" "AnalyticsEventName" NOT NULL,
ALTER COLUMN "sessionId" SET NOT NULL,
ALTER COLUMN "visitorId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsEvent_eventId_key" ON "AnalyticsEvent"("eventId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_event_createdAt_idx" ON "AnalyticsEvent"("event", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_visitorId_createdAt_idx" ON "AnalyticsEvent"("visitorId", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_sessionId_createdAt_idx" ON "AnalyticsEvent"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_path_createdAt_idx" ON "AnalyticsEvent"("path", "createdAt");
