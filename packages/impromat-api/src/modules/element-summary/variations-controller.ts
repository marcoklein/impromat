import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Element } from 'src/dtos/types/element.dto';
import { ElementVariationsService } from './element-variations.service';

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Variation {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}

@Resolver(Element)
export class ElementVariationsController {
  constructor(
    @Inject(ElementVariationsService)
    private elementVariationsService: ElementVariationsService,
  ) {}

  @ResolveField(() => [Variation], {
    nullable: 'itemsAndList',
    description:
      'The summary of the element. This is generated asynchronously and might not be available immediately.',
  })
  async variations(
    @Args('forceRefresh', {
      type: () => Boolean,
      defaultValue: false,
      description:
        'Force a refresh of the summary. The result will not return immediately as the summary is generated asynchronously.',
    })
    forceRefresh: boolean,
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return await this.elementVariationsService.detectVariations({
      elementId: element.id,
      name: element.name,
      markdown: element.markdown ?? '',
      languageCode: element.languageCode ?? 'en',
    });
  }
}
