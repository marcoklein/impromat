
-- CreateTable
CREATE TABLE "ElementToElementTag" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "elementId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ElementToElementTag_pkey" PRIMARY KEY ("elementId","tagId")
);

-- AddForeignKey
ALTER TABLE "ElementToElementTag" ADD CONSTRAINT "ElementToElementTag_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementToElementTag" ADD CONSTRAINT "ElementToElementTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ElementTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- migrate data from _ElementToElementTag to new ElementToElementTag table
INSERT INTO "ElementToElementTag" ("updatedAt", "elementId", "tagId")
SELECT CURRENT_TIMESTAMP, "_ElementToElementTag"."A", "_ElementToElementTag"."B"
FROM "_ElementToElementTag";

-- DropForeignKey
ALTER TABLE "_ElementToElementTag" DROP CONSTRAINT "_ElementToElementTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ElementToElementTag" DROP CONSTRAINT "_ElementToElementTag_B_fkey";

-- DropTable
DROP TABLE "_ElementToElementTag";