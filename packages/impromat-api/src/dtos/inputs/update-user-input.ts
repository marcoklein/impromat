import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Matches,
  IsUUID,
  MaxLength,
  MinLength,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Field(() => String)
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^[a-zA-Z \-_0-9]*$/)
  @Transform((param) => param.value.trim())
  @IsString()
  name: string;
}
