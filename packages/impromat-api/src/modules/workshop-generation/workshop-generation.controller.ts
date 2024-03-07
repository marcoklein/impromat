import { Mutation } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { WorkshopGenerationService } from './workshop-generation.service';
import { Inject } from '@nestjs/common';

export class WorkshopGenerationController {
  constructor(
    @Inject(WorkshopGenerationService)
    private workshopGenerationService: WorkshopGenerationService,
  ) {}

  @Mutation(() => Workshop, {
    description:
      'Generates and creates a new workshop for the currently logged in user.',
  })
  async generateWorkshop(@SessionUserId() userId: string) {
    return await this.workshopGenerationService.generateWorkshop(userId);
  }
}
