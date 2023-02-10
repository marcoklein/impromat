import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';
import { Workshop } from './workshop.dto';

export type UserRelations = 'workshops';

@ObjectType()
export class User extends BaseDto {
  @Field(() => [Workshop])
  workshops: Workshop[];

  @Field(() => [Element], { description: 'Elements owned by this user.' })
  elements: Element[];

  @Field(() => [Element])
  favoriteElements: Element[];
}
