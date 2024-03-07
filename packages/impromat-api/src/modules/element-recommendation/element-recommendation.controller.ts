import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Element } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementRecommendationService } from './element-recommendation.service';

@Resolver(Element)
export class ElementRecommendationController {
  constructor(
    private elementRecommendationService: ElementRecommendationService,
  ) {}

  @ResolveField(() => [Element])
  async recommendations(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.elementRecommendationService.findRecommendations(
      userSessionId,
      element.id,
    );
  }
}
