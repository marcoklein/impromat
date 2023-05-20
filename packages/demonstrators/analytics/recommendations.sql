-- list elements that are part of a workshop (=> part of workshop element)
SELECT e.id, e."name", count(*) AS occurences  FROM "Element" e
INNER JOIN "WorkshopElement" we ON we."basedOnId" = e.id
WHERE e.visibility = 'PUBLIC'
GROUP BY e.id, e."name"
ORDER BY occurences DESC;

-- which workshops have a specific element?
SELECT * FROM "Workshop" w
INNER JOIN "WorkshopSection" ws ON w.id = ws."workshopId" 
INNER JOIN "WorkshopElement" we ON we."workshopSectionId" = ws.id
WHERE we."basedOnId" = '<element-id>';

-- which workshop sections have a specific element?
SELECT * FROM  "WorkshopSection" ws
INNER JOIN "WorkshopElement" we ON we."workshopSectionId" = ws.id
WHERE we."basedOnId" = '<element-id>';

-- which elements come after a certain element? (e.g. recommendation)
SELECT we."orderIndex", e."name" FROM "WorkshopSection" ws
INNER JOIN "WorkshopElement" we ON we."workshopSectionId" = ws.id
INNER JOIN "Element" e ON e.id = we."basedOnId"
WHERE (ws.id, we."orderIndex") IN (
	SELECT ws.id AS "sectionId", we."orderIndex" + -1 FROM  "WorkshopSection" ws
	INNER JOIN "WorkshopElement" we ON we."workshopSectionId" = ws.id
	WHERE we."basedOnId" = '<element-id>')
;

-- # of workshops per user
SELECT u.id, MAX(u."createdAt") AS usercreated, MAX(w."updatedAt") AS workshopupdated, count(w.id) AS workshopcount FROM "Workshop" w
RIGHT OUTER JOIN "User" u ON u.id = w."ownerId"
GROUP BY u.id 
ORDER BY workshopcount DESC;

-- get workshops of user
SELECT * FROM "Workshop" w 
WHERE w."ownerId" = '<user-id>';

SELECT * FROM "Element" e
ORDER BY e."updatedAt" DESC;