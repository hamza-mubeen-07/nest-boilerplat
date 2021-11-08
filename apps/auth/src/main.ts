import { AuthModule } from './auth.module';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { GlobalExceptionsFilter } from '../../../common/interceptors/global.interceptor';
import {
  AUTH_SECRET,
  ORIGIN_SITE,
  ORIGIN_DASHBOARD,
  REQUEST_BODY_SIZE,
  SERVER_PORT,
} from './auth.constants';

(async () => {
  // TODO: Init sentry here, log calls in global.interceptor.ts
  const app = await NestFactory.create(AuthModule);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.use(json({ limit: REQUEST_BODY_SIZE }));
  app.use(urlencoded({ limit: REQUEST_BODY_SIZE, extended: true }));
  app.enableCors({
    origin: [ORIGIN_SITE, ORIGIN_DASHBOARD],
    credentials: true,
  });
  app.use(cookieParser(AUTH_SECRET));

  console.log(`Auth service on port: 0.0.0.0:${SERVER_PORT}`);
  await app.listen(SERVER_PORT);
})();
