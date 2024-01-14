type SectionType = {
  id: string;
  elements: { id: string; orderIndex: number }[];
  isInvisible?: boolean;
  isCollapsed?: boolean;
  orderIndex: number;
};

function flattenSections(sections: SectionType[]) {
  const result: Array<
    | { type: 'section'; data: SectionType }
    | { type: 'element'; data: { id: string } }
  > = [];
  for (const section of sections) {
    result.push({ type: 'section', data: section });
    result.push(
      ...section.elements.map(
        ({ id: elementId }): { type: 'element'; data: { id: string } } => ({
          type: 'element',
          data: { id: elementId },
        }),
      ),
    );
  }
  return result;
}

export function moveItemFromIndexToIndex(
  sections: SectionType[],
  visibleFromIndex: number,
  visibleToIndex: number,
) {
  sections = JSON.parse(JSON.stringify(sections));
  const flatSections = flattenSections(
    JSON.parse(JSON.stringify(sections)) as SectionType[],
  );
  const visibleToGlobalIndex = (visibleIndex: number) => {
    let globalIndex = 0;
    let curVisibleIndex = 0;
    let collapsedFlag = false;
    for (const item of flatSections) {
      if (item.type === 'section') {
        if (!item.data.isInvisible) {
          if (visibleIndex === curVisibleIndex) {
            return {
              item,
              globalIndex,
              collapsedChildrenCount: item.data.isCollapsed
                ? item.data.elements.length
                : 0,
            };
          }
          curVisibleIndex++;
        }
        collapsedFlag = !!item.data.isCollapsed;
      } else if (item.type === 'element') {
        if (!collapsedFlag) {
          if (visibleIndex === curVisibleIndex) {
            return { item, globalIndex, collapsedChildrenCount: 0 };
          }
          curVisibleIndex++;
        }
      }
      globalIndex++;
    }
  };
  if (
    visibleFromIndex === 0 &&
    visibleToGlobalIndex(1)?.item.type !== 'section'
  ) {
    return {
      sections,
    };
  }

  const from = visibleToGlobalIndex(visibleFromIndex);
  const to = visibleToGlobalIndex(visibleToIndex);

  if (from && to) {
    const removedItems = flatSections.splice(
      from.globalIndex,
      from.collapsedChildrenCount + 1,
    );
    // const indexCorrection = from.globalIndex < to.globalIndex ? 1 : 0;
    const indexCorrection = 0;
    flatSections.splice(to.globalIndex + indexCorrection, 0, ...removedItems);

    let elementsOfSection: { id: string; orderIndex: number }[] = [];
    let section: SectionType | undefined = undefined;
    const newSections: SectionType[] = [];
    for (const item of flatSections) {
      if (item.type === 'section') {
        if (section) {
          section.elements = elementsOfSection;
          section.orderIndex = newSections.length;
          elementsOfSection = [];
          newSections.push(section);
        }
        section = item.data;
      } else if (item.type === 'element') {
        elementsOfSection.push({
          id: item.data.id,
          orderIndex: elementsOfSection.length,
        });
      }
    }
    if (section) {
      section.elements = elementsOfSection;
      elementsOfSection = [];
      section.orderIndex = newSections.length;
      newSections.push(section);
    }
    return {
      from,
      sections: newSections,
    };
  } else {
    console.error(
      `Reordering error: from: ${visibleFromIndex}, to: ${visibleToIndex}`,
    );
    throw new Error('Reordering error');
  }
}
