import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import Prisma from '@prisma/client';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import {
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findUserById(
    userRequestId: string | undefined,
    userId: string | undefined,
  ): Promise<Prisma.User | undefined | null> {
    if (!userRequestId || !userId) return undefined;
    const ability = defineAbilityForUser(userRequestId);
    return await this.prismaService.user.findFirst({
      where: {
        AND: [accessibleBy(ability, ABILITY_ACTION_READ).User, { id: userId }],
      },
    });
  }

  async updateUser(
    userRequestId: string | undefined,
    updateUserInput: UpdateUserInput,
  ) {
    const user = await this.findUserById(userRequestId, userRequestId);
    if (!user) {
      throw new Error('User not found or insufficent permissions.');
    }
    const result = await this.prismaService.user.update({
      data: {
        name: updateUserInput.name,
        languageCodes: updateUserInput.languageCodes,
      },
      where: { id: user.id },
    });
    return result;
  }
}
