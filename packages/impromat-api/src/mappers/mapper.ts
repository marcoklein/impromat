/**
 * Mapper interface to map between a data transfer object (DTO) and a database model.
 */
export interface Mapper<
  DTO_TYPE,
  MODEL_TYPE,
  DTO_PROPS extends {},
  MODEL_PROPS extends {}
> {
  fromDtoToModel(dto: DTO_TYPE, props: DTO_PROPS): MODEL_TYPE;
  fromModelToDto(model: MODEL_TYPE, props: MODEL_PROPS): DTO_TYPE;
}
