import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { ElementController } from './controllers/element.controller';
import { MeResolver } from './controllers/me.controller';
import { WorkshopElementController } from './controllers/workshop-element.controller';
import { WorkshopSectionController } from './controllers/workshop-section.controller';
import { WorkshopController } from './controllers/workshop.controller';
import { ElementService } from './services/element.service';
import { UserSessionService } from './services/user-session.service';
import { WorkshopElementService } from './services/workshop-element.service';
import { WorkshopService } from './services/workshop.service';

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
    WorkshopSectionController,
    WorkshopElementController,
    WorkshopElementService,
    ElementController,
    ElementService,
    MeResolver,
    UserSessionService,
    WorkshopService,
  ],
})
export class GraphqlModule {}
