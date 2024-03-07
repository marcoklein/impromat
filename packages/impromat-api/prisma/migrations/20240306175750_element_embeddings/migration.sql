-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "embedding" vector(4096);
