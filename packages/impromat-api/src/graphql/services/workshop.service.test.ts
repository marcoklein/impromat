import { Test } from '@nestjs/testing';
import { Workshop } from '@prisma/client';
import { WorkshopService } from 'src/graphql/services/workshop.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from './prisma.service';

describe('WorkshopService', () => {
  let service: WorkshopService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [WorkshopService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(WorkshopService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should find a workshop', async () => {
    // given
    const userId = 'test-user';
    const workshopId = 'test-element';
    const existingWorkshopMock = jest
      .spyOn(prismaService.workshop, 'findFirst')
      .mockResolvedValue({ id: workshopId } as Workshop).mock;
    // when
    const result = await service.findWorkshopById(userId, workshopId);
    // then
    expect(existingWorkshopMock.calls).toHaveLength(1);
    expect(result!.id).toBe(workshopId);
  });

  it('should update a workshop item order', async () => {
    // given
    const userId = 'test-user';
    const workshopId = 'test-element';
    const fromIndex = 2;
    const toIndex = 4;
    const mockedWorkshop = {
      id: workshopId,
      sections: [
        {
          id: 'section-0',
          orderIndex: 0,
          elements: [
            { id: 'section-0-element-0', orderIndex: 0 },
            { id: 'section-0-element-1', orderIndex: 1 },
            { id: 'section-0-element-2', orderIndex: 2 },
          ],
        },
        {
          id: 'section-1',
          orderIndex: 1,
          elements: [
            { id: 'section-1-element-0', orderIndex: 0 },
            { id: 'section-1-element-1', orderIndex: 1 },
          ],
        },
      ],
    } as unknown as Workshop;
    const existingWorkshopMock = jest
      .spyOn(prismaService.workshop, 'findFirstOrThrow')
      .mockResolvedValue(mockedWorkshop).mock;
    const updateTransationMock = jest
      .spyOn(prismaService, '$transaction')
      .mockImplementation().mock;
    // when
    const result = await service.updateWorkshopItemOrder(userId, {
      fromPosition: fromIndex,
      toPosition: toIndex,
      workshopId,
    });
    // then
    expect(existingWorkshopMock.calls).toHaveLength(1);
    expect(updateTransationMock.calls).toHaveLength(1);
    expect(result.sections).toStrictEqual([
      {
        id: 'section-0',
        orderIndex: 0,
        elements: [
          { id: 'section-0-element-0', orderIndex: 0 },
          { id: 'section-0-element-2', orderIndex: 1 },
        ],
      },
      {
        id: 'section-1',
        orderIndex: 1,
        elements: [
          { id: 'section-0-element-1', orderIndex: 0 },
          { id: 'section-1-element-0', orderIndex: 1 },
          { id: 'section-1-element-1', orderIndex: 2 },
        ],
      },
    ]);
  });
});
