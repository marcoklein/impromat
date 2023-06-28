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

export const REASON_OWNER = 'You own the element.';
export const REASON_PUBLIC = 'The element is public.';
export const REASON_PART_OF_PUBLIC_WORKSHOP =
  'You can read elements of published workshops.';

export type AppAbility = PureAbility<
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

/**
 * Creates CASL abilities based on the given user id.
 *
 * @param userId If undefined abilities are created for an anonymous user.
 * @returns Abilities for given userId.
 */
export const defineAbilityForUser = (userId: string | undefined) => {
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);
  if (userId) {
    can(ABILITY_ACTION_READ, 'Element', { ownerId: userId }).because(
      REASON_OWNER,
    );
    can(ABILITY_ACTION_LIST, 'Element', { ownerId: userId }).because(
      REASON_OWNER,
    );
    can(ABILITY_ACTION_WRITE, 'Element', { ownerId: userId }).because(
      REASON_OWNER,
    );

    can(ABILITY_ACTION_READ, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLIC);
    can(ABILITY_ACTION_LIST, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLIC);
    can(ABILITY_ACTION_WRITE, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLIC);

    can(ABILITY_ACTION_READ, 'Element', {
      workshopElements: {
        some: { workshopSection: { workshop: { isPublic: true } } },
      },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);
  } else {
    can(ABILITY_ACTION_READ, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLIC);
    can(ABILITY_ACTION_LIST, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLIC);
    can(ABILITY_ACTION_READ, 'Element', {
      workshopElements: {
        some: { workshopSection: { workshop: { isPublic: true } } },
      },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);
  }
  return build();
};
