import {
  Field,
  ID,
  InputType,
  Int,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { IdInput } from './id-input';

@InputType()
export class CreateWorkshopElementInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;
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
export class ListDeleteInput {
  @Field(() => ID, { nullable: true })
  delete?: string[];
}

@InputType()
export class WorkshopElementListInput extends IntersectionType(
  WorkshopElementListCreateInput,
  IntersectionType(WorkshopElementListUpdateInput, ListDeleteInput),
) {}
