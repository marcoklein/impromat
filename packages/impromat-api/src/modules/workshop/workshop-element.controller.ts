import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  WorkshopElement,
  WorkshopElementRelations,
} from 'src/dtos/types/workshop-element.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { WorkshopElementService } from './workshop-element.service';

@Resolver(WorkshopElement)
export class WorkshopElementController {
  constructor(private workshopElementService: WorkshopElementService) {}

  @ResolveField(() => WorkshopSection)
  async section(
    @Parent() element: WorkshopElement,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopElementService.findWorkshopSection(
      element,
      userSessionId,
    );
  }

  @ResolveField(() => WorkshopElement)
  async basedOn(
    @Parent() element: WorkshopElement,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopElementService.findBasedOn(element, userSessionId);
  }

  @Query(() => WorkshopElement)
  async workshopElement(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<WorkshopElement, WorkshopElementRelations> | null> {
    return this.workshopElementService.findWorkshopElementById(userId, id);
  }
}
