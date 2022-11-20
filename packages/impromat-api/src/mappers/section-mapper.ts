import { SectionModel } from "../database/section-model";
import { Element, Section, SectionInput } from "../graphql/schema.gen";

export function fromSectionInputDtoToSectionModel(
  inputDto: SectionInput
): SectionModel {
  return {
    updatedAt: 0,
    color: inputDto.color ?? undefined,
    elements: inputDto.elementRefs ?? [],
    id: inputDto.id,
    isCollapsed: inputDto.isCollapsed ?? false,
    isVisible: inputDto.isVisible ?? false,
    name: inputDto.name ?? "",
    note: inputDto.note ?? "",
    version: inputDto.version,
  };
}

export function fromSectionModelToSectionDto(model: SectionModel): Section {
  return {
    color: model.color ?? undefined,
    elements:
      model.elements.map((elementId) => ({ id: elementId } as Element)) ?? [],
    id: model.id,
    isCollapsed: model.isCollapsed ?? false,
    isVisible: model.isVisible ?? false,
    name: model.name ?? "",
    note: model.note ?? "",
    version: model.version,
  };
}
