-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "firstName" TEXT,
    "professionalTitle" TEXT,
    "tagline" TEXT,
    "location" TEXT,
    "email" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "resumeLink" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
