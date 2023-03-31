-- DML
UPDATE  "Element" e
SET "sourceName" = 'impromat'
WHERE "sourceName" IS NULL;

-- DDL
ALTER TABLE "Element" ALTER COLUMN "sourceName" SET NOT NULL;
