import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

@Injectable()
export class ElementService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findElementById(userRequestId: string, id: string) {
    return this.prismaService.element.findFirstOrThrow({
      where: {
        OR: [
          { ownerId: userRequestId, id },
          { id, visibility: 'PUBLIC' },
        ],
      },
    });
  }

  findElementsFromUser(userRequestId: string) {
    return this.prismaService.user
      .findFirstOrThrow({
        where: { id: userRequestId },
      })
      .elements();
  }

  async createElement(
    userRequestId: string,
    createElementInput: CreateElementInput,
  ) {
    const [, element] = await this.prismaService.$transaction([
      this.prismaService.user.findUniqueOrThrow({
        where: { id: userRequestId },
      }),
      this.prismaService.element.create({
        data: {
          ...createElementInput,
          ownerId: userRequestId,
        },
      }),
    ]);
    return element;
  }

  async updateElement(
    userRequestId: string,
    updateElementInput: UpdateElementInput,
  ) {
    const existing = await this.prismaService.element.findFirstOrThrow({
      where: { id: updateElementInput.id, ownerId: userRequestId },
    });
    if (!existing) throw new Error('Not existing or not owner.');

    return this.prismaService.element.update({
      where: { id: updateElementInput.id },
      data: updateElementInput,
    });
  }
}
