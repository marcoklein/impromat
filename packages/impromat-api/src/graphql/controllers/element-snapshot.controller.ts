import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Element, ElementSnapshot } from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSnapshotService } from '../services/element-snapshot.service';

@Resolver(ElementSnapshot)
export class ElementSnapshotController {
  constructor(private elementSnapshotService: ElementSnapshotService) {}

  @ResolveField(() => User)
  async user(
    @Parent() elementSnapshot: ElementSnapshot,
    @SessionUserId() userId: string,
  ) {
    return this.elementSnapshotService
      .findElementSnapshotById(userId, elementSnapshot.id)
      .snapshotUser();
  }

  @ResolveField(() => Element)
  async element(
    @Parent() elementSnapshot: ElementSnapshot,
    @SessionUserId() userId: string,
  ) {
    return this.elementSnapshotService
      .findElementSnapshotById(userId, elementSnapshot.id)
      .snapshotParent();
  }
}
