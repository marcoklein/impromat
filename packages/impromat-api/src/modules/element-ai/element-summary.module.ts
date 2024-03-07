import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { LLMModule } from '../llm/llm.module';
import { ElementAiController } from './element-ai-controller';
import { ElementKeywordsService } from './element-keywords.service';
import { ElementSummaryService } from './element-summary.service';
import { ElementVariationsService } from './element-variations.service';

@Module({
  imports: [DatabaseModule, ElementModule, LLMModule],
  providers: [
    ElementSummaryService,
    ElementVariationsService,
    ElementAiController,
    ElementKeywordsService,
  ],
  exports: [ElementSummaryService, ElementAiController],
})
export class ElementAIModule {}
