import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { sign } from 'cookie-signature';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { environment } from 'src/environment';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';
import { UserSessionData } from './user-session-data';

@Controller('auth')
export class AuthController {
  constructor(
    private googleOAuth2ClientService: GoogleOAuth2ClientService,
    private prismaService: PrismaService,
  ) {}

  @Get('google/callback')
  async callback(
    @Req() req: Request & { session: Session & { data: UserSessionData } },
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
        tokens.access_token!,
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
          data: { googleSubscriptionId: userGoogleId },
        });
      });

      req.session.data = { userId: user.id };
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

  @Get('testlogin')
  async testLogin(
    @Query() { redirectUrl }: { redirectUrl: string | undefined },
    @Req() req: Request & { session: Session & { data: UserSessionData } },
    @Res() res: Response,
  ) {
    const userGoogleId = 'test-user-id';

    const user = await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { googleSubscriptionId: userGoogleId },
      });
      if (user) return user;
      // first time login
      return await tx.user.create({
        data: { googleSubscriptionId: userGoogleId },
      });
    });

    req.session.data = { userId: user.id };
    if (redirectUrl) {
      res.redirect(redirectUrl);
    } else {
      req.session.save(() => {
        const signedSession = sign(req.session.id, environment.SESSION_SECRET);
        res.send(signedSession);
      });
    }
  }
}
