import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopSectionRepositoryService } from './workshop-section-repository.service';

describe('WorkshopSectionRepositoryService', () => {
  let service: WorkshopSectionRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkshopSectionRepositoryService],
    }).compile();

    service = module.get<WorkshopSectionRepositoryService>(WorkshopSectionRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
