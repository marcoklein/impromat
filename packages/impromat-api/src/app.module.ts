import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { WorkshopSectionRepositoryService } from './repository/workshop-section-repository/workshop-section-repository.service';
import { RepositoryModule } from './repository/repository/repository.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    GraphqlModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          skipNullProperties: true,
          skipUndefinedProperties: true,
        }),
    },
    WorkshopSectionRepositoryService,
  ],
})
export class AppModule {}
