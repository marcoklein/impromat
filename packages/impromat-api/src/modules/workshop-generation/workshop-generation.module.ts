import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LLMModule } from '../llm/llm.module';
import { WorkshopModule } from '../workshop/workshop.module';
import { WorkshopGenerationController } from './workshop-generation.controller';
import { WorkshopGenerationService } from './workshop-generation.service';

/**
 * Generates new workshops.
 */
@Module({
  imports: [DatabaseModule, WorkshopModule, LLMModule],
  providers: [WorkshopGenerationService, WorkshopGenerationController],
  exports: [WorkshopGenerationController],
})
export class WorkshopGenerationModule {}
