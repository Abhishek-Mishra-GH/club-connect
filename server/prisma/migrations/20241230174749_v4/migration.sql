/*
  Warnings:

  - The primary key for the `Club` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserFollowing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `image` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollowing" DROP CONSTRAINT "_UserFollowing_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollowing" DROP CONSTRAINT "_UserFollowing_B_fkey";

-- AlterTable
ALTER TABLE "Club" DROP CONSTRAINT "Club_pkey",
ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Club_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Club_id_seq";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "clubId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "clubId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Registration" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "eventId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "avatar" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_UserFollowing" DROP CONSTRAINT "_UserFollowing_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_UserFollowing_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowing" ADD CONSTRAINT "_UserFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowing" ADD CONSTRAINT "_UserFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
