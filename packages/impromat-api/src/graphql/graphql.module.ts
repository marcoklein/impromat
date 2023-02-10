import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { MeResolver } from './me.resolver';
import { UserSessionService } from './services/user-session.service';
import { WorkshopMutations } from './workshop.mutations';
import { WorkshopResolver } from './workshop.resolvers';

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
    WorkshopResolver,
    MeResolver,
    UserSessionService,
    WorkshopMutations,
  ],
})
export class GraphqlModule {}
