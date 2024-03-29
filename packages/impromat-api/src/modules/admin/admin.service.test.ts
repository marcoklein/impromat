import { Test } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ElementSummaryService } from '../element-ai/element-summary.service';
import { ElementService } from '../element/element.service';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let adminService: AdminService;
  let elementService: DeepMockProxy<ElementService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: ElementService,
          useValue: mockDeep(ElementService),
        },
        {
          provide: ElementSummaryService,
          useValue: mockDeep(ElementSummaryService),
        },
      ],
    }).compile();

    adminService = module.get(AdminService);
    elementService = module.get(ElementService);
  });

  describe('applyAllTagMappings', () => {
    it('should apply all tag mappings', async () => {
      // given
      const userRequestId = 'userRequestId';
      elementService.findElements.mockResolvedValue([
        {
          id: 'elementId',
          tags: [
            {
              tag: {
                name: 'tag1',
              },
            },
            {
              tag: {
                name: 'tag2',
              },
            },
          ],
        },
      ] as any);
      elementService.updateElement.mockResolvedValue({
        id: 'elementId',
        tags: [
          {
            tag: {
              name: 'tag1',
            },
          },
          {
            tag: {
              name: 'tag2',
            },
          },
        ],
      } as any);
      // when
      await adminService.applyAllTagMappings(userRequestId);
      // then
      expect(elementService.findElements).toHaveBeenCalledWith(userRequestId, {
        filter: {},
        orderBy: { notImplemented: true },
        take: 100,
        skip: 0,
      });
      expect(elementService.updateElement).toHaveBeenCalledWith(userRequestId, {
        id: 'elementId',
        tags: {
          set: [
            {
              name: 'tag1',
            },
            {
              name: 'tag2',
            },
          ],
        },
      });
    });
  });
});
