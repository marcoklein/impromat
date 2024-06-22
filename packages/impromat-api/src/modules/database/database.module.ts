import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { PrismaService } from './prisma.service';

/**
 * Provides raw access to the underlying database.
 */
@Module({
  providers: [PrismaService, DataloaderService],
  exports: [PrismaService, DataloaderService],
})
export class DatabaseModule {}
