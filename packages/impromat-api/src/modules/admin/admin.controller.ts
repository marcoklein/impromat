import { Inject, UseGuards } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { AdminService } from './admin.service';

@UseGuards(GraphqlAuthGuard)
export class AdminController {
  constructor(@Inject(AdminService) private adminService: AdminService) {}

  @Mutation(() => Number, {
    description: 'Iterates over all elements and applies tag mappings.',
  })
  async applyAllTagMappings(
    @SessionUserId() sessionUserId: string,
  ): Promise<number> {
    const totalCount = await this.adminService.applyAllTagMappings(
      sessionUserId,
    );
    return totalCount;
  }

  @Mutation(() => Number, {
    description: 'Iterates over all elements and creates summaries.',
  })
  async createAllSummaries(
    @SessionUserId() sessionUserId: string,
  ): Promise<number> {
    const totalCount = await this.adminService.createAllSummaries(
      sessionUserId,
    );
    return totalCount;
  }
}
