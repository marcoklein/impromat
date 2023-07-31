import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { ABILITY_ACTION_READ, defineAbilityForUser } from '../abilities';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findUserById(userId: string | undefined) {
    const ability = defineAbilityForUser(userId);
    if (!userId) return undefined;
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
    const user = await this.findUserById(userRequestId);
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
