import { Context, Query, Resolver } from '@nestjs/graphql';
import { environment } from 'src/environment';

@Resolver()
export class TestGoogleAuthUrlResolver {
  @Query(() => String)
  googleAuthUrl(@Context() context: any): string {
    // const req = context.req as Request;
    // return `http://localhost:${environment.PORT}/auth/testlogin?redirectUrl=${req.headers.referer}`;
    return environment.TEST_GOOGLE_AUTH_URL;
  }
}
