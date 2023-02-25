import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Session } from 'express-session';
import { UserSessionData } from 'src/auth/user-session-data';

export const RequestSession = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req: { session: Session & { data: UserSessionData } } =
      ctx.getContext().req;
    return req.session;
  },
);
