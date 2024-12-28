/*
  Warnings:

  - You are about to drop the column `adminId` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_adminId_fkey";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "adminId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'upcoming';

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- CreateIndex
CREATE UNIQUE INDEX "Club_email_key" ON "Club"("email");
