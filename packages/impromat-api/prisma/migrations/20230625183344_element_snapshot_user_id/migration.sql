-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "snapshotUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_snapshotUserId_fkey" FOREIGN KEY ("snapshotUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
