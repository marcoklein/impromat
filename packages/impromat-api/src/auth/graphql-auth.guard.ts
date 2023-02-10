import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserSessionData } from './user-session-data';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req: { session: { data: UserSessionData } } = ctx.getContext().req;
    return (
      req !== undefined &&
      req.session !== undefined &&
      req.session.data !== undefined &&
      req.session.data.userId !== undefined
    );
  }
}
