import { Module } from '@nestjs/common';
import { ElementSummaryService } from './element-summary.service';
import { LLMService } from './llm.service';

@Module({
  providers: [ElementSummaryService, LLMService],
  exports: [ElementSummaryService],
})
export class ElementSummaryModule {}
