-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "publicSiteTitle" TEXT NOT NULL DEFAULT '',
    "publicSiteDescription" TEXT NOT NULL DEFAULT '',
    "siteUrl" TEXT NOT NULL DEFAULT '',
    "adminTitle" TEXT NOT NULL DEFAULT '',
    "adminDescription" TEXT NOT NULL DEFAULT '',
    "seoTitle" TEXT NOT NULL DEFAULT '',
    "seoDescription" TEXT NOT NULL DEFAULT '',
    "seoKeywords" TEXT NOT NULL DEFAULT '',
    "canonicalUrl" TEXT NOT NULL DEFAULT '',
    "ogImageUrl" TEXT NOT NULL DEFAULT '',
    "analyticsRetentionDays" INTEGER NOT NULL DEFAULT 90,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
