import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SessionData } from './session-data';

@Injectable()
export class GraphQLAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req: { session: { data: SessionData } } = ctx.getContext().req;
    return (
      req !== undefined &&
      req.session !== undefined &&
      req.session.data !== undefined &&
      req.session.data.userId !== undefined
    );
  }
}
