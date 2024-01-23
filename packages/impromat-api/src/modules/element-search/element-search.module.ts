import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ElementSearchV2Service } from './element-search-v2.service';
import { ElementSearchController } from './element-search.controller';
import { ElementSearchService } from './element-search.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ElementSearchService,
    ElementSearchV2Service,
    ElementSearchController,
  ],
  exports: [ElementSearchController],
})
export class ElementSearchModule {}
