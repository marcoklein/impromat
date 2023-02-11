import {
  Field,
  ID,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { IsUUID, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateWorkshopSectionInput {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  id?: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  name?: string;
}

@InputType()
export class CreateWorkshopInput {
  @Field(() => String)
  @Length(1, 500)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  description?: string;

  @Field(() => [CreateWorkshopSectionInput], { nullable: true })
  sections?: CreateWorkshopSectionInput[];
}

@InputType()
class WorkshopIdInput {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

@InputType()
export class UpdateWorkshopInput extends IntersectionType(
  PartialType(CreateWorkshopInput),
  WorkshopIdInput,
) {}
