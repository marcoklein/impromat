import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ElementRecommendationService } from './element-recommendation.service';
import { ElementSnapshotController } from './element-snapshot.controller';
import { ElementSnapshotService } from './element-snapshot.service';
import { ElementTagService } from './element-tag.service';
import { ElementTagsController } from './element-tags.controller';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ElementService,
    ElementRecommendationService,
    ElementTagService,
    ElementSnapshotService,

    ElementSnapshotController,
    ElementTagsController,
    ElementController,
  ],
  exports: [
    ElementService,
    ElementRecommendationService,

    ElementSnapshotController,
    ElementTagsController,
    ElementController,
  ],
})
export class ElementModule {}
