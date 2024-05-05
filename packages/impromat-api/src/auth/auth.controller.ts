import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { sign } from 'cookie-signature';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { environment } from 'src/environment';
import { PrismaService } from 'src/modules/database/prisma.service';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';
import { parseLoginState } from './parse-login-state';
import { UserSessionData } from './user-session-data';

@Controller('auth')
export class AuthController {
  constructor(
    private googleOAuth2ClientService: GoogleOAuth2ClientService,
    private prismaService: PrismaService,
  ) {}

  /**
   * Allows access via access tokens.
   *
   * @param signInBody
   * @param req
   * @param res
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInWithAccessToken(
    @Body() signInBody: { name: string; accessToken: string },
    @Req() req: Request & { session: Session & { data: UserSessionData } },
    @Res() res: Response,
  ) {
    const dbUser = await this.prismaService.user.findFirstOrThrow({
      where: { name: signInBody.name, accessToken: signInBody.accessToken },
    });

    req.session.data = { userId: dbUser.id };
    req.session.save(() => {
      const signedSession = sign(req.session.id, environment.SESSION_SECRET);
      res.send(JSON.stringify({ Cookie: `connect.sid=s:${signedSession}` }));
    });
  }

  @Get('google/callback')
  async callback(
    @Req() req: Request & { session: Session & { data: UserSessionData } },
    @Res() res: Response,
  ) {
    const code = req.query.code as string;
    const state = req.query.state as string;

    const oAuth2Client = this.googleOAuth2ClientService.getOAuth2Client();
    const javascriptOrigin =
      this.googleOAuth2ClientService.getRedirectUrlAfterAuthentication();
    if (code) {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      if (!tokens.access_token) {
        throw new Error('Access token is null.');
      }

      const { sub: userGoogleId } = await oAuth2Client.getTokenInfo(
        tokens.access_token,
      );

      if (!userGoogleId) {
        res.status(500);
        res.send('Token information incomplete.');
        console.error('Token information incomplete.');
        return;
      }

      const user = await this.prismaService.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { googleSubscriptionId: userGoogleId },
        });
        if (user) return user;
        // first time login
        return await tx.user.create({
          data: {
            googleSubscriptionId: userGoogleId,
            languageCodes: ['en', 'de'],
          },
        });
      });

      req.session.data = { userId: user.id };
      if (!javascriptOrigin) {
        console.error('No javascript origin found.');
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const parsedState = parseLoginState(state);
      const redirectUrlWithState = new URL(javascriptOrigin);
      redirectUrlWithState.pathname = parsedState?.pathAfterLogin ?? '';
      if (state) redirectUrlWithState.searchParams.set('state', state);
      console.log(`Redirecting to ${redirectUrlWithState}`);
      res.redirect(redirectUrlWithState.toString());
    } else {
      res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  }
}
