-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
