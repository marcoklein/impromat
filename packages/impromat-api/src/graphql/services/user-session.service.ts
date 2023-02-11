import { Inject } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { PrismaService } from './prisma.service';

export class UserSessionService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getActiveUser() {}
}
