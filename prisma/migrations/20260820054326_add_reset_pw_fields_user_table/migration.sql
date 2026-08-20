-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPwCreatedAt" TIMESTAMP(3),
ADD COLUMN     "resetPwToken" TEXT;
