import { Module } from '@nestjs/common';
import { environment } from 'src/environment';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { AuthController } from './auth.controller';
import { GoogleAuthUrlResolver } from './google-auth-url.resolver';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';
import { LogoutResolver } from './logout.resolver';
import { TestAuthController } from './test-auth.controller';
import { TestGoogleAuthUrlResolver } from './test-google-auth-url-resolver';

@Module({
  imports: [],
  controllers: [
    AuthController,
    ...(environment.ENABLE_TESTLOGIN ? [TestAuthController] : []),
  ],
  providers: [
    GoogleOAuth2ClientService,
    PrismaService,
    environment.ENABLE_TESTLOGIN
      ? TestGoogleAuthUrlResolver
      : GoogleAuthUrlResolver,
    LogoutResolver,
  ],
  exports: [],
})
export class AuthModule {}
