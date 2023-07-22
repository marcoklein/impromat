import { Test } from '@nestjs/testing';
import {
  Prisma,
  Workshop,
  WorkshopElement,
  WorkshopSection,
} from '@prisma/client';
import { isUUID } from 'class-validator';
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

  const userId = 'test-user';

  describe('findWorkshopById', () => {
    it('should find a workshop', async () => {
      // given
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
  });

  describe('updateWorkshopItemOrder', () => {
    it('should update a workshop item order', async () => {
      // given
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

  describe('duplicateWorkshop', () => {
    // given
    const workshopId = 'workshop-id';

    it('should throw if the workshop to clone was not found', async () => {
      // given
      prismaService.workshop.findFirst.mockResolvedValue(null);
      // when, then
      await expect(async () =>
        service.duplicateWorkshop(userId, { workshopId }),
      ).rejects.toThrowError(/Workshop not found/);
    });

    it('should throw if the workshop is not owned by the current user', async () => {
      // given
      const existingWorkshop = {
        id: workshopId,
        ownerId: 'other-user-id',
      } as Workshop;
      prismaService.workshop.findFirst.mockResolvedValue(existingWorkshop);
      // when, then
      await expect(async () =>
        service.duplicateWorkshop(userId, { workshopId }),
      ).rejects.toThrowError(/duplicate own workshops/);
    });

    describe('given a workshop', () => {
      beforeEach(() => {
        // given
        type ExistingWorkshop = Workshop & {
          sections: Array<
            Partial<WorkshopSection> & {
              elements: Array<Partial<WorkshopElement> & { basedOnId: string }>;
            }
          >;
        };
        const existingWorkshop: ExistingWorkshop = {
          id: workshopId,
          ownerId: userId,
          createdAt: new Date(0),
          updatedAt: new Date(0),
          deleted: true,
          description: 'original workshop',
          isListed: true,
          isPublic: true,
          name: 'test-workshop',
          version: 10,
          sections: [
            {
              id: 'original-section-id',
              isCollapsed: true,
              createdAt: new Date(0),
              updatedAt: new Date(0),
              orderIndex: 0,
              name: 'first section',
              elements: [
                {
                  id: 'original-workshop-id',
                  note: 'test-note',
                  createdAt: new Date(0),
                  updatedAt: new Date(0),
                  basedOnId: 'original-based-on-id',
                },
              ],
            },
          ],
        };
        prismaService.workshop.findFirst.mockResolvedValue(existingWorkshop);
        prismaService.$transaction.mockResolvedValue([
          { id: 'override-the-mock-if-you-want-to-test-the-return-value' },
        ]);
      });

      describe('when successfully created', () => {
        // given (defined in beforeEach)
        let workshopCreateMock: typeof prismaService.workshop.create.mock;
        let workshopSectionCreate: typeof prismaService.workshopSection.create.mock;
        let workshopElementCreate: typeof prismaService.workshopElement.create.mock;
        let duplicatedWorkshopId: string;
        let duplicatedSectionId: string;
        let workshopCreateData: Prisma.WorkshopCreateInput;
        let workshopSectionCreateData: Prisma.WorkshopSectionCreateInput;
        let workshopElementCreateData: Prisma.WorkshopElementCreateInput;

        beforeEach(async () => {
          // given
          workshopCreateMock = prismaService.workshop.create.mock;
          workshopSectionCreate = prismaService.workshopSection.create.mock;
          workshopElementCreate = prismaService.workshopElement.create.mock;
          // when
          await service.duplicateWorkshop(userId, {
            workshopId: duplicatedWorkshopId,
          });
          duplicatedWorkshopId = workshopCreateMock.calls[0][0].data.id!;
          duplicatedSectionId = workshopSectionCreate.calls[0][0].data.id!;
          workshopCreateData = workshopCreateMock.calls[0][0]
            .data as Prisma.WorkshopCreateInput;
          workshopSectionCreateData = workshopSectionCreate.calls[0][0]
            .data as Prisma.WorkshopSectionCreateInput;
          workshopElementCreateData = workshopElementCreate.calls[0][0]
            .data as Prisma.WorkshopElementCreateInput;
        });

        it('should have the expected create data', async () => {
          // then
          delete workshopCreateData.id;
          expect(workshopCreateData).toEqual({
            name: 'test-workshop',
            description: 'original workshop',
            ownerId: userId,
            isListed: false,
            isPublic: false,
            sections: undefined,

            deleted: false,
            createdAt: undefined,
            updatedAt: undefined,
            version: undefined,
          });
        });

        it('should have the expected create data for the workshop section', async () => {
          // then
          delete workshopSectionCreateData.id;
          expect(workshopSectionCreateData).toEqual({
            isCollapsed: false,
            orderIndex: 0,
            name: 'first section',

            elements: undefined,
            workshop: undefined,
            workshopId: duplicatedWorkshopId,
            createdAt: undefined,
            updatedAt: undefined,
            deleted: false,
            deletedAt: undefined,
            version: undefined,
          });
        });

        it('should have create a uuid for the workshop section', async () => {
          // then
          const createData = workshopSectionCreate.calls[0][0].data;
          expect(isUUID(createData.id)).toBe(true);
        });

        it('should have the expected create data for the workshop element', async () => {
          // then
          expect(workshopElementCreateData).toEqual({
            id: undefined,
            note: 'test-note',
            createdAt: undefined,
            updatedAt: undefined,
            version: undefined,
            deleted: false,
            deletedAt: undefined,
            workshopSection: undefined,
            basedOn: undefined,
            workshopSectionId: duplicatedSectionId,
            basedOnId: 'original-based-on-id',
          });
        });
      });
    });
  });
});
