import { Context, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { environment } from 'src/environment';

@Resolver()
export class TestGoogleAuthUrlResolver {
  @Query(() => String)
  googleAuthUrl(@Context() context: any): string {
    const req = context.req as Request;
    console.log(req.headers.host);
    return `http://localhost:${environment.PORT}/auth/testlogin?redirectUrl=${req.headers.referer}`;
  }
}
