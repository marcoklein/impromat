import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { WorkshopElementController } from './workshop-element.controller';
import { WorkshopElementService } from './workshop-element.service';
import { WorkshopSectionController } from './workshop-section.controller';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    WorkshopService,
    WorkshopElementService,
    WorkshopController,
    WorkshopElementController,
    WorkshopSectionController,
  ],
  exports: [
    WorkshopService,
    WorkshopElementService,
    WorkshopElementController,
    WorkshopSectionController,
    WorkshopController,
  ],
})
export class WorkshopModule {}
