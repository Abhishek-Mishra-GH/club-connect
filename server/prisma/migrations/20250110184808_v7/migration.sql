/*
  Warnings:

  - You are about to drop the column `college` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `college` on the `User` table. All the data in the column will be lost.
  - Added the required column `category` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `founded` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberCount` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "college",
DROP COLUMN "image",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "founded" INTEGER NOT NULL,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "memberCount" INTEGER NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "college",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "university" TEXT NOT NULL;
