-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "HoyoGame" AS ENUM ('GENSHIN', 'HONKAI_STAR_RAIL', 'ZENLESS_ZONE_ZERO');

-- CreateEnum
CREATE TYPE "NewsType" AS ENUM ('BROADCAST', 'PV', 'UPDATE', 'EVENT');

-- CreateTable
CREATE TABLE "Chore" (
    "id" TEXT NOT NULL,
    "game" "HoyoGame" NOT NULL,
    "name" TEXT NOT NULL,
    "intervalDays" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastDoneAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Completion" (
    "id" TEXT NOT NULL,
    "choreId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Completion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "game" "HoyoGame" NOT NULL,
    "type" "NewsType" NOT NULL DEFAULT 'UPDATE',
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Completion_choreId_date_key" ON "Completion"("choreId", "date");

-- AddForeignKey
ALTER TABLE "Completion" ADD CONSTRAINT "Completion_choreId_fkey" FOREIGN KEY ("choreId") REFERENCES "Chore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

