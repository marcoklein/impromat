import { INestApplication } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserSessionData } from 'src/auth/user-session-data';

export function injectTestUserSessionMiddleware(app: INestApplication) {
  let userIdToImpersonate: string | undefined;
  function impersonateUser(userId: string | undefined) {
    userIdToImpersonate = userId;
  }

  app.use(
    (
      req: Request & { session: { data: UserSessionData } },
      res: Response,
      next: NextFunction,
    ) => {
      if (userIdToImpersonate) {
        req.session = { data: { userId: userIdToImpersonate } };
      }
      next();
    },
  );
  return impersonateUser;
}
