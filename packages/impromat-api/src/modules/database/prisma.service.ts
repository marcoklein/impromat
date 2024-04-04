import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<{
    log: [
      {
        emit: 'event';
        level: 'query';
      },
      {
        emit: 'event';
        level: 'error';
      },
      {
        emit: 'event';
        level: 'info';
      },
      {
        emit: 'event';
        level: 'warn';
      },
    ];
  }>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    this.$on('query', (e) => {
      this.logger.debug('Query: ' + e.query);
      this.logger.debug('Params: ' + e.params);
      this.logger.debug('Duration: ' + e.duration + 'ms');
    });
    this.$on('error', (e) => {
      this.logger.error('Error: ' + e.message);
    });
    this.$on('info', (e) => {
      this.logger.log('Info: ' + e.message);
    });
    this.$on('warn', (e) => {
      this.logger.warn('Warn: ' + e.message);
    });

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
