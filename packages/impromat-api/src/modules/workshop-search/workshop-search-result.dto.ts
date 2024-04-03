import { Field, ObjectType } from '@nestjs/graphql';
import { Workshop } from 'src/dtos/types/workshop.dto';

@ObjectType()
export class WorkshopSearchResult {
  @Field(() => Workshop)
  workshop: Workshop;
}
