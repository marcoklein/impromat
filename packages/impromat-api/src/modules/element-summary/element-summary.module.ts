import { Module } from '@nestjs/common';
import { ElementLLMService } from './element-llm.service';
import { ElementSummaryService } from './element-summary.service';
import { ElementVariationsService } from './element-variations.service';
import { LLMService } from './llm.service';
import { PromiseQueue } from './promise-queue';
import { ElementVariationsController } from './variations-controller';

@Module({
  providers: [
    LLMService,
    ElementLLMService,
    ElementSummaryService,
    ElementVariationsService,
    ElementVariationsController,
    PromiseQueue,
  ],
  exports: [ElementSummaryService, ElementVariationsController],
})
export class ElementAIModule {}
