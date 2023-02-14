import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Nullable } from 'src/utils/nullish';
import { IdInput } from './id-input';

@InputType()
export class CreateElementInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => String, { nullable: true })
  markdown: Nullable<string>;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;
}

@InputType()
export class UpdateElementInput extends IntersectionType(
  PartialType(CreateElementInput),
  IdInput,
) {}
