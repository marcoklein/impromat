import {
  Field,
  Float,
  ID,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';
import { IdInput } from './id-input';

@InputType()
export class BasedOnElementConnectInput {
  @Field(() => IdInput)
  connect: IdInput;
}

@InputType()
export class CreateWorkshopElementInput {
  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  note?: string;

  @Field(() => BasedOnElementConnectInput)
  @IsUUID(4)
  basedOn: BasedOnElementConnectInput;

  @Field(() => Float, { nullable: true })
  orderIndex?: number;
}

@InputType()
export class DeleteWorkshopElementInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateWorkshopElementInput extends IntersectionType(
  PartialType(CreateWorkshopElementInput),
  IdInput,
) {}

@InputType()
export class WorkshopElementListCreateInput {
  @Field(() => [CreateWorkshopElementInput], { nullable: true })
  create?: CreateWorkshopElementInput[];
}

@InputType()
export class WorkshopElementListUpdateInput {
  @Field(() => [UpdateWorkshopElementInput], { nullable: true })
  update?: UpdateWorkshopElementInput[];
}

@InputType()
export class WorkshopElementListDeleteInput {
  @Field(() => [DeleteWorkshopElementInput], { nullable: true })
  delete?: DeleteWorkshopElementInput[];
}

@InputType()
export class WorkshopElementListInput extends IntersectionType(
  WorkshopElementListCreateInput,
  IntersectionType(
    WorkshopElementListUpdateInput,
    WorkshopElementListDeleteInput,
  ),
) {}
