import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './environment';
import { getExpressSessionRequestHandler } from './get-express-session-request-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      //'debug',
      'verbose',
      'log',
      'warn',
      'error',
    ],
  });
  app.enableCors({ credentials: true, origin: true });
  app.enableShutdownHooks();
  app.use(getExpressSessionRequestHandler());
  await app.listen(environment.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
