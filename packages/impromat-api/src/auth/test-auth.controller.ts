import {
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { sign } from 'cookie-signature';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { environment } from 'src/environment';
import { PrismaService } from 'src/modules/database/prisma.service';
import { UserSessionData } from './user-session-data';

/**
 * Injected for mocking the login procedure. Used for testing and local development purposes.
 */
@Controller('auth')
export class TestAuthController {
  constructor(private prismaService: PrismaService) {}

  @Get('testlogin')
  async testLogin(
    @Query()
    { redirectUrl, userId }: { userId; redirectUrl: string | undefined },
    @Req() req: Request & { session: Session & { data: UserSessionData } },
    @Res() res: Response,
  ) {
    if (process.env.NODE_ENV === 'production' || !environment.ENABLE_TESTLOGIN)
      throw new NotFoundException();
    const userGoogleId = userId ?? 'test-user-id';

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
