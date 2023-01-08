interface BaseRow {
  id: string;
  version: number;
}

interface BaseModel extends BaseRow {
  updatedAt: number;
}

interface PushRowInput<T extends BaseRow> {
  assumedMasterState?: T | null;
  newDocumentState: T;
}

export function handlePushRows<
  InputDtoType extends BaseRow,
  DtoType,
  ModelType extends BaseModel
>(
  existingModelsInDatabase: ModelType[],
  pushedRows: PushRowInput<InputDtoType>[],
  mappers: {
    fromModelToDto: (model: ModelType) => DtoType;
    fromInputDtoToModel: (dto: InputDtoType) => ModelType;
  }
) {
  const conflicts: DtoType[] = [];
  let resultModels = existingModelsInDatabase;

  const updatedAt = Date.now();
  for (const row of pushedRows) {
    const { newDocumentState } = row;
    const { id: newDocumentStateId } = newDocumentState;
    const docCurrentMaster = existingModelsInDatabase.find(
      (d) => d.id === newDocumentStateId
    );

    // TODO commented as clients can not handle version conflicts yet
    // if (
    //   docCurrentMaster &&
    //   (row.assumedMasterState?.version !== docCurrentMaster.version ||
    //     row.newDocumentState.version !== docCurrentMaster.version + 1)
    // ) {
    //   conflicts.push(mappers.fromModelToDto(docCurrentMaster));
    //   continue;
    // }
    const modelsWithoutModelFromRow = existingModelsInDatabase.filter(
      (d) => d.id !== newDocumentState.id
    );
    const docModel = mappers.fromInputDtoToModel(newDocumentState);
    docModel.updatedAt = updatedAt;
    modelsWithoutModelFromRow.push(docModel);
    resultModels = modelsWithoutModelFromRow;
  }
  // resultModels.forEach((model) => {
  //   model.updatedAt = updatedAt;
  // });

  return {
    conflicts,
    models: resultModels,
  };
}
