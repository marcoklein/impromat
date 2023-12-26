import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementAIModule } from '../element-ai/element-summary.module';
import { ElementModule } from '../element/element.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DatabaseModule, ElementModule, ElementAIModule],
  providers: [AdminService, AdminController],
  exports: [AdminController],
})
export class AdminModule {}
