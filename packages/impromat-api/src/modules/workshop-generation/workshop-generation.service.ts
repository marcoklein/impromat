import { accessibleBy } from '@casl/prisma';
import { Inject } from '@nestjs/common';
import { Element, Prisma } from '@prisma/client';
import { Workshop, WorkshopOmittedFields } from 'src/dtos/types/workshop.dto';
import {
  ABILITY_ACTION_READ,
  ABILITY_ACTION_WRITE,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { PrismaService } from '../database/prisma.service';
import { LLMService } from '../llm/llm.service';

export class WorkshopGenerationService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private llmService: LLMService,
  ) {}

  async generateWorkshop(
    userSessionId: string | undefined,
  ): Promise<Omit<Workshop, WorkshopOmittedFields> | undefined> {
    if (!userSessionId) {
      return undefined;
    }
    const ability = defineAbilityForUser(userSessionId);
    if (!ability.can(ABILITY_ACTION_WRITE, 'Workshop')) {
      return undefined;
    }

    const countWarmup = 2;
    const countExercise = 3;
    const countGame = 3;

    // const searchTerms = ['character'];
    const searchTerms = ['Yes', 'And'];

    const warmupTags = ['warmup', 'Aufwärmspiel'];
    const exerciseTags = ['exercise', 'Übung'];
    const gameTags = ['game', 'Spiel'];

    let warmupElements: Element[] = [];
    let exerciseElements: Element[] = [];
    let gameElements: Element[] = [];

    const result = await this.generateWorkshopElements(
      userSessionId,
      searchTerms,
      countWarmup,
      countExercise,
      countGame,
      warmupTags,
      exerciseTags,
      gameTags,
    );

    warmupElements = result.warmupElements;
    exerciseElements = result.exerciseElements;
    gameElements = result.gameElements;

    const workshopGoal = await this.llmService.run({
      languageCode: 'en',
      systemPromptEn: `Write what this improvisational theatre workshop is about in one sentence based on the given inspirations:`,
      systemPromptDe: '',
      text: searchTerms.join('. ') ?? '',
      noMarkdownPreprocessing: true,
    });

    const warmupNotes = await Promise.all(
      warmupElements.map((element) =>
        this.llmService.run({
          languageCode: 'en',
          // systemPromptEn: `Write in one sentence what this exercise is about and why it is suitable for this workshop about "${workshopGoal}":`,
          systemPromptEn: `Write a one sentence note what this exercise is about and why it is suitable for this workshop about "${workshopGoal}":`,
          systemPromptDe: '',
          text: element.markdown ?? '',
          noMarkdownPreprocessing: true,
        }),
      ),
    );
    const exerciseNotes = await Promise.all(
      exerciseElements.map((element) =>
        this.llmService.run({
          languageCode: 'en',
          systemPromptEn: `Write in one sentence what this exercise is about and why it is suitable for this workshop about "${workshopGoal}":`,
          systemPromptDe: '',
          text: element.markdown ?? '',
          noMarkdownPreprocessing: true,
        }),
      ),
    );
    const gameNotes = await Promise.all(
      gameElements.map((element) =>
        this.llmService.run({
          languageCode: 'en',
          systemPromptEn: `Write in one sentence what this exercise is about and why it is suitable for this workshop about "${workshopGoal}":`,
          systemPromptDe: '',
          text: element.markdown ?? '',
          noMarkdownPreprocessing: true,
        }),
      ),
    );

    const imagePrompt = await this.llmService.run({
      languageCode: 'en',
      systemPromptEn: `Based on the following descriptions, write a prompt for an image generator in one sentence that creates a minimalistic preview image for the workshop.`,
      systemPromptDe: '',
      text:
        [...warmupNotes, ...exerciseNotes, ...gameNotes].join('\n---\n') ?? '',
      noMarkdownPreprocessing: true,
    });

    console.log('Possible image prompt:');
    console.log(imagePrompt);

    const nameForWorkshop = await this.llmService.run({
      languageCode: 'en',
      systemPromptEn: `Based on the following descriptions, write a title for the workshop in five words:`,
      systemPromptDe: '',
      text:
        [...warmupNotes, ...exerciseNotes, ...gameNotes].join('\n---\n') ?? '',
      noMarkdownPreprocessing: true,
    });

    const workshop = await this.prismaService.workshop.create({
      data: {
        name: nameForWorkshop ?? 'Generated Workshop',
        ownerId: userSessionId,
        description: workshopGoal ?? '',
        sections: {
          create: [
            {
              name: 'Warmup',
              orderIndex: 0,
              elements: {
                create: warmupElements.map((element, index) => ({
                  note: warmupNotes.at(index),
                  basedOn: {
                    connect: {
                      id: element.id,
                    },
                  },
                })),
              },
            },
            {
              name: 'Exercise',
              orderIndex: 1,
              elements: {
                create: exerciseElements.map((element, index) => ({
                  note: exerciseNotes.at(index),
                  basedOn: {
                    connect: {
                      id: element.id,
                    },
                  },
                })),
              },
            },
            {
              name: 'Game',
              orderIndex: 2,
              elements: {
                create: gameElements.map((element, index) => ({
                  note: gameNotes.at(index),
                  basedOn: {
                    connect: {
                      id: element.id,
                    },
                  },
                })),
              },
            },
          ],
        },
      },
    });

    return workshop;
  }

  private async generateWorkshopElements(
    userSessionId: string,
    startingTags: string[],
    countWarmup: number,
    countExercise: number,
    countGame: number,
    warmupTags: string[],
    exerciseTags: string[],
    gameTags: string[],
  ) {
    return await this.generateElementsForSections(
      userSessionId,
      startingTags,
      countWarmup,
      countExercise,
      countGame,
      warmupTags,
      exerciseTags,
      gameTags,
    );
  }

  private async generateElementsForSections(
    userSessionId: string,
    searchTerms: string[],
    countWarmup: number,
    countExercise: number,
    countGame: number,
    warmupTags: string[],
    exerciseTags: string[],
    gameTags: string[],
  ) {
    const allElements: Element[] = [];
    const warmupElements: Element[] = [];
    const exerciseElements: Element[] = [];
    const gameElements: Element[] = [];

    await this.generateElements(
      userSessionId,
      countWarmup,
      searchTerms,
      warmupTags,
      allElements,
      warmupElements,
    );
    await this.generateElements(
      userSessionId,
      countExercise,
      searchTerms,
      exerciseTags,
      allElements,
      exerciseElements,
    );
    await this.generateElements(
      userSessionId,
      countGame,
      searchTerms,
      gameTags,
      allElements,
      gameElements,
    );

    return { warmupElements, exerciseElements, gameElements };
  }

  private async generateElements(
    userSessionId: string,
    count: number,
    searchTerms: string[],
    requiredTags: string[],
    allElements: Element[],
    elements: Element[],
  ) {
    for (let i = 0; i < count; ) {
      const element = await this.findNextElement(
        userSessionId,
        allElements.map((e) => e.id),
        searchTerms,
        requiredTags,
      );

      if (!element) {
        break;
      }

      elements.push(element);
      allElements.push(element);
      i++;
    }
  }

  private async findNextElement(
    userSessionId: string,
    existingElementIds: string[],
    searchTerms: string[],
    requiredTags: string[],
  ): Promise<Element | undefined> {
    const ability = defineAbilityForUser(userSessionId);

    const OR_SEPARATOR = '|'; // TODO make this configurable?
    const searchTerm = (searchTerms.join(' ').trim() ?? '')
      .replaceAll(
        // replace all spaces with a single space
        / +/g,
        ' ',
      )
      .replaceAll(' ', OR_SEPARATOR);
    const elementWhereQuery: Prisma.ElementWhereInput = {
      AND: [
        accessibleBy(ability, ABILITY_ACTION_READ).Element,
        {
          id: {
            notIn: [...existingElementIds],
          },
        },
        {
          OR: [
            {
              name: {
                search: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              tags: {
                some: {
                  tag: {
                    name: {
                      search: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            },
          ],
        },
        {
          tags: {
            some: {
              tag: {
                name: {
                  in: requiredTags,
                },
              },
            },
          },
        },
      ],
    };

    const recommendationsCount = await this.prismaService.element.count({
      where: elementWhereQuery,
    });

    if (recommendationsCount === 0) {
      return undefined;
    }

    const recommendedElement = await this.prismaService.element.findFirst({
      where: elementWhereQuery,
      skip: Math.floor(Math.random() * recommendationsCount),
    });

    return recommendedElement ?? undefined;
  }
}
