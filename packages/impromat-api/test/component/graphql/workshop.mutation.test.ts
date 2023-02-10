import { Test } from '@nestjs/testing';
import { WorkshopMutation } from 'src/graphql/workshop.mutation';
import { WorkshopResolver } from 'src/graphql/workshop.resolver';
import { UUID4_REGEX } from 'test/common/uuid4-regex';
import { PrismaService } from '../../../src/graphql/services/prisma.service';
import { EXISTING_USER_ID, prepareTestDatabase } from './prepare-test-database';

describe('WorkshopMutation', () => {
  let resolver: WorkshopResolver;
  let prismaService: PrismaService;
  let mutation: WorkshopMutation;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkshopResolver, WorkshopMutation],
      providers: [PrismaService],
    }).compile();

    prismaService = moduleRef.get<PrismaService>(PrismaService);
    await prepareTestDatabase(prismaService);

    resolver = moduleRef.get<WorkshopResolver>(WorkshopResolver);
    mutation = moduleRef.get<WorkshopMutation>(WorkshopMutation);
  });

  it('should add a new workshop', async () => {
    // given
    const workshopName = 'test-workshop';
    const workshopDescription = 'Test Workshop Description';

    // when
    const result = await mutation.addWorkshop(
      { name: workshopName, description: workshopDescription },
      EXISTING_USER_ID,
    );

    // then
    const { createdAt, deleted, description, id, name, updatedAt, version } =
      result;

    expect(name).toBe(workshopName);
    expect(description).toBe(workshopDescription);

    expect(id).toMatch(UUID4_REGEX);
    expect(version).toBe(0);
    expect(createdAt.getTime()).toBeGreaterThan(Date.now() - 1000);
    expect(updatedAt.getTime()).toBeGreaterThan(Date.now() - 1000);
    expect(deleted).toBe(false);
  });

  it('should add a new workshop without a description', async () => {
    // given
    const workshopName = 'test-workshop';

    // when
    const result = await mutation.addWorkshop(
      { name: workshopName, description: undefined },
      EXISTING_USER_ID,
    );

    // then
    expect(result.description).toBeNull();
  });
});
