import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsUUID(4)
  id: string;

  @Field(() => String, { nullable: true })
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^[a-zA-Z \-_0-9]*$/)
  @Transform((param) => param.value.trim())
  @IsString()
  name?: string | undefined;

  @Field(() => [String], {
    description: 'Preferred languages of the user. E.g. de or en.',
    nullable: true,
  })
  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(1)
  languageCodes?: string[] | undefined;
}
