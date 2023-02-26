import { Injectable, OnModuleInit } from '@nestjs/common';
import PrismaClient from '@prisma/client';
import { Improbib } from 'improbib';
import fs from 'node:fs/promises';
import { PrismaService } from 'src/graphql/services/prisma.service';

@Injectable()
export class ImprobibService implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}

  async onModuleInit() {
    console.log('initialized');

    const improbibJson = await fs.readFile('assets/improbib.json');
    const improbib = JSON.parse(improbibJson.toString('utf8')) as Improbib;
    await this.prismaService.element.deleteMany({
      where: {
        improbibIdentifier: { not: null },
      },
    });

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
    } of improbib.elements) {
      const element: PrismaClient.Prisma.ElementCreateInput = {
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

      await this.prismaService.element.upsert({
        create: {
          ...element,
        },
        update: {
          ...element,
        },
        where: { improbibIdentifier: identifier },
      });
    }
    console.log('added improbib entries');
  }
}
