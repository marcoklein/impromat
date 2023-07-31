-- AlterTable
ALTER TABLE "User" ADD COLUMN     "languageCodes" TEXT[];

UPDATE "User" SET "languageCodes" = ARRAY['en', 'de'];