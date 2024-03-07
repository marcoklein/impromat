import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { WorkshopModule } from '../workshop/workshop.module';
import { ElementRecommendationController } from './element-recommendation.controller';
import { ElementRecommendationService } from './element-recommendation.service';

@Module({
  imports: [DatabaseModule, WorkshopModule, ElementModule],
  providers: [ElementRecommendationService, ElementRecommendationController],
  exports: [ElementRecommendationController, ElementRecommendationService],
})
export class ElementRecommendationModule {}
