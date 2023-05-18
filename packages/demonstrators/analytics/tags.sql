-- get tags listed by occurence with German elements
SELECT et."name", COUNT(*) AS elcount, e."languageCode"  FROM "ElementTag" et
INNER JOIN "_ElementToElementTag" etet ON etet."B" = et.id
INNER JOIN "Element" e ON etet."A" = e.id
WHERE e."languageCode" = 'de'
GROUP BY et."name", e."languageCode"
ORDER BY elcount DESC