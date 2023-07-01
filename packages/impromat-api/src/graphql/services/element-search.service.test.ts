import { Test } from '@nestjs/testing';
import { Element } from '@prisma/client';
import { ElementSearchService } from 'src/graphql/services/element-search.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from './prisma.service';

describe('ElementSearchService', () => {
  let service: ElementSearchService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ElementSearchService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(ElementSearchService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should return all existing elements for empty text', async () => {
    // given
    const searchText = undefined;
    const dbElements = [{ id: '1' }, { id: '2' }] as Element[];
    jest.spyOn(prismaService.element, 'findMany').mockResolvedValue(dbElements);
    // when
    const result = await service.searchElements('userId', {
      text: searchText,
      take: 20,
      skip: 0,
    });
    // then
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { element: { id: '1' }, score: 1, matches: [] },
      { element: { id: '2' }, score: 1, matches: [] },
    ]);
  });

  it('should return score and matches for elements', async () => {
    // given
    const searchText = 'frez tag';
    const dbElements = [
      { id: '1', name: 'freeze' },
      { id: '2', name: 'freeze tag' },
      { id: '3', name: 'different' },
    ] as Element[];
    jest.spyOn(prismaService.element, 'findMany').mockResolvedValue(dbElements);
    // when
    const result = await service.searchElements('userId', {
      text: searchText,
      take: 20,
      skip: 0,
    });
    // then
    expect(result[0].score).toBeGreaterThan(0.1);
    expect(result[0].score).toBeLessThan(0.4);
    expect(result[0].element.id).toBe('2');
  });
});
