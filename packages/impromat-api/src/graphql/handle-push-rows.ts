import { Mode } from "fs";

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
  inputModels: ModelType[],
  pushedRows: PushRowInput<InputDtoType>[],
  mappers: {
    fromModelToDto: (model: ModelType) => DtoType;
    fromInputDtoToModel: (dto: InputDtoType) => ModelType;
  }
) {
  const conflicts: DtoType[] = [];

  for (const row of pushedRows) {
    const docId = row.newDocumentState.id;
    const docCurrentMaster = inputModels.find((d) => d.id === docId);
    if (
      docCurrentMaster &&
      (row.assumedMasterState?.version !== docCurrentMaster.version ||
        row.newDocumentState.version !== docCurrentMaster.version + 1)
    ) {
      conflicts.push(mappers.fromModelToDto(docCurrentMaster));
      continue;
    }

    const doc = row.newDocumentState;
    const updatedWorkshops = inputModels.filter((d) => d.id !== doc.id);
    const docModel = mappers.fromInputDtoToModel(doc);
    updatedWorkshops.push(docModel);
    inputModels = updatedWorkshops;
  }

  const updatedAt = Date.now();
  inputModels.forEach((model) => {
    model.updatedAt = updatedAt;
  });
  return {
    conflicts,
    models: inputModels,
  };
}
