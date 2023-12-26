import { Inject } from '@nestjs/common';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Element } from 'src/dtos/types/element.dto';
import { ElementVariationsService } from './element-variations.service';

import { Field, ObjectType } from '@nestjs/graphql';
import { ElementKeywordsService } from './element-keywords.service';
import { ElementSummaryService } from './element-summary.service';

@ObjectType()
class Variation {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}

/**
 * Adds artificial intelligence capabilities to the Element.
 * Mainly by adding LLMs to automatically generate summaries or extract tags.
 */
@Resolver(Element)
export class ElementAiController {
  constructor(
    @Inject(ElementVariationsService)
    private elementVariationsService: ElementVariationsService,
    private elementKeywordsService: ElementKeywordsService,
    private elementSummaryService: ElementSummaryService,
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
    // TODO store variations in database
    return await this.elementVariationsService.detectVariations({
      elementId: element.id,
      name: element.name,
      markdown: element.markdown ?? '',
      languageCode: element.languageCode ?? 'en',
    });
  }

  @ResolveField(() => [String], {
    nullable: 'itemsAndList',
    description:
      'The keywords of the element. This is generated asynchronously and might not be available immediately.',
  })
  async keywords(
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
    return await this.elementKeywordsService.detectKeywords({
      elementId: element.id,
      name: element.name,
      markdown: element.markdown ?? '',
      languageCode: element.languageCode ?? 'en',
    });
  }

  @ResolveField(() => String, {
    nullable: true,
    description:
      'The summary of the element. This is generated asynchronously and might not be available immediately.',
  })
  async summary(
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
    return this.elementSummaryService.getElementSummary(
      userSessionId,
      element.id,
      forceRefresh,
    );
  }
}
