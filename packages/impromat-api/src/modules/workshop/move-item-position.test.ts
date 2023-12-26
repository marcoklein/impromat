import { moveItemFromIndexToIndex } from 'src/modules/workshop/move-item-position';

const GIVEN_SECTIONS = [
  {
    id: 'section-0',
    orderIndex: 0,
    elements: [
      { id: 'section-0-element-0', orderIndex: 0 },
      { id: 'section-0-element-1', orderIndex: 1 },
      { id: 'section-0-element-2', orderIndex: 2 },
    ],
  },
  {
    id: 'section-1',
    orderIndex: 1,
    elements: [
      { id: 'section-1-element-0', orderIndex: 0 },
      { id: 'section-1-element-1', orderIndex: 1 },
    ],
  },
];

describe('moveItemPosition', () => {
  it('should not move the first item', async () => {
    // given
    const fromPosition = 0;
    const toPosition = 4;
    // when
    const result = moveItemFromIndexToIndex(
      GIVEN_SECTIONS,
      fromPosition,
      toPosition,
    );
    // then
    expect(result.sections).toStrictEqual(GIVEN_SECTIONS);
  });

  it('should move item between sections', async () => {
    // given
    const fromPosition = 1;
    const toPosition = 4;
    // when
    const result = moveItemFromIndexToIndex(
      GIVEN_SECTIONS,
      fromPosition,
      toPosition,
    );
    // then
    expect(result.sections).toStrictEqual([
      {
        id: 'section-0',
        orderIndex: 0,
        elements: [
          { id: 'section-0-element-1', orderIndex: 0 },
          { id: 'section-0-element-2', orderIndex: 1 },
        ],
      },
      {
        id: 'section-1',
        orderIndex: 1,
        elements: [
          { id: 'section-0-element-0', orderIndex: 0 },
          { id: 'section-1-element-0', orderIndex: 1 },
          { id: 'section-1-element-1', orderIndex: 2 },
        ],
      },
    ]);
  });

  it('should move section to front', async () => {
    // given
    const fromPosition = 4;
    const toPosition = 0;
    // when
    const result = moveItemFromIndexToIndex(
      GIVEN_SECTIONS,
      fromPosition,
      toPosition,
    );
    // then
    expect(result.sections[0].id).toBe('section-1');
    expect(result.sections[0].orderIndex).toBe(0);
    expect(result.sections[0].elements.length).toBe(0);
    expect(result.sections[1].id).toBe('section-0');
    expect(result.sections[1].orderIndex).toBe(1);
    expect(result.sections[1].elements[0].id).toBe('section-0-element-0');
    expect(result.sections[1].elements[1].id).toBe('section-0-element-1');
    expect(result.sections[1].elements[2].id).toBe('section-0-element-2');
    expect(result.sections[1].elements[3].id).toBe('section-1-element-0');
    expect(result.sections[1].elements[4].id).toBe('section-1-element-1');
  });

  it('should move the first item if the second one is a section', async () => {
    // given
    const sections = [
      {
        id: 'section-0',
        orderIndex: 0,
        isCollapsed: true,
        elements: [{ id: 'section-0-element-0', orderIndex: 0 }],
      },
      {
        id: 'section-1',
        orderIndex: 1,
        elements: [],
      },
    ];
    // when
    const result = moveItemFromIndexToIndex(sections, 0, 1);
    // then
    expect(result.sections).toStrictEqual([
      {
        id: 'section-1',
        orderIndex: 0,
        elements: [],
      },
      {
        id: 'section-0',
        orderIndex: 1,
        isCollapsed: true,
        elements: [{ id: 'section-0-element-0', orderIndex: 0 }],
      },
    ]);
  });
});
