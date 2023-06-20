import { subject } from '@casl/ability';
import { Element } from '@prisma/client';
import { defineAbilityForUser } from 'src/graphql/abilities';

const ownerId = 'owner-id';

const ownElement = {
  id: 'element-own',
  ownerId,
} as Element;

const elementWithOtherOwner = {
  id: 'element-with-different-owner',
  ownerId: 'other-owner',
  visibility: 'PRIVATE',
} as Element;

const publicElementWithOtherOwner = {
  id: 'element-with-different-owner',
  ownerId: 'other-owner',
  visibility: 'PUBLIC',
} as Element;

describe('Abilities', () => {
  it('should have correct elements abilities', () => {
    // given
    const userAbility = defineAbilityForUser(ownerId);
    // when, then
    expect(userAbility.can('read', subject('Element', ownElement))).toBe(true);
    expect(userAbility.can('write', subject('Element', ownElement))).toBe(true);
    expect(userAbility.can('list', subject('Element', ownElement))).toBe(true);
    expect(
      userAbility.can('read', subject('Element', publicElementWithOtherOwner)),
    ).toBe(true);
    expect(
      userAbility.can('write', subject('Element', publicElementWithOtherOwner)),
    ).toBe(true);
    expect(
      userAbility.can('list', subject('Element', publicElementWithOtherOwner)),
    ).toBe(true);

    expect(
      userAbility.can('write', subject('Element', ownElement), 'visibility'),
    ).toBe(true);
    expect(
      userAbility.can('write', subject('Element', ownElement), 'visibility'),
    ).toBe(true);

    expect(
      userAbility.can('read', subject('Element', elementWithOtherOwner)),
    ).toBe(false);
    expect(
      userAbility.can('write', subject('Element', elementWithOtherOwner)),
    ).toBe(false);
    expect(
      userAbility.can('list', subject('Element', elementWithOtherOwner)),
    ).toBe(false);
  });
});
