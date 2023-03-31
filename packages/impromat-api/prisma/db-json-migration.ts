// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable @typescript-eslint/no-floating-promises

// Script to migrate from legacy db.json to PostgreSQL.

import { ElementVisibility, PrismaClient } from '@prisma/client';
import * as fs from 'fs';

interface LegacyDb {
  elementsOfUsers: Record<
    string,
    {
      updatedAt: number;
      id: string;
      version: number;
      name: string;
      deleted: boolean;
      markdown: string;
      tags: string[];
      note: string;
      basedOn: string | null;
      languageCode: string | null;
      sourceUrl: string | null;
      sourceName: string | null;
      sourceBaseUrl: string | null;
      licenseName: string | null;
      licenseUrl: string | null;
    }[]
  >;
  workshopsOfUsers: Record<
    string,
    {
      id: string;
      deleted: boolean;
      updatedAt: number;
      name: string;
      description: string;
      sections: string[];
      version: number;
    }[]
  >;
  sectionsOfUsers: Record<
    string,
    {
      updatedAt: number;
      color: string;
      elements: string[];
      id: string;
      deleted: boolean;
      isCollapsed: boolean;
      isVisible: boolean;
      name: string;
      note: string;
      version: number;
    }[]
  >;
  users: Record<
    string,
    {
      createdAt: number;
      deleted: boolean;
      updatedAt: number;
      favoriteElementIds: string[];
      version: number;
    }
  >;
}

const prisma = new PrismaClient();
console.log('Created Prisma client.');

async function main() {
  const legacyDb = JSON.parse(
    fs.readFileSync('assets/db.ignore.json').toString('utf8'),
  ) as LegacyDb;
  console.log('Loaded legacy db.json');

  await createEntities();
  await sanityCheck();

  async function createEntities() {
    // USERS
    const legacyUsers = legacyDb.users;
    const newUsersMapping: Record<string, string> = {};
    // const newImprobibIdsMapping: Record<string, string> = {};
    for (const [userGoogleId, user] of Object.entries(legacyUsers)) {
      const { createdAt, deleted, favoriteElementIds } = user;
      // TODO connect favorite elements later
      const newUser = await prisma.user.create({
        data: {
          googleSubscriptionId: userGoogleId,
          createdAt: new Date(createdAt),
          deleted,
        },
      });
      newUsersMapping[userGoogleId] = newUser.id;
    }
    for (const googleId of Object.keys(legacyDb.workshopsOfUsers)) {
      const exists = await prisma.user.findUnique({
        where: { googleSubscriptionId: googleId },
      });
      if (!exists) {
        const newUser = await prisma.user.create({
          data: {
            googleSubscriptionId: googleId,
          },
        });
        console.log('userId: ', googleId, 'new id=', newUser.id);
        newUsersMapping[googleId] = newUser.id;
      }
    }
    console.log('mapping table=', newUsersMapping);
    // WORKSHOPS
    for (const [userGoogleId, workshops] of Object.entries(
      legacyDb.workshopsOfUsers,
    )) {
      console.log('adding workshops for user id', userGoogleId);
      for (const legacyWorkshop of workshops) {
        const {
          deleted,
          description,
          id,
          name,
          sections: legacySections,
          updatedAt,
          version,
        } = legacyWorkshop;
        // do not migrate deleted workshops
        if (deleted) continue;
        console.log('mapping=', newUsersMapping[userGoogleId]);
        const workshop = await prisma.workshop.create({
          data: {
            // intentially considering updatedAt as createdAt
            createdAt: new Date(updatedAt),
            deleted,
            description,
            name,
            id,
            ownerId: newUsersMapping[userGoogleId],
          },
        });
        let legacySectionOrderIndex = -1;
        for (const legacyWorkshopSectionId of legacySections) {
          const legacySection = legacyDb.sectionsOfUsers[userGoogleId].find(
            (legacySection) => legacySection.id === legacyWorkshopSectionId,
          );
          if (!legacySection) {
            console.warn(`Section not found ${legacyWorkshopSectionId}`);
            continue;
          }
          legacySectionOrderIndex++;

          const {
            color,
            deleted,
            elements: legacySectionElements,
            id,
            isCollapsed,
            name,
            updatedAt,
            // deprecated fields
            note,
            isVisible,
            version,
          } = legacySection;
          if (
            !isVisible &&
            !legacySectionElements.length &&
            legacySections.length > 1
          ) {
            console.log('skipping invisible workshop section without elements');
            continue;
          }
          console.log('adding workshop section with id', id);
          await prisma.workshopSection.create({
            data: {
              id,
              color,
              createdAt: new Date(updatedAt),
              deleted,
              isCollapsed,
              orderIndex: legacySectionOrderIndex,
              name,
              workshopId: workshop.id,
            },
          });

          // WORKSHOP ELEMENTS
          let legacySectionElementIndex = -1;
          for (const legacySectionElementId of legacySectionElements) {
            const legacySectionElement = legacyDb.elementsOfUsers[
              userGoogleId
            ].find(
              (legacyElement) => legacyElement.id === legacySectionElementId,
            );
            if (!legacySectionElement) {
              console.warn(
                `Workshop Element not found ${legacySectionElementId}`,
              );
              continue;
            }
            legacySectionElementIndex++;
            const {
              basedOn: legacyBasedOn,
              id,
              note,
              updatedAt,
              version,
              deleted,
              // unused for new workshop element
              languageCode,
              licenseName,
              licenseUrl,
              markdown,
              name,
              sourceBaseUrl,
              sourceName,
              sourceUrl,
              tags,
            } = legacySectionElement;
            let basedOn = legacyBasedOn;
            if (!basedOn) {
              // legacy db sometimes has workshop elements without basedOn
              // thus, we create a new element that this element is based on
              const newElement = await prisma.element.create({
                data: {
                  createdAt: new Date(updatedAt),
                  ownerId: newUsersMapping[userGoogleId],
                  // improbibIdentifier
                  name,
                  markdown,
                  languageCode,
                  licenseName,
                  licenseUrl,
                  sourceBaseUrl,
                  sourceName,
                  sourceUrl,
                  tags: {
                    connectOrCreate: tags.map((tagName) => ({
                      create: {
                        name: tagName,
                      },
                      where: {
                        name: tagName,
                      },
                    })),
                  },
                },
              });
              // newImprobibIdsMapping[newElement.id] = newElement.id;
              basedOn = newElement.id;
              console.log(`created interim element with it ${newElement.id}`);
            }
            // with includes('-') we test if its a uuid (improbib elements do not have a '-' in the id)
            const basedOnCreate = basedOn.includes('-')
              ? {
                  create: { name: 'custom-section-created', id: basedOn },
                  where: { id: basedOn },
                }
              : {
                  create: {
                    name: 'improbib-section-created',
                    improbibIdentifier: basedOn,
                  },
                  where: { improbibIdentifier: basedOn },
                };
            await prisma.workshopElement.create({
              data: {
                basedOn: {
                  connectOrCreate: basedOnCreate,
                },
                workshopSection: {
                  connect: {
                    id: legacyWorkshopSectionId,
                  },
                },
                createdAt: new Date(updatedAt),
                deleted,
                id,
                note,
                orderIndex: legacySectionElementIndex,
                version,
                color: undefined,
              },
            });
          }
        }
      }
    }
    // ELEMENTS
    // add all elements of users that do not have a basedOn
    // and are not in the workshopSections already (then they would have a basedOn)
    for (const [userGoogleId, legacyElements] of Object.entries(
      legacyDb.elementsOfUsers,
    )) {
      for (const legacyElement of legacyElements) {
        const {
          basedOn,
          id,
          note,
          updatedAt,
          version,
          deleted,
          // unused for new workshop element
          languageCode,
          licenseName,
          licenseUrl,
          markdown,
          name,
          sourceBaseUrl,
          sourceName,
          sourceUrl,
          tags,
        } = legacyElement;
        if (basedOn) {
          console.log(
            `skipping element with id ${id} as it is a workshop element (basedOn is defined)`,
          );
          continue;
        }
        if (await prisma.workshopElement.findUnique({ where: { id: id } })) {
          if (!id.includes('-')) {
            throw new Error('Invalid id - was improbib id mixed?');
          }
          console.log(
            `skipping element with id ${id} as it is already a workshop element`,
          );
          continue;
        }
        const isImprobibElement = !id.includes('-');
        const content = {
          id: isImprobibElement ? undefined : id,
          improbibIdentifier: isImprobibElement ? id : undefined,
          createdAt: new Date(updatedAt),
          ownerId: isImprobibElement ? null : newUsersMapping[userGoogleId],
          name,
          markdown,
          languageCode,
          licenseName,
          licenseUrl,
          sourceBaseUrl,
          sourceName,
          sourceUrl,
          visibility: isImprobibElement
            ? ElementVisibility.PUBLIC
            : ElementVisibility.PRIVATE,
          tags: {
            connectOrCreate: tags.map((tagName) => ({
              create: {
                name: tagName,
              },
              where: {
                name: tagName,
              },
            })),
          },
        };
        const newElement = await prisma.element.upsert({
          create: content,
          update: content,
          where: {
            id: isImprobibElement ? undefined : id,
            improbibIdentifier: isImprobibElement ? id : undefined,
          },
        });
        console.log(`created element with id ${newElement.id}`);
      }
    }
    // FAVORITE ELEMENTS
    for (const [googleUserId, legacyUser] of Object.entries(legacyDb.users)) {
      for (const legacyFavoriteElementId of legacyUser.favoriteElementIds) {
        let normalizedImprobibId = legacyFavoriteElementId;
        if (!legacyFavoriteElementId.includes('-')) {
          const result = await prisma.element.findUnique({
            where: { improbibIdentifier: legacyFavoriteElementId },
          });
          if (!result) {
            console.warn(
              `Favorite element (improbib id) not found ${legacyFavoriteElementId}`,
            );
            continue;
          }
          normalizedImprobibId = result.id;
        } else {
          if (
            !(await prisma.element.findUnique({
              where: { id: legacyFavoriteElementId },
            }))
          ) {
            console.warn(
              `Favorite element not found ${legacyFavoriteElementId}`,
            );
            continue;
          }
        }
        await prisma.userFavoriteElement.create({
          data: {
            element: {
              connect: {
                id: normalizedImprobibId,
              },
            },
            user: {
              connect: {
                googleSubscriptionId: googleUserId,
              },
            },
          },
        });
      }
    }
  }

  async function sanityCheck() {
    const numNonDeletedWorkshops = Object.values(legacyDb.workshopsOfUsers)
      .flatMap((w) => w)
      .filter((workshop) => !workshop.deleted).length;
    console.log('Legacy workshop num = ', numNonDeletedWorkshops);
    const nowWorkshopNum = await prisma.workshop.count();
    console.log('New workshop num = ', nowWorkshopNum);

    const errorElements = await prisma.element.count({
      where: { name: 'custom-section-created' },
    });
    console.log('custom error elements', errorElements);
    const improbibErrorElements = await prisma.element.count({
      where: { name: 'improbib-section-created' },
    });
    console.log('improbib error elements', improbibErrorElements);
  }
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
