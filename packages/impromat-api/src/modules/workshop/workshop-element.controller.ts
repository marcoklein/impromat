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
import { Element } from 'src/dtos/types/element.dto';

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

  @ResolveField(() => Element)
  async basedOn(
    @Parent() workshopElement: WorkshopElement,
    @SessionUserId() userSessionId: string,
  ) {
    if ('basedOn' in workshopElement) return workshopElement.basedOn;
    return this.workshopElementService.findBasedOn(
      workshopElement,
      userSessionId,
    );
  }

  @Query(() => WorkshopElement)
  async workshopElement(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<WorkshopElement, WorkshopElementRelations> | null> {
    return this.workshopElementService.findWorkshopElementById(userId, id);
  }
}
