import { ElementModel } from "../database/element-model";
import { Element, ElementInput } from "../graphql/schema.gen";
import { Mapper } from "./mapper";

export class ElementInputMapper
  implements Mapper<ElementInput, ElementModel, {}, never>
{
  fromDtoToModel(dto: ElementInput): ElementModel {
    return {
      updatedAt: 0,

      id: dto.id,
      version: dto.version,
      name: dto.name,
      deleted: dto.deleted ?? false,
      markdown: dto.markdown ?? "",
      tags: dto.tags ?? [],
      note: dto.note ?? "",
      basedOn: dto.basedOn ?? undefined,
      languageCode: dto.languageCode ?? undefined,
      sourceUrl: dto.sourceUrl ?? undefined,
      sourceName: dto.sourceName ?? undefined,
      sourceBaseUrl: dto.sourceBaseUrl ?? undefined,
      licenseName: dto.licenseName ?? undefined,
      licenseUrl: dto.licenseUrl ?? undefined,
    };
  }
  fromModelToDto(model: ElementModel): ElementInput {
    throw new Error("not implemented");
  }
}
