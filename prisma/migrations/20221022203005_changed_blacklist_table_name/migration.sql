/*
  Warnings:

  - You are about to drop the `blacklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "blacklist";

-- CreateTable
CREATE TABLE "blacklists" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blacklists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blacklists_token_key" ON "blacklists"("token");
