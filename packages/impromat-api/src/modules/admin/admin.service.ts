import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ElementSummaryService } from 'src/modules/element-ai/element-summary.service';
import { defineAbilityForUser } from '../../graphql/abilities';
import { ElementService } from '../element/element.service';

@Injectable()
export class AdminService {
  private logger = new Logger(AdminService.name);
  constructor(
    private elementService: ElementService,
    private elementSummaryService: ElementSummaryService,
  ) {}

  async applyAllTagMappings(userRequestId: string | undefined) {
    const ability = defineAbilityForUser(userRequestId);
    if (
      !ability.can('write', 'Element') &&
      !ability.can('write', 'ElementTag')
    ) {
      throw new ForbiddenException();
    }

    const batchSize = 100;
    const MAX_ELEMENTS_COUNT = 1000000;
    for (let skip = 0; skip < MAX_ELEMENTS_COUNT; skip += batchSize) {
      const elementsBatch = await this.elementService.findElements(
        userRequestId,
        {
          filter: {},
          orderBy: { notImplemented: true },
          take: batchSize,
          skip,
        },
      );
      for (const element of elementsBatch) {
        await this.elementService.updateElement(userRequestId, {
          id: element.id,
          tags: {
            set: element.tags.map((tag) => ({
              name: tag.tag.name,
            })),
          },
        });
      }
      console.log(
        `Applied tag mappings for ${skip + elementsBatch.length} elements`,
      );
      if (elementsBatch.length < batchSize) {
        return skip + elementsBatch.length;
      }
    }
    return MAX_ELEMENTS_COUNT;
  }

  async createAllSummaries(userRequestId: string | undefined) {
    const ability = defineAbilityForUser(userRequestId);
    if (!ability.can('write', 'Element')) {
      throw new ForbiddenException();
    }
    return await this.elementSummaryService.generateElementSummaries(
      userRequestId,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  protected async createAllSummariesCron() {
    // TODO only run on production environment!
    // Currently, the development enviroment is also running this cron job and blocks the ollama instance
    this.logger.log('Creating summaries triggered by cron job');
    await this.elementSummaryService.generateElementSummaries(undefined);
  }
}
