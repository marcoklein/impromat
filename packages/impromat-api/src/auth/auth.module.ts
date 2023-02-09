import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolvers';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthResolver, GoogleOAuth2ClientService],
  exports: [],
})
export class AuthModule {}
