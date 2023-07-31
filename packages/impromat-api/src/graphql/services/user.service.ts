import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { ABILITY_ACTION_READ, defineAbilityForUser } from '../abilities';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async updateUser(
    userRequestId: string | undefined,
    updateUserInput: UpdateUserInput,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_READ).User,
          { id: userRequestId },
        ],
      },
    });
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
