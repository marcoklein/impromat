import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { User } from './user.dto';
import { WorkshopSection } from './workshop-section.dto';

export type WorkshopRelations = 'owner' | 'sections';

@ObjectType()
export class Workshop extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: Nullable<string>;

  @Field(() => [WorkshopSection])
  sections: WorkshopSection[];

  @Field(() => User)
  owner: User;
}
