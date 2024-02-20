/*
  Warnings:

  - Added the required column `memberId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Member', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "memberId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role"[];

-- CreateTable
CREATE TABLE "MemberOperation" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "operationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberOperation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
