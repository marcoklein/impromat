import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementRecommendationModule } from '../element-recommendation/element-recommendation.module';
import { WorkshopModule } from '../workshop/workshop.module';
import { WorkshopRecommendationController } from './workshop-recommendation.controller';
import { WorkshopRecommendationService } from './workshop-recommendation.service';

/**
 * Recommends elements to already existing workshops.
 */
@Module({
  imports: [DatabaseModule, WorkshopModule, ElementRecommendationModule],
  providers: [WorkshopRecommendationService, WorkshopRecommendationController],
  exports: [WorkshopRecommendationController],
})
export class WorkshopRecommendationModule {}
