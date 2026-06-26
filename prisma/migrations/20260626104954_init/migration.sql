-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "StartupStatus" AS ENUM ('DRAFT', 'GENERATED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "idea" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "targetAudience" TEXT,
    "budget" INTEGER,
    "country" TEXT,
    "generatedContent" JSONB NOT NULL,
    "status" "StartupStatus" NOT NULL DEFAULT 'DRAFT',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "exportedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Startup_slug_key" ON "Startup"("slug");

-- CreateIndex
CREATE INDEX "Startup_userId_idx" ON "Startup"("userId");

-- CreateIndex
CREATE INDEX "Startup_slug_idx" ON "Startup"("slug");

-- CreateIndex
CREATE INDEX "Startup_status_idx" ON "Startup"("status");

-- CreateIndex
CREATE INDEX "Startup_createdAt_idx" ON "Startup"("createdAt");

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
