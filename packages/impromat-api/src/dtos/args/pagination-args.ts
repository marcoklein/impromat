import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

/**
 * Common arguments for offset pagination.
 */
@ArgsType()
export class PaginationArgs {
  @Min(0)
  @IsInt()
  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @IsInt()
  @Min(1)
  @Max(200)
  @Field(() => Int, { defaultValue: 20 })
  take: number;
}
