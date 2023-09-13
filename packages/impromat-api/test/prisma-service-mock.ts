import { beforeEach } from 'bun:test';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaService } from 'src/graphql/services/prisma.service';

export const prismaMock = mockDeep(PrismaService);

beforeEach(() => {
  mockReset(prismaMock);
});

export const PrismaServiceMockProvider = {
  provide: PrismaService,
  useValue: prismaMock,
};

export type PrismaServiceMock = DeepMockProxy<PrismaService>;
