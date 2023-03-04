import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Session } from 'express-session';
import { RequestSession } from 'src/decorators/request-session.decorator';
import { SESSION_COOKIE_NAME } from 'src/get-express-session-request-handler';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';

@Resolver()
export class AuthResolver {
  constructor(private googleOAuth2ClientService: GoogleOAuth2ClientService) {}

  @Query(() => String)
  googleAuthUrl(): string {
    // TODO make this configurable in environment
    return 'http://localhost:12345/auth/testlogin?redirectUrl=http://localhost:3003';

    //   this.context.getContext().req;
    // return req.session.data.userId;
    // return this.googleOAuth2ClientService.getGoogleAuthUrl();
  }

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
