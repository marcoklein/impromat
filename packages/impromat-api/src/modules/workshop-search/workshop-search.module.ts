import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WorkshopSearchController } from './workshop-search.controller';
import { WorkshopSearchService } from './workshop-search.service';

@Module({
  imports: [DatabaseModule],
  providers: [WorkshopSearchController, WorkshopSearchService],
  exports: [WorkshopSearchController],
})
export class WorkshopSearchModule {}
