import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { MeResolver } from './controllers/me.controller';
import { WorkshopController } from './controllers/workshop.controller';
import { WorkshopService } from './controllers/workshop.service';
import { UserSessionService } from './services/user-session.service';

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
  ],
  controllers: [],
  providers: [
    PrismaService,
    WorkshopController,
    MeResolver,
    UserSessionService,
    WorkshopService,
  ],
})
export class GraphqlModule {}
