/*
  Warnings:

  - The `status` column on the `Member` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[auth0Id]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0Id` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "auth0Id" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Member_auth0Id_key" ON "Member"("auth0Id");
