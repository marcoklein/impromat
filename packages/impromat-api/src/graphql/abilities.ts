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

type AppAbility = PureAbility<
  [
    'read' | 'write' | 'list',
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

export const defineAbilityFor = (userId: string) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  can('read', 'Element', { ownerId: userId });
  can('list', 'Element', { ownerId: userId });
  can('write', 'Element', { ownerId: userId });

  can('read', 'Element', { visibility: ElementVisibility.PUBLIC });
  can('list', 'Element', { visibility: ElementVisibility.PUBLIC });

  return build();
};
