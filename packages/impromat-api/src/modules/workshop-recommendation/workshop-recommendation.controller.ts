import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { WorkshopRecommendationService } from './workshop-recommendation.service';

@Resolver(Workshop)
export class WorkshopRecommendationController {
  constructor(
    private workshopRecommendationService: WorkshopRecommendationService,
  ) {}
  @ResolveField(() => [Element], {
    description: 'Find recommended elements.',
  })
  async elementRecommendations(
    @Parent() workshop: Workshop,
    @SessionUserId() userId: string,
  ) {
    return await this.workshopRecommendationService.findElementRecommendations(
      userId,
      workshop.id,
    );
  }
}
