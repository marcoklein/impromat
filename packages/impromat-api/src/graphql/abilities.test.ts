import { ExtractSubjectType } from '@casl/ability';
import {
  AppAbility,
  REASON_LIKED_WORKSHOP,
  REASON_OWNER,
  REASON_PART_OF_PUBLIC_WORKSHOP,
  REASON_PUBLIC,
  REASON_PUBLICLY_LISTED,
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
      ['User', 'read', [REASON_OWNER]],
      ['User', 'write', [REASON_OWNER]],
      [
        'Element',
        'read',
        [REASON_OWNER, REASON_PUBLICLY_LISTED, REASON_PART_OF_PUBLIC_WORKSHOP],
      ],
      ['Element', 'write', [REASON_OWNER, REASON_PUBLICLY_LISTED]],
      ['Element', 'list', [REASON_OWNER, REASON_PUBLICLY_LISTED]],
      [
        'Workshop',
        'read',
        [REASON_OWNER, REASON_PUBLIC, REASON_PUBLICLY_LISTED],
      ],
      ['Workshop', 'write', [REASON_OWNER]],
      [
        'Workshop',
        'list',
        [REASON_OWNER, REASON_PUBLICLY_LISTED, REASON_LIKED_WORKSHOP],
      ],
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
      [
        'Element',
        'read',
        [REASON_PUBLICLY_LISTED, REASON_PART_OF_PUBLIC_WORKSHOP],
      ],
      ['Element', 'write', []],
      ['Element', 'list', [REASON_PUBLICLY_LISTED]],
      ['ElementToElementTag', 'read', [REASON_PUBLIC]],
      ['Workshop', 'read', [REASON_PUBLIC, REASON_PUBLICLY_LISTED]],
      ['Workshop', 'write', []],
      ['Workshop', 'list', [REASON_PUBLICLY_LISTED]],
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
