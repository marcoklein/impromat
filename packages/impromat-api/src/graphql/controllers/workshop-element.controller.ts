import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { WorkshopElementService } from '../services/workshop-element.service';

@Resolver(WorkshopElement)
@UseGuards(GraphqlAuthGuard)
export class WorkshopElementController {
  constructor(private workshopElementService: WorkshopElementService) {}

  @ResolveField(() => [WorkshopElement])
  async section(
    @Parent() element: WorkshopElement,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopElementService
      .findWorkshopElementById(userSessionId, element.id)
      .workshopSection();
  }

  @ResolveField(() => [WorkshopElement])
  async basedOn(
    @Parent() element: WorkshopElement,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopElementService
      .findWorkshopElementById(userSessionId, element.id)
      .basedOn();
  }
}
