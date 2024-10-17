/*
  Warnings:

  - You are about to drop the column `leagueGameId` on the `bets` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `isPasswordNeeded` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `rule` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `tournmentId` on the `leagues` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `tournmentId` on the `rounds` table. All the data in the column will be lost.
  - You are about to drop the `league_games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tournments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,groupId]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupGameId` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `leagues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leagueId` to the `rounds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_leagueGameId_fkey";

-- DropForeignKey
ALTER TABLE "league_games" DROP CONSTRAINT "league_games_gameId_fkey";

-- DropForeignKey
ALTER TABLE "league_games" DROP CONSTRAINT "league_games_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "leagues" DROP CONSTRAINT "leagues_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "leagues" DROP CONSTRAINT "leagues_tournmentId_fkey";

-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "rounds" DROP CONSTRAINT "rounds_tournmentId_fkey";

-- DropIndex
DROP INDEX "participants_userId_leagueId_key";

-- AlterTable
ALTER TABLE "bets" DROP COLUMN "leagueGameId",
ADD COLUMN     "groupGameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "leagues" DROP COLUMN "coverImage",
DROP COLUMN "dateCreated",
DROP COLUMN "description",
DROP COLUMN "isPasswordNeeded",
DROP COLUMN "ownerId",
DROP COLUMN "password",
DROP COLUMN "private",
DROP COLUMN "rule",
DROP COLUMN "tournmentId",
ADD COLUMN     "dateFinish" TIMESTAMP(3),
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "leagueId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "rounds" DROP COLUMN "tournmentId",
ADD COLUMN     "leagueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "logo" TEXT NOT NULL;

-- DropTable
DROP TABLE "league_games";

-- DropTable
DROP TABLE "tournments";

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverImage" TEXT,
    "description" VARCHAR(200),
    "rule" TEXT NOT NULL DEFAULT 'normal',
    "private" BOOLEAN NOT NULL DEFAULT true,
    "isPasswordNeeded" BOOLEAN,
    "password" TEXT NOT NULL,
    "leagueId" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_games" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "isOpenForBet" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "group_games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_userId_groupId_key" ON "participants"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_games" ADD CONSTRAINT "group_games_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_games" ADD CONSTRAINT "group_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_groupGameId_fkey" FOREIGN KEY ("groupGameId") REFERENCES "group_games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
