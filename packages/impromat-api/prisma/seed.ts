/* eslint-disable @typescript-eslint/no-floating-promises */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Improbib } from 'improbib';
import * as fs from 'node:fs/promises';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const improbibPopulationIdentifiers =
  process.env.IMPROBIB_POPULATION_IDENTIFIERS?.split(',');
if (improbibPopulationIdentifiers) {
  console.log(
    'Seeding only improbib elements with identifiers: ',
    improbibPopulationIdentifiers.join(', '),
  );
}

const prisma = new PrismaClient();

async function main() {
  const improbibJson = await fs.readFile('assets/improbib.json');
  const improbib = JSON.parse(improbibJson.toString('utf8')) as Improbib;
  const improbibElements = improbib.elements.filter(
    (element) =>
      improbibPopulationIdentifiers?.includes(element.identifier) ?? true,
  );
  console.log(`Seeding ${improbibElements.length} elements.`);
  const startTime = Date.now();

  const tagSet = new Set(improbibElements.flatMap((element) => element.tags));
  const tagList = [...tagSet];
  await prisma.elementTag.createMany({
    skipDuplicates: true,
    data: tagList.map((tagName) => ({ name: tagName })),
  });

  const elementTagList: Array<{
    improbibIdentifier: string;
    tags: string[];
  }> = [];
  for (const {
    baseUrl,
    identifier,
    languageCode,
    licenseName,
    licenseUrl,
    markdown,
    name,
    sourceName,
    sourceUrl,
    tags,
  } of improbibElements) {
    elementTagList.push({ improbibIdentifier: identifier, tags });
    await prisma.element.create({
      data: {
        visibility: 'PUBLIC',
        version: -1,
        improbibIdentifier: identifier,
        languageCode: languageCode,
        licenseName: licenseName,
        licenseUrl,
        markdown,
        name,
        sourceBaseUrl: baseUrl,
        sourceName,
        sourceUrl,
      },
    });
  }

  await prisma.$transaction(
    elementTagList.flatMap((item) =>
      item.tags.map((tagName) =>
        prisma.elementToElementTag.create({
          data: {
            element: {
              connect: {
                improbibIdentifier: item.improbibIdentifier,
              },
            },
            tag: {
              connect: { name: tagName },
            },
          },
        }),
      ),
    ),
  );

  console.log(`added improbib entries in ${Date.now() - startTime} ms`);
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
