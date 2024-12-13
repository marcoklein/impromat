import { Test, TestingModule } from '@nestjs/testing';
import { DataloaderService } from './dataloader.service';

describe('DataloaderService', () => {
  let service: DataloaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataloaderService],
    }).compile();

    service = module.get<DataloaderService>(DataloaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
