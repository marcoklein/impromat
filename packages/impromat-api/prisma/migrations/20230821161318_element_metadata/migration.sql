-- CreateTable
CREATE TABLE "ElementMetadata" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "elementId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "ElementMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ElementMetadata" ADD CONSTRAINT "ElementMetadata_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;
