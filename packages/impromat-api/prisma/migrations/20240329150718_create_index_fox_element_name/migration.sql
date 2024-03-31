-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateIndex
CREATE INDEX "Element_languageCode_idx" ON "Element"("languageCode");

-- CreateIndex
CREATE INDEX "name_idx" ON "Element" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "markdown_idx" ON "Element" USING GIN ("markdown" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "summary_idx" ON "Element" USING GIN ("summary" gin_trgm_ops);
