import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LLMModule } from '../llm/llm.module';
import { ElementEmbeddingController } from './element-embedding.controller';
import { ElementEmbeddingService } from './element-embedding.service';

/**
 * Generates element embeddings.
 */
@Module({
  imports: [DatabaseModule, LLMModule],
  providers: [ElementEmbeddingController, ElementEmbeddingService],
  exports: [ElementEmbeddingController],
})
export class ElementEmbeddingModule {}
