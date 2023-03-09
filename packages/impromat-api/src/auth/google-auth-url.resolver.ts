import { Query, Resolver } from '@nestjs/graphql';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';

@Resolver()
export class GoogleAuthUrlResolver {
  constructor(private googleOAuth2ClientService: GoogleOAuth2ClientService) {}

  @Query(() => String)
  googleAuthUrl(): string {
    return this.googleOAuth2ClientService.getGoogleAuthUrl();
  }
}
