import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ElementSearchTfidfService } from './element-search-tfidf.service';
import { ElementSearchController } from './element-search.controller';
import { ElementSearchService } from './element-search.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ElementSearchTfidfService,
    ElementSearchController,
    ElementSearchService,
  ],
  exports: [ElementSearchController],
})
export class ElementSearchModule {}
