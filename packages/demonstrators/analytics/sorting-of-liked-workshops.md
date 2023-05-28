TBD: use `MAX()` for getting latest `updatedAt` for workshop.

```ts
// Try to sort workshops by "updatedAt" with liked elements
const userId = user.id;
const skip = 0;
const take = 1000;
const userWorkshopsAndLikedPublicWorkshopsSortedByUpdatedAt = await this
  .prismaService.$queryRaw<
  {
    workshopId: string;
    updatedAt: string;
  }[]
>`
    SELECT DISTINCT c.id as "workshopId", c."updatedAt" FROM (
      (SELECT ownedWorkshop.id, ownedworkshop."updatedAt" AS "updatedAt" FROM "Workshop" ownedWorkshop
        WHERE ownedworkshop."ownerId" = ${userId})
      UNION
      (SELECT likedWorkshop.id, ulw."updatedAt" AS "updatedAt" FROM "Workshop" likedWorkshop
        INNER JOIN "UserLikedWorkshop" ulw
          ON likedworkshop."ownerId" != ${userId}
          AND ulw."userId" = ${userId}
          AND ulw."workshopId" = likedworkshop.id)
    ) AS c
    ORDER BY c."updatedAt" DESC
    LIMIT ${take}
    OFFSET ${skip}`;

const joinedWorkshops = await Promise.all(
  userWorkshopsAndLikedPublicWorkshopsSortedByUpdatedAt.map((result) =>
    this.prismaService.workshop.findUniqueOrThrow({
      where: { id: result.workshopId },
    })
  )
);
```
