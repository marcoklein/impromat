import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { WorkshopResolver } from './resolvers/workshop.resolvers';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema/schema.graphql',
      installSubscriptionHandlers: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        // origin: true
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [
    // { provide: APP_GUARD, useClass: AuthGuard },
    PrismaService,
    WorkshopResolver,
  ],
})
export class AppModule {}
