-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clubId" TEXT,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
