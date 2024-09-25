/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusGameResult" AS ENUM ('HOST', 'VISITOR', 'DRAW', 'CANCELED', 'null');

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,
    "chearingteamId" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leagues" (
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
    "tournmentId" INTEGER NOT NULL,

    CONSTRAINT "leagues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "dateEntrance" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league_games" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "isOpenForBet" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "league_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "isBetCorrect" BOOLEAN,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueGameId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "betAmount" INTEGER NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "dateGame" TIMESTAMP(3) NOT NULL,
    "hostTeamId" INTEGER NOT NULL,
    "visitorTeamId" INTEGER NOT NULL,
    "winner" "StatusGameResult" DEFAULT 'null',
    "hostScore" INTEGER,
    "visitorScore" INTEGER,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateFinish" TIMESTAMP(3),

    CONSTRAINT "tournments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rounds" (
    "id" SERIAL NOT NULL,
    "tournmentId" INTEGER NOT NULL,
    "roundNumber" INTEGER NOT NULL,

    CONSTRAINT "rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participants_userId_leagueId_key" ON "participants"("userId", "leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToTeam_AB_unique" ON "_ParticipantToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToTeam_B_index" ON "_ParticipantToTeam"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_chearingteamId_fkey" FOREIGN KEY ("chearingteamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_tournmentId_fkey" FOREIGN KEY ("tournmentId") REFERENCES "tournments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_games" ADD CONSTRAINT "league_games_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "league_games" ADD CONSTRAINT "league_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_leagueGameId_fkey" FOREIGN KEY ("leagueGameId") REFERENCES "league_games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_hostTeamId_fkey" FOREIGN KEY ("hostTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_visitorTeamId_fkey" FOREIGN KEY ("visitorTeamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_tournmentId_fkey" FOREIGN KEY ("tournmentId") REFERENCES "tournments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTeam" ADD CONSTRAINT "_ParticipantToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTeam" ADD CONSTRAINT "_ParticipantToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
