import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Element, ElementSnapshot } from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSnapshotService } from './element-snapshot.service';

@Resolver(ElementSnapshot)
export class ElementSnapshotController {
  constructor(private elementSnapshotService: ElementSnapshotService) {}

  @ResolveField(() => User)
  async user(
    @Parent() elementSnapshot: ElementSnapshot,
    @SessionUserId() userId: string | undefined,
  ) {
    return this.elementSnapshotService.findElementSnapshotUser(
      elementSnapshot,
      userId,
    );
  }

  @ResolveField(() => Element)
  async element(
    @Parent() elementSnapshot: ElementSnapshot,
    @SessionUserId() userId: string,
  ) {
    return this.elementSnapshotService.findElementSnapshotById(
      userId,
      elementSnapshot.id,
    );
  }

  @ResolveField(() => Element)
  async parent(
    @Parent() elementSnapshot: ElementSnapshot,
    @SessionUserId() userId: string,
  ) {
    return this.elementSnapshotService.findElementSnapshotParent(
      elementSnapshot,
      userId,
    );
  }
}
