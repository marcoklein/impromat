import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType({
  description: 'Duplicates a workshop to allow changes to the new workshop.',
})
export class DuplicateWorkshopInput {
  @Field(() => ID)
  @IsUUID(4)
  workshopId: string;
}
