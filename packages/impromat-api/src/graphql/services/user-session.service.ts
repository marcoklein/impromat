import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT, GqlExecutionContext } from '@nestjs/graphql';
import { UserSessionData } from 'src/auth/user-session-data';

@Injectable({ scope: Scope.REQUEST })
export class UserSessionService {
  constructor(@Inject(CONTEXT) private context: GqlExecutionContext) {}

  getActiveUserId() {
    const req: { session: { data: UserSessionData } } =
      this.context.getContext().req;
    return req.session.data.userId;
  }
}
