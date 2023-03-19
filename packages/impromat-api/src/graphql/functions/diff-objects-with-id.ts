interface ObjectWithOptionalId {
  id?: string;
}

interface ObjectWithId {
  id: string;
}

interface ObjectWithOrderIndex {
  orderIndex: number;
}

export function diffObjectsWithId<T extends ObjectWithOptionalId>(
  sourceList: T[],
  targetList: ObjectWithId[],
) {
  const updated: (T & ObjectWithOrderIndex)[] = [];
  const created: (T & ObjectWithOrderIndex)[] = [];
  const deleted = targetList.filter(
    (x) => !sourceList.find((source) => source?.id === x.id),
  );

  let orderIndex = 0;
  for (const sourceItem of sourceList) {
    if (sourceItem.id) {
      if (!targetList.find(({ id }) => id === sourceItem.id)) {
        throw new Error('Cannot update unknown id.');
      }
      updated.push({ ...sourceItem, orderIndex });
    } else {
      created.push({ ...sourceItem, orderIndex });
    }
    orderIndex++;
  }
  return {
    updated,
    created,
    deleted,
  };
}
