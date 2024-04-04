import { Query, Resolver } from '@nestjs/graphql';
import { environment } from 'src/environment';

@Resolver()
export class TestGoogleAuthUrlResolver {
  @Query(() => String)
  googleAuthUrl(): string {
    return environment.TEST_GOOGLE_AUTH_URL;
  }
}
