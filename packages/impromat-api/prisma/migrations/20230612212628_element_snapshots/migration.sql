-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "snapshotParentId" TEXT;

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_snapshotParentId_fkey" FOREIGN KEY ("snapshotParentId") REFERENCES "Element"("id") ON DELETE SET NULL ON UPDATE CASCADE;
