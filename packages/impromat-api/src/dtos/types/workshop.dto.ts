import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { Element } from './element.dto';
import { User } from './user.dto';
import { WorkshopSection } from './workshop-section.dto';

type WorkshopComputedFields =
  | 'isLiked'
  | 'isOwnerMe'
  | 'elementRecommendations';
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

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Public users can view the workshop but they require the direct link to the workshop. The url of the workshop does not change.',
  })
  isPublic: boolean;

  @Field(() => Boolean, {
    description:
      'True, if the workshop is listed publicly in the improv community.',
  })
  isListed: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'True, if liked by the logged in user. Undefined, if there is no user logged in.',
  })
  isLiked: Nullable<boolean>;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Convenience field to determine if the owner of the workshop is the logged in user.',
  })
  isOwnerMe: Nullable<boolean>;

  @Field(() => [Element])
  elementRecommendations: Element[];

  @Field(() => Date, {
    nullable: true,
    description:
      'Optional metadata date when this workshop was planned (or held).',
  })
  dateOfWorkshop: Nullable<Date>;
}
