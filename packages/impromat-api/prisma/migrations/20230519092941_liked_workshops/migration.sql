-- CreateTable
CREATE TABLE "UserLikedWorkshop" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL,

    CONSTRAINT "UserLikedWorkshop_pkey" PRIMARY KEY ("userId","workshopId")
);

-- AddForeignKey
ALTER TABLE "UserLikedWorkshop" ADD CONSTRAINT "UserLikedWorkshop_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikedWorkshop" ADD CONSTRAINT "UserLikedWorkshop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
