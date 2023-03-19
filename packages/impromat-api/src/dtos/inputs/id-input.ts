import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class IdInput {
  @Field(() => ID)
  @IsUUID(4)
  id: string;
}
