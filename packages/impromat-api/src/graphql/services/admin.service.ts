import { ForbiddenException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { defineAbilityForUser } from '../abilities';
import { ElementService } from './element.service';

@Injectable()
export class AdminService {
  constructor(private elementService: ElementService) {}

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

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async createAllSummaries(userRequestId: string | undefined) {
    const ability = defineAbilityForUser(userRequestId);
    if (!ability.can('write', 'Element')) {
      throw new ForbiddenException();
    }
    return await this.elementService.generateElementSummaries(userRequestId);
  }
}
