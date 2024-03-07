import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { LLMRequestQueueService } from './llm-request-queue.service';
import { LLMService } from './llm.service';
import { PromiseQueue } from './promise-queue';

@Module({
  imports: [DatabaseModule, ElementModule],
  providers: [LLMService, LLMRequestQueueService, PromiseQueue],
  exports: [LLMService],
})
export class LLMModule {}
