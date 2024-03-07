import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Element } from 'src/dtos/types/element.dto';
import { ElementEmbeddingService } from './element-embedding.service';

@Resolver(Element)
export class ElementEmbeddingController {
  constructor(private elementEmbeddingService: ElementEmbeddingService) {}

  @ResolveField(() => [Float], { nullable: true })
  async embedding(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.elementEmbeddingService.getElementEmbedding(
      userSessionId,
      element.id,
    );
  }
}
