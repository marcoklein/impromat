import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ElementRecommendationService } from './element-recommendation.service';
import { ElementSearchController } from './element-search.controller';
import { ElementSearchService } from './element-search.service';
import { ElementSnapshotController } from './element-snapshot.controller';
import { ElementSnapshotService } from './element-snapshot.service';
import { ElementTagService } from './element-tag.service';
import { ElementTagsController } from './element-tags.controller';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ElementService,
    ElementRecommendationService,
    ElementSearchService,
    ElementTagService,
    ElementSnapshotService,

    ElementSearchController,
    ElementSnapshotController,
    ElementTagsController,
    ElementController,
  ],
  exports: [
    ElementService,
    ElementRecommendationService,

    ElementSearchController,
    ElementSnapshotController,
    ElementTagsController,
    ElementController,
  ],
})
export class ElementModule {}
