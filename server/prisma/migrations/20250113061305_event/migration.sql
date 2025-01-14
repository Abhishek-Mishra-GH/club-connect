/*
  Warnings:

  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING';

-- CreateIndex
CREATE INDEX "event_user_index" ON "Registration"("eventId", "userId");
