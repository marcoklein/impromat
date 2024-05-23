import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import {
  Element,
  ElementTag,
  ElementToElementTag,
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
export const REASON_PUBLICLY_LISTED = 'The element is publicly listed.';
export const REASON_PART_OF_PUBLIC_WORKSHOP =
  'You can read elements of published workshops.';
export const REASON_LIKED_WORKSHOP = 'You liked the workshop.';

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
      ElementToElementTag: ElementToElementTag;
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
    can(ABILITY_ACTION_WRITE, 'User', { id: userId }).because(REASON_OWNER);
    can(ABILITY_ACTION_READ, 'User', { id: userId }).because(REASON_OWNER);
    can(ABILITY_ACTION_READ, 'Workshop', { ownerId: userId }).because(
      REASON_OWNER,
    );
    can(ABILITY_ACTION_READ, 'Workshop', { isPublic: true }).because(
      REASON_PUBLIC,
    );
    can(ABILITY_ACTION_READ, 'Workshop', { isListed: true }).because(
      REASON_PUBLICLY_LISTED,
    );
    can(ABILITY_ACTION_WRITE, 'Workshop', { ownerId: userId }).because(
      REASON_OWNER,
    );
    can(ABILITY_ACTION_LIST, 'Workshop', { ownerId: userId }).because(
      REASON_OWNER,
    );
    can(ABILITY_ACTION_LIST, 'Workshop', { isListed: true }).because(
      REASON_PUBLICLY_LISTED,
    );
    can(ABILITY_ACTION_LIST, 'Workshop', {
      userLikedWorkshops: { some: { userId: userId } },
    }).because(REASON_LIKED_WORKSHOP);

    can([ABILITY_ACTION_READ, ABILITY_ACTION_LIST], 'ElementToElementTag', {
      element: { ownerId: userId },
    }).because(REASON_OWNER);
    can([ABILITY_ACTION_READ, ABILITY_ACTION_LIST], 'ElementToElementTag', {
      element: { visibility: ElementVisibility.PUBLIC },
    }).because(REASON_PUBLIC);
    can(ABILITY_ACTION_READ, 'ElementToElementTag', {
      element: {
        workshopElements: {
          some: { workshopSection: { workshop: { isPublic: true } } },
        },
      },
    }).because(REASON_PUBLIC);
    can([ABILITY_ACTION_READ, ABILITY_ACTION_LIST], 'ElementToElementTag', {
      element: {
        workshopElements: {
          some: {
            workshopSection: { workshop: { isPublic: true, isListed: true } },
          },
        },
      },
    }).because(REASON_PUBLICLY_LISTED);

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
    }).because(REASON_PUBLICLY_LISTED);
    can(ABILITY_ACTION_LIST, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLICLY_LISTED);
    can(ABILITY_ACTION_WRITE, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLICLY_LISTED);

    can(ABILITY_ACTION_READ, 'Element', {
      workshopElements: {
        some: {
          workshopSection: { is: { workshop: { is: { isPublic: true } } } },
        },
      },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);

    can(ABILITY_ACTION_READ, 'WorkshopElement', {
      workshopSection: { is: { workshop: { is: { ownerId: userId } } } },
    }).because(REASON_OWNER);
    can(ABILITY_ACTION_READ, 'WorkshopElement', {
      workshopSection: { is: { workshop: { is: { isPublic: true } } } },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);
  } else {
    can(
      [ABILITY_ACTION_READ, ABILITY_ACTION_LIST],
      'ElementToElementTag',
    ).because(REASON_PUBLIC);
    can(ABILITY_ACTION_READ, 'Workshop', { isPublic: true }).because(
      REASON_PUBLIC,
    );
    can(ABILITY_ACTION_READ, 'Workshop', { isListed: true }).because(
      REASON_PUBLICLY_LISTED,
    );
    can(ABILITY_ACTION_LIST, 'Workshop', { isListed: true }).because(
      REASON_PUBLICLY_LISTED,
    );

    can(ABILITY_ACTION_READ, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLICLY_LISTED);
    can(ABILITY_ACTION_LIST, 'Element', {
      visibility: ElementVisibility.PUBLIC,
    }).because(REASON_PUBLICLY_LISTED);
    can(ABILITY_ACTION_READ, 'Element', {
      workshopElements: {
        some: {
          workshopSection: { is: { workshop: { is: { isPublic: true } } } },
        },
      },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);

    can(ABILITY_ACTION_READ, 'WorkshopElement', {
      workshopSection: { is: { workshop: { is: { isPublic: true } } } },
    }).because(REASON_PART_OF_PUBLIC_WORKSHOP);
  }
  return build();
};
