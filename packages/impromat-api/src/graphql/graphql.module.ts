import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { environment } from 'src/environment';
import { AdminModule } from 'src/modules/admin/admin.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ElementAIModule } from 'src/modules/element-ai/element-summary.module';
import { ElementSearchModule } from 'src/modules/element-search/element-search.module';
import { ElementModule } from 'src/modules/element/element.module';
import { UserLikedModule } from 'src/modules/user-liked/user-liked.module';
import { UserModule } from 'src/modules/user/user.module';
import { WorkshopRecommendationModule } from 'src/modules/workshop-recommendation/workshop-recommendation.module';
import { WorkshopModule } from 'src/modules/workshop/workshop.module';
import { UserSessionService } from './services/user-session.service';

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
    AdminModule,
    DatabaseModule,
    ElementModule,
    ElementSearchModule,
    ElementAIModule,
    UserModule,
    UserLikedModule,
    WorkshopModule,
    WorkshopRecommendationModule,
  ],
  controllers: [],
  providers: [UserSessionService],
})
export class GraphqlModule {}
