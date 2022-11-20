import { ElementModel } from "../database/element-model";
import { Element } from "../graphql/schema.gen";
import { Mapper } from "./mapper";

export class ElementMapper implements Mapper<Element, ElementModel, {}, never> {
  fromDtoToModel(dto: Element): ElementModel {
    throw new Error("not implemented");
  }
  fromModelToDto(model: ElementModel): Element {
    const element = { ...model } as Element;
    if (model.basedOn) {
      element.basedOn = { id: model.basedOn } as Element;
    }
    return element;
  }
}
