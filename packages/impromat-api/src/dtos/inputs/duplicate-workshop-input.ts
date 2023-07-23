import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType({
  description: 'Duplicates a workshop to allow changes to the new workshop.',
})
export class DuplicateWorkshopInput {
  @Field(() => ID)
  @IsUUID(4)
  workshopId: string;

  @Field(() => String)
  @Length(1, 500)
  name: string;
}
