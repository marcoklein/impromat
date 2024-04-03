import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';

@ObjectType()
export class Workshop extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: Nullable<string>;

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

  @Field(() => Date, {
    nullable: true,
    description:
      'Optional metadata date when this workshop was planned (or held).',
  })
  dateOfWorkshop: Nullable<Date>;
}
