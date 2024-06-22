import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserSessionData } from 'src/auth/user-session-data';

/**
 * @deprecated Use the `loaders` context instead.
 */
export const SessionUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req: { session: { data: UserSessionData } } = ctx.getContext().req;
    return req.session?.data?.userId;
  },
);
