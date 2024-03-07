import { accessibleBy } from '@casl/prisma';
import { Inject, Logger } from '@nestjs/common';
import {
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { PrismaService } from '../database/prisma.service';
import { LLMService } from '../llm/llm.service';

export class ElementEmbeddingService {
  readonly logger = new Logger(ElementEmbeddingService.name);

  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private llmService: LLMService,
  ) {}

  async getElementEmbedding(
    userSessionId: string | undefined,
    elementId: string,
  ) {
    const ability = defineAbilityForUser(userSessionId);
    const element = await this.prismaService.element.findFirst({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_READ).Element,
          {
            id: elementId,
          },
        ],
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found.`);
    }

    this.logger.debug(
      `Retrieving embedding for element with id ${element.id}.`,
    );
    // Example: https://github.com/vercel/examples/blob/main/storage/postgres-pgvector/app/actions.tsx
    const existingEmbedding = await this.prismaService.$queryRaw<
      { embedding: string }[]
    >`
      SELECT CAST(embedding AS TEXT) FROM "Element" WHERE id = ${element.id}
    `;
    const rawEmbedding = existingEmbedding.at(0)?.embedding;
    if (rawEmbedding) {
      const embedding: number[] = JSON.parse(rawEmbedding);
      this.logger.debug(
        `Found existing embedding for element with id ${element.id}.`,
      );
      return embedding;
    }
    this.logger.debug(
      `No existing embedding found for element with id ${element.id}.`,
    );
    if (!element.markdown) {
      return undefined;
    }
    const embedding = await this.llmService.generateEmbeddings(
      element.markdown,
      { cleanMarkdown: true },
    );
    if (!embedding) {
      throw new Error('Failed to generate embedding.');
    }
    this.logger.debug(`Generated embedding for element with id ${element.id}.`);
    await this.prismaService.$executeRaw`
        UPDATE "Element"
        SET embedding = ${embedding}::vector
        WHERE id = ${element.id}
    `;
    this.logger.debug(
      `Saved embedding for element with id ${element.id} to database.`,
    );
    return embedding;
  }
}
