import {
  Field,
  ID,
  InputType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

@InputType()
export class CreateWorkshopInput {
  @Field(() => String)
  @Length(1, 500)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  description?: string;
}

@InputType()
class WorkshopIdInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateWorkshopInput extends IntersectionType(
  PartialType(CreateWorkshopInput),
  WorkshopIdInput,
) {}
