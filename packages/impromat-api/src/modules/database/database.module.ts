import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Provides raw access to the underlying database.
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
