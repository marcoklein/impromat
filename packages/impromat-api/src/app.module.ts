import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, GraphqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
