import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { environment } from '../environment';

@Injectable()
export class GoogleOAuth2ClientService {
  private oAuth2Client: OAuth2Client | undefined;
  private javascriptOrigin: string | undefined;
  private googleAuthUrl: string | undefined;

  constructor() {
    this.oAuth2Client = this.createNewOAuth2Client();
    this.googleAuthUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/userinfo.email'],
    });
    const OAuth2Data = this.loadOAuthConfiguration();
    this.javascriptOrigin = OAuth2Data.web.javascript_origins[0];
    console.log('GoogleOAuth2ClientService instantiated');
  }

  getOAuth2Client() {
    return this.oAuth2Client;
  }

  getGoogleAuthUrl() {
    return this.googleAuthUrl;
  }

  getRedirectUrlAfterAuthentication() {
    return this.javascriptOrigin;
  }

  private loadOAuthConfiguration() {
    return JSON.parse(
      fs.readFileSync(environment.GOOGLE_AUTH_JSON_PATH).toString(),
    );
  }

  private createNewOAuth2Client() {
    if (fs.existsSync(environment.GOOGLE_AUTH_JSON_PATH)) {
      console.log(
        `Retrieving Google auth from JSON path ${environment.GOOGLE_AUTH_JSON_PATH}`,
      );
      const OAuth2Data = this.loadOAuthConfiguration();
      const CLIENT_ID = OAuth2Data.web.client_id;
      const CLIENT_SECRET = OAuth2Data.web.client_secret;
      const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];
      return new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    }

    console.log(
      `No Google authentication file at ${environment.GOOGLE_AUTH_JSON_PATH} found.`,
    );
    console.log('Retrieving Google auth from environment variables');
    const CLIENT_ID = environment.GOOGLE_AUTH_CLIENT_ID;
    const CLIENT_SECRET = environment.GOOGLE_AUTH_CLIENT_SECRET;
    const REDIRECT_URL = environment.GOOGLE_AUTH_REDIRECT_URL;
    return new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  }
}
