import { subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import Prisma from '@prisma/client';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { User } from 'src/dtos/types/user.dto';
import {
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { DataLoaderContext } from '../database/dataloader-context.interface';
import { PrismaService } from '../database/prisma.service';

/**
 * Service for user related operations.
 */
@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findLikedWorkshops(userDto: User, context: DataLoaderContext) {
    return context.userLikedWorkshops.load(userDto.id);
  }

  async findUserById(
    userRequestId: string | undefined,
    userId: string | undefined,
  ): Promise<Prisma.User | undefined | null> {
    if (!userRequestId || !userId) return undefined;
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    const ability = defineAbilityForUser(userRequestId);
    if (!user || !ability.can(ABILITY_ACTION_READ, subject('User', user)))
      // TODO return NotFoundError / NotAuthorizedError
      return null;
    return user;
  }

  async updateUser(
    userRequestId: string | undefined,
    updateUserInput: UpdateUserInput,
  ) {
    const user = await this.findUserById(userRequestId, userRequestId);
    if (!user) {
      throw new Error('User not found or insufficient permissions.');
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
