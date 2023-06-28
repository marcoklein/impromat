import { ExtractSubjectType } from '@casl/ability';
import {
  AppAbility,
  REASON_OWNER,
  REASON_PART_OF_PUBLIC_WORKSHOP,
  REASON_PUBLIC,
  defineAbilityForUser,
} from 'src/graphql/abilities';

describe('Abilities', () => {
  describe('with authenticated user', () => {
    // given
    const userId = 'owner-id';
    const userAbility = defineAbilityForUser(userId);

    it('should provide reasons for all abilities', () => {
      // when
      const rulesWithoutReason = userAbility.rules.filter(
        (rule) => !rule.reason,
      );
      // then
      expect(rulesWithoutReason).toEqual([]);
    });

    it.each([
      [
        'Element',
        'read',
        [REASON_OWNER, REASON_PUBLIC, REASON_PART_OF_PUBLIC_WORKSHOP],
      ],
      ['Element', 'write', [REASON_OWNER, REASON_PUBLIC]],
      ['Element', 'list', [REASON_OWNER, REASON_PUBLIC]],
    ])(
      'should contain expected rules for subject "%s" and action "%s"',
      (
        subjectType: ExtractSubjectType<AppAbility>,
        action: 'read' | 'write' | 'list',
        ruleReasons: string[],
      ) => {
        // when
        const rules = userAbility.rulesFor(action, subjectType);
        // then
        expect(rules.map((r) => r.reason).sort()).toEqual(ruleReasons.sort());
      },
    );
  });

  describe('with anonymous user', () => {
    // given
    const userId = undefined;
    const anonymousUserAbility = defineAbilityForUser(userId);

    it('should provide reasons for all abilities', () => {
      // when
      const rulesWithoutReason = anonymousUserAbility.rules.filter(
        (rule) => !rule.reason,
      );
      // then
      expect(rulesWithoutReason).toEqual([]);
    });

    it.each([
      ['Element', 'read', [REASON_PUBLIC, REASON_PART_OF_PUBLIC_WORKSHOP]],
      ['Element', 'write', []],
      ['Element', 'list', [REASON_PUBLIC]],
    ])(
      'should contain expected rules for subject "%s" and action "%s"',
      (
        subjectType: ExtractSubjectType<AppAbility>,
        action: 'read' | 'write' | 'list',
        ruleReasons: string[],
      ) => {
        // when
        const rules = anonymousUserAbility.rulesFor(action, subjectType);
        // then
        expect(rules.map((r) => r.reason).sort()).toEqual(ruleReasons.sort());
      },
    );
  });
});
