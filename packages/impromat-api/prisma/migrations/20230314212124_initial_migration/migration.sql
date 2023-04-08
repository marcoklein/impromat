-- CreateEnum
CREATE TYPE "ElementVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateTable
CREATE TABLE "Element" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "markdown" TEXT,
    "languageCode" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "sourceBaseUrl" TEXT,
    "licenseName" TEXT,
    "licenseUrl" TEXT,
    "visibility" "ElementVisibility" NOT NULL DEFAULT 'PRIVATE',
    "improbibIdentifier" TEXT,
    "ownerId" TEXT,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElementTag" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElementTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteElement" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,

    CONSTRAINT "UserFavoriteElement_pkey" PRIMARY KEY ("userId","elementId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT,
    "googleSubscriptionId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopSection" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT,
    "color" TEXT,
    "isCollapsed" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" DOUBLE PRECISION NOT NULL DEFAULT -1,
    "workshopId" TEXT NOT NULL,

    CONSTRAINT "WorkshopSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopElement" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "note" TEXT,
    "color" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT -1,
    "basedOnId" TEXT NOT NULL,
    "workshopSectionId" TEXT NOT NULL,

    CONSTRAINT "WorkshopElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ElementToElementTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Element_improbibIdentifier_key" ON "Element"("improbibIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "ElementTag_name_key" ON "ElementTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleSubscriptionId_key" ON "User"("googleSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "_ElementToElementTag_AB_unique" ON "_ElementToElementTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ElementToElementTag_B_index" ON "_ElementToElementTag"("B");

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteElement" ADD CONSTRAINT "UserFavoriteElement_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteElement" ADD CONSTRAINT "UserFavoriteElement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workshop" ADD CONSTRAINT "Workshop_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopSection" ADD CONSTRAINT "WorkshopSection_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopElement" ADD CONSTRAINT "WorkshopElement_basedOnId_fkey" FOREIGN KEY ("basedOnId") REFERENCES "Element"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopElement" ADD CONSTRAINT "WorkshopElement_workshopSectionId_fkey" FOREIGN KEY ("workshopSectionId") REFERENCES "WorkshopSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToElementTag" ADD CONSTRAINT "_ElementToElementTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToElementTag" ADD CONSTRAINT "_ElementToElementTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ElementTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
