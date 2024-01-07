/*
  Warnings:

  - The primary key for the `Operation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `operationEnd` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `operationId` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `operationNumber` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `operationStart` on the `Operation` table. All the data in the column will be lost.
  - The `sequenceNumber` column on the `Operation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `end` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_pkey",
DROP COLUMN "operationEnd",
DROP COLUMN "operationId",
DROP COLUMN "operationNumber",
DROP COLUMN "operationStart",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
DROP COLUMN "sequenceNumber",
ADD COLUMN     "sequenceNumber" SERIAL NOT NULL,
ADD CONSTRAINT "Operation_pkey" PRIMARY KEY ("id");
