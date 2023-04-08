import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { Session } from 'express-session';
import { RequestSession } from 'src/decorators/request-session.decorator';
import { SESSION_COOKIE_NAME } from 'src/get-express-session-request-handler';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(
    @Context() ctx: any,
    @RequestSession() requestSession: Session,
  ): Promise<boolean> {
    const response = ctx.res;
    if (
      'clearCookie' in response &&
      typeof response.clearCookie === 'function'
    ) {
      response.clearCookie(SESSION_COOKIE_NAME);
    }
    await new Promise<void>((resolve) => {
      requestSession.destroy(() => {
        resolve();
      });
    });
    return true;
  }
}
