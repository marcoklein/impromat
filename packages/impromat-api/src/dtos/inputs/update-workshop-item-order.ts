import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType({
  description:
    'Moves a workshop item (section or element) within a workshop considering collapsed sections.',
})
export class UpdateWorkshopItemOrder {
  @Field(() => ID)
  @IsUUID(4)
  workshopId: string;
  @Field(() => Int, { description: 'From position.' })
  fromPosition: number;
  @Field(() => Int, { description: 'To position.' })
  toPosition: number;
}
