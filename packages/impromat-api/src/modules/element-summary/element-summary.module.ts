import { Module } from '@nestjs/common';
import { ElementLLMService } from './element-llm.service';
import { ElementSummaryService } from './element-summary.service';
import { LLMService } from './llm.service';
import { ElementVariationsController } from './variations-controller';
import { ElementVariationsService } from './element-variations.service';

@Module({
  providers: [
    LLMService,
    ElementLLMService,
    ElementSummaryService,
    ElementVariationsService,
    ElementVariationsController,
  ],
  exports: [ElementSummaryService, ElementVariationsController],
})
export class ElementAIModule {}
