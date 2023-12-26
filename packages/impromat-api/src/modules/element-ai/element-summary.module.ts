import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { ElementAiController } from './element-ai-controller';
import { ElementKeywordsService } from './element-keywords.service';
import { ElementLLMService } from './element-llm.service';
import { ElementSummaryService } from './element-summary.service';
import { ElementVariationsService } from './element-variations.service';
import { LLMService } from './llm.service';
import { PromiseQueue } from './promise-queue';

@Module({
  imports: [DatabaseModule, ElementModule],
  providers: [
    LLMService,
    ElementLLMService,
    ElementSummaryService,
    ElementVariationsService,
    ElementAiController,
    ElementKeywordsService,
    PromiseQueue,
  ],
  exports: [ElementSummaryService, ElementAiController],
})
export class ElementAIModule {}
