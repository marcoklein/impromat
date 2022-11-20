import { WorkshopModel } from "../database/workshop-model";
import { Section, Workshop, WorkshopInput } from "../graphql/schema.gen";

export function fromWorkshopInputDtoToWorkshopModel(
  inputDto: WorkshopInput
): WorkshopModel {
  return {
    deleted: inputDto.deleted ?? false,
    description: inputDto.description ?? "",
    id: inputDto.id,
    name: inputDto.name ?? "",
    sections: inputDto.sectionRefs ?? [],
    updatedAt: inputDto.updatedAt,
    version: inputDto.version,
  };
}

export function fromWorkshopModelToWorkshopDto(model: WorkshopModel): Workshop {
  return {
    deleted: model.deleted ?? false,
    description: model.description ?? "",
    id: model.id,
    name: model.name ?? "",
    sections: model.sections?.map((ref) => ({ id: ref } as Section)) ?? [],
    updatedAt: model.updatedAt,
    version: model.version,
  };
}
