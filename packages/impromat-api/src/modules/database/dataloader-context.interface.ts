import {
  User,
  UserLikedWorkshop,
  Workshop,
  WorkshopElement,
  WorkshopSection,
} from '@prisma/client';
import DataLoader from 'dataloader';
import { AppAbility } from 'src/graphql/abilities';
import { DataLoaderStatsBuilder } from './dataloader-stats';

export const DATALOADER_CONTEXT = 'loaders';

export interface DataLoaderContext {
  currentUser: User | undefined;
  userAbility: AppAbility;
  stats: DataLoaderStatsBuilder;
  users: DataLoader<string, User | null | undefined, string>;
  workshops: DataLoader<string, Workshop | null | undefined, string>;
  userLikedWorkshops: DataLoader<
    string,
    UserLikedWorkshop[] | null | undefined,
    string
  >;
  workshopSections: DataLoader<
    string,
    WorkshopSection[] | null | undefined,
    string
  >;
  workshopElements: DataLoader<
    string,
    WorkshopElement[] | null | undefined,
    string
  >;
  elements: DataLoader<string, WorkshopElement[] | null | undefined, string>;
  userLikedElements: DataLoader<
    string,
    WorkshopElement[] | null | undefined,
    string
  >;
}
