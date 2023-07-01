import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BoolFilter {
  @Field(() => Boolean, {
    nullable: true,
  })
  equals?: boolean | undefined;
}
