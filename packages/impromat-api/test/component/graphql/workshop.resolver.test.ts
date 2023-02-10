import { Test } from '@nestjs/testing';
import { WorkshopResolver } from 'src/graphql/workshop.resolver';
import { PrismaService } from '../../../src/graphql/services/prisma.service';
import {
  EXISTING_USER_ID,
  NON_EXISTING_USER_ID,
  prepareTestDatabase,
} from './prepare-test-database';

describe('WorkshopResolver', () => {
  let workshopResolver: WorkshopResolver;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkshopResolver],
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    workshopResolver = moduleRef.get<WorkshopResolver>(WorkshopResolver);
    await prepareTestDatabase(prismaService);
  });

  it('should return an empty list of workshops for an existing user', async () => {
    expect(await workshopResolver.userWorkshops(EXISTING_USER_ID)).toEqual([]);
  });

  it('should return undefined for a non-existing user', async () => {
    expect(
      await workshopResolver.userWorkshops(NON_EXISTING_USER_ID),
    ).toBeNull();
  });
});
