import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';
import { SessionData } from './session-data';

@Controller('auth')
export class AuthController {
  constructor(private googleOAuth2ClientService: GoogleOAuth2ClientService) {}

  @Get('google/callback')
  async callback(
    @Req() req: Request & { session: Session & { data: SessionData } },
    @Res() res: Response,
  ) {
    const code = req.query.code as string;
    const oAuth2Client = this.googleOAuth2ClientService.getOAuth2Client();
    const javascriptOrigin =
      this.googleOAuth2ClientService.getRedirectUrlAfterAuthentication();
    if (code) {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      const { sub: userGoogleId } = await oAuth2Client.getTokenInfo(
        tokens.access_token,
      );

      if (!userGoogleId) {
        res.status(500);
        res.send('Token information incomplete.');
        console.error('Token information incomplete.');
        return;
      }
      req.session.data = { userId: userGoogleId };
      if (!javascriptOrigin) {
        console.error('No javascript origin found.');
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      console.log(`Redirecting to ${javascriptOrigin}`);
      res.redirect(javascriptOrigin);
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }
}
