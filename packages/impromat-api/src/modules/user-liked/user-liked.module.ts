import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ElementModule } from '../element/element.module';
import { UserFavoriteElementController } from './user-favorite-element.controller';
import { UserFavoriteElementsController } from './user-favorite-elements.controller';
import { UserFavoriteElementsService } from './user-favorite-elements.service';
import { UserLikedWorkshopController } from './user-liked-workshop.controller';
import { UserLikedWorkshopsService } from './user-liked-workshops.service';

@Module({
  imports: [DatabaseModule, ElementModule],
  providers: [
    UserFavoriteElementsService,
    UserLikedWorkshopsService,
    UserLikedWorkshopController,
    UserFavoriteElementController,
    UserFavoriteElementsController,
  ],
  exports: [
    UserFavoriteElementController,
    UserFavoriteElementsController,
    UserLikedWorkshopController,
  ],
})
export class UserLikedModule {}
