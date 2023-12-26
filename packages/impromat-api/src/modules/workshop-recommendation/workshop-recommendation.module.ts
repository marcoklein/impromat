import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { WorkshopModule } from '../workshop/workshop.module';
import { WorkshopRecommendationController } from './workshop-recommendation.controller';
import { WorkshopRecommendationService } from './workshop-recommendation.service';

@Module({
  imports: [DatabaseModule, WorkshopModule, ElementModule],
  providers: [WorkshopRecommendationService, WorkshopRecommendationController],
  exports: [WorkshopRecommendationController],
})
export class WorkshopRecommendationModule {}
