import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from 'src/environment';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { ElementSearchController } from './controllers/element-search.controller';
import { ElementController } from './controllers/element.controller';
import { UserFavoriteElementController } from './controllers/user-favorite-element.controller';
import { UserFavoriteElementsController } from './controllers/user-favorite-elements.controller';
import { MeResolver } from './controllers/user.controller';
import { WorkshopElementController } from './controllers/workshop-element.controller';
import { WorkshopSectionController } from './controllers/workshop-section.controller';
import { WorkshopController } from './controllers/workshop.controller';
import { ElementSearchService } from './services/element-search.service';
import { ElementService } from './services/element.service';
import { UserFavoriteElementsService } from './services/user-favorite-elements.service';
import { UserSessionService } from './services/user-session.service';
import { WorkshopElementService } from './services/workshop-element.service';
import { WorkshopService } from './services/workshop.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req, res }) => ({ req, res }),
      driver: ApolloDriver,
      autoSchemaFile: environment.GRAPHQL_SCHEMA_GENERATION_PATH,
      installSubscriptionHandlers: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
    }),
  ],
  controllers: [],
  providers: [
    PrismaService,
    UserFavoriteElementController,
    UserFavoriteElementsController,
    UserFavoriteElementsService,
    ElementSearchController,
    WorkshopController,
    WorkshopSectionController,
    WorkshopElementController,
    WorkshopElementService,
    ElementController,
    ElementService,
    MeResolver,
    UserSessionService,
    WorkshopService,
    ElementSearchService,
  ],
})
export class GraphqlModule {}
