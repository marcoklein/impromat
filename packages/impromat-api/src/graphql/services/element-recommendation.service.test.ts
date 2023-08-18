import { Test } from '@nestjs/testing';
import { Element } from '@prisma/client';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { ElementRecommendationService } from './element-recommendation.service';
import { PrismaService } from './prisma.service';

describe('ElementRecommendationService', () => {
  let service: ElementRecommendationService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ElementRecommendationService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(ElementRecommendationService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should find recommended elements', async () => {
    // given
    const userRequestId = 'userRequestId';
    const elementId = 'elementId';
    const dbElements = [{ id: '1' }, { id: '2' }] as Element[];
    jest.spyOn(prismaService.element, 'findFirstOrThrow').mockResolvedValue({
      id: elementId,
      languageCode: 'de',
      tags: [{ name: 'tag1' }, { name: 'tag2' }],
    } as Partial<Element> as Element);
    jest.spyOn(prismaService.element, 'findMany').mockResolvedValue(dbElements);
    // when
    const result = await service.findRecommendations(userRequestId, elementId);
    // then
    expect(result).toHaveLength(2);
    expect(result).toEqual(dbElements);
  });
});
