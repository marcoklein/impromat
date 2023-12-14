import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from 'src/environment';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { ElementAIModule } from 'src/modules/element-summary/element-summary.module';
import { AdminController } from './controllers/admin.controller';
import { ElementSearchController } from './controllers/element-search.controller';
import { ElementSnapshotController } from './controllers/element-snapshot.controller';
import { ElementTagsController } from './controllers/element-tags.controller';
import { ElementController } from './controllers/element.controller';
import { UserFavoriteElementController } from './controllers/user-favorite-element.controller';
import { UserFavoriteElementsController } from './controllers/user-favorite-elements.controller';
import { UserLikedWorkshopController } from './controllers/user-liked-workshop.controller';
import { UserController } from './controllers/user.controller';
import { WorkshopElementController } from './controllers/workshop-element.controller';
import { WorkshopSectionController } from './controllers/workshop-section.controller';
import { WorkshopController } from './controllers/workshop.controller';
import { AdminService } from './services/admin.service';
import { ElementAIService } from './services/element-ai.service';
import { ElementRecommendationService } from './services/element-recommendation.service';
import { ElementSearchService } from './services/element-search.service';
import { ElementSnapshotService } from './services/element-snapshot.service';
import { ElementTagService } from './services/element-tag.service';
import { ElementService } from './services/element.service';
import { UserFavoriteElementsService } from './services/user-favorite-elements.service';
import { UserLikedWorkshopsService } from './services/user-liked-workshops.service';
import { UserSessionService } from './services/user-session.service';
import { UserService } from './services/user.service';
import { WorkshopElementService } from './services/workshop-element.service';
import { WorkshopRecommendationService } from './services/workshop-recommendation.service';
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
    ElementAIModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    ElementAIService,
    UserFavoriteElementController,
    UserFavoriteElementsController,
    UserLikedWorkshopController,
    UserFavoriteElementsService,
    ElementSearchController,
    WorkshopController,
    WorkshopSectionController,
    WorkshopElementController,
    WorkshopElementService,
    ElementController,
    ElementSnapshotController,
    ElementRecommendationService,
    WorkshopRecommendationService,
    ElementService,
    ElementSnapshotService,
    UserController,
    UserService,
    UserSessionService,
    WorkshopService,
    ElementSearchService,
    UserLikedWorkshopsService,
    ElementTagsController,
    ElementTagService,
    AdminController,
    AdminService,
  ],
})
export class GraphqlModule {}
