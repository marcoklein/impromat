import {
  Field,
  Float,
  ID,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { IdInput } from './id-input';
import {
  WorkshopElementListCreateInput,
  WorkshopElementListInput,
} from './workshop-element-input';

@InputType()
export class CreateWorkshopSectionInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => Float, { nullable: true })
  orderIndex?: number;

  @Field(() => WorkshopElementListCreateInput, { nullable: true })
  elements?: WorkshopElementListCreateInput;
}

@InputType()
export class UpdateWorkshopSectionInput extends IntersectionType(
  PartialType(CreateWorkshopSectionInput),
  IdInput,
) {
  @Field(() => WorkshopElementListInput, { nullable: true })
  elements?: WorkshopElementListInput;
}

@InputType()
export class DeleteWorkshopSectionInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class WorkshopSectionListCreateInput {
  @Field(() => [CreateWorkshopSectionInput], { nullable: true })
  create?: CreateWorkshopSectionInput[];
}

@InputType()
export class WorkshopSectionListUpdateInput {
  @Field(() => [UpdateWorkshopSectionInput], { nullable: true })
  update?: UpdateWorkshopSectionInput[];
}

@InputType()
export class WorkshopSectionListDeleteInput {
  @Field(() => [DeleteWorkshopSectionInput], { nullable: true })
  delete?: DeleteWorkshopSectionInput[];
}

@InputType()
export class WorkshopSectionListInput extends IntersectionType(
  WorkshopSectionListCreateInput,
  IntersectionType(
    WorkshopSectionListUpdateInput,
    WorkshopSectionListDeleteInput,
  ),
) {}
