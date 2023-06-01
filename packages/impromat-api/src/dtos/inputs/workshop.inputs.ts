import {
  Field,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';
import { IdInput } from 'src/dtos/inputs/id-input';
import {
  WorkshopSectionListCreateInput,
  WorkshopSectionListInput,
} from 'src/dtos/inputs/workshop-section-input';

@InputType()
export class CreateWorkshopInput {
  @Field(() => String)
  @Length(1, 500)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  description?: string;

  @Field(() => WorkshopSectionListCreateInput, { nullable: true })
  sections?: WorkshopSectionListCreateInput;

  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Publicly list workshop within impromat. Worshop must be public in order to list it.',
  })
  isListed?: boolean;
}

@InputType()
export class UpdateWorkshopInput extends IntersectionType(
  PartialType(CreateWorkshopInput),
  IdInput,
) {
  @Field(() => WorkshopSectionListInput, { nullable: true })
  sections?: WorkshopSectionListInput;
}
