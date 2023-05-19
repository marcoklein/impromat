import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { User } from './user.dto';
import { WorkshopSection } from './workshop-section.dto';

type WorkshopComputedFields = 'isLiked';
type WorkshopRelations = 'owner' | 'sections';
export type WorkshopOmittedFields = WorkshopRelations | WorkshopComputedFields;

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

  @Field(() => Boolean, {
    nullable: true,
    description: 'If true, the client is authorized to edit the workshop.',
  })
  canEdit?: Nullable<boolean>;

  @Field(() => Boolean)
  isPublic: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'True, if liked by the logged in user. Undefined, if there is no user logged in.',
  })
  isLiked: Nullable<boolean>;
}
