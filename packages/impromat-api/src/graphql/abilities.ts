import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import {
  Element,
  ElementTag,
  ElementVisibility,
  User,
  UserFavoriteElement,
  UserLikedWorkshop,
  Workshop,
  WorkshopElement,
  WorkshopSection,
} from '@prisma/client';

export const ABILITY_ACTION_READ = 'read';
export const ABILITY_ACTION_LIST = 'list';
export const ABILITY_ACTION_WRITE = 'write';

type AppAbility = PureAbility<
  [
    (
      | typeof ABILITY_ACTION_READ
      | typeof ABILITY_ACTION_WRITE
      | typeof ABILITY_ACTION_LIST
    ),
    Subjects<{
      User: User;
      Element: Element;
      ElementTag: ElementTag;
      UserFavoriteElement: UserFavoriteElement;
      UserLikedWorkshop: UserLikedWorkshop;
      Workshop: Workshop;
      WorkshopSection: WorkshopSection;
      WorkshopElement: WorkshopElement;
    }>,
  ],
  PrismaQuery
>;

export const defineAbilityForUser = (userId: string) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  can(ABILITY_ACTION_READ, 'Element', { ownerId: userId });
  can(ABILITY_ACTION_LIST, 'Element', { ownerId: userId });
  can(ABILITY_ACTION_WRITE, 'Element', { ownerId: userId });

  can(ABILITY_ACTION_READ, 'Element', { visibility: ElementVisibility.PUBLIC });
  can(ABILITY_ACTION_LIST, 'Element', { visibility: ElementVisibility.PUBLIC });
  can(ABILITY_ACTION_WRITE, 'Element', {
    visibility: ElementVisibility.PUBLIC,
  });

  return build();
};
