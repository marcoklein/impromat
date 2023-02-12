import { diffObjectsWithId } from './diff-objects-with-id';

describe('diffObjectsWithId', () => {
  it('should get the difference of two lists', () => {
    // given
    const source = [{ id: 'existing' }, { name: 'created' }];
    const target = [
      {
        id: 'existing',
      },
      {
        id: 'will-be-deleted',
      },
    ];
    // when
    const result = diffObjectsWithId(source, target);
    // then
    expect(result.created).toEqual([{ name: 'created', orderIndex: 1 }]);
    expect(result.deleted).toEqual([{ id: 'will-be-deleted' }]);
    expect(result.updated).toEqual([{ id: 'existing', orderIndex: 0 }]);
  });
});
