import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ABILITY_ACTION_LIST,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { ElementService } from 'src/modules/element/element.service';
import { PrismaService } from 'src/modules/database/prisma.service';
import { ElementLLMService } from './element-llm.service';

export interface ElementSummaryInput {
  elementId: string;
  name: string;
  markdown: string;
  languageCode: string;
}

/**
 * Create summaries of elements.
 */
@Injectable()
export class ElementSummaryService {
  private readonly logger = new Logger(ElementSummaryService.name);
  private readonly MIN_SUMMARY_LENGTH = 300;

  constructor(
    @Inject(ElementLLMService) private llmService: ElementLLMService,
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(ElementService) private elementService: ElementService,
  ) {}

  async generateElementSummaries(userSessionId: string | undefined) {
    const ability = defineAbilityForUser(userSessionId);
    const elementsWithoutSummary = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          {
            snapshotParentId: null,
          },
          {
            summary: null,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        markdown: true,
        languageCode: true,
      },
    });
    this.logger.log(
      `Found ${elementsWithoutSummary.length} elements without summary.`,
    );
    for (const element of elementsWithoutSummary) {
      this.logger.debug(
        `Creating summary for element ${element.id} (${element.name}))`,
      );
      await this.getElementSummary(userSessionId, element.id);
    }
    return elementsWithoutSummary.length;
  }

  async getElementSummary(
    userSessionId: string | undefined,
    elementId: string,
    forceRefresh = false,
  ) {
    const dbElement = await this.elementService.findElementById(
      userSessionId,
      elementId,
    );
    if (dbElement.summary && !forceRefresh) {
      return dbElement.summary;
    }
    if (!dbElement.markdown) {
      return '';
    }

    // TODO return immediately and dispatch summary creation in background
    void this.createSummary({
      elementId: dbElement.id,
      name: dbElement.name,
      markdown: dbElement.markdown ?? '',
      languageCode: dbElement.languageCode ?? 'en',
    }).then((summary) => {
      this.logger.debug(`Updating summary for element ${dbElement.id}`);
      return this.prismaService.element.update({
        where: { id: dbElement.id },
        data: {
          summary,
        },
      });
    });

    return undefined;
  }

  async createSummary({
    elementId,
    markdown,
    name,
    languageCode,
  }: ElementSummaryInput): Promise<string | undefined> {
    if (markdown.length < this.MIN_SUMMARY_LENGTH) {
      this.logger.debug(
        `Element ${name} has less than 300 characters. Using existing markdown as summary.`,
      );
      return markdown;
    }
    const maxWords = 20;
    const systemPromptEn = `Your task is to create a VERY SHORT summary of the presented text. Keep it to a maximum of ${maxWords} words!`;
    const systemPromptDe =
      'Deine Aufgabe ist es den folgenden Text in zwei Sätzen zusammenzufassen';

    this.logger.debug(`Creating summary for element ${name} (${elementId})`);
    const result = await this.llmService.run({
      systemPromptEn,
      systemPromptDe,
      languageCode,
      text: markdown,
      temperature: languageCode === 'de' ? 0.1 : undefined,
    });

    if (!result) {
      this.logger.warn(`Could not create summary for element ${name}`);
      return undefined;
    }

    this.logger.debug(`Created summary for element ${name}`);
    return result;
  }
}
