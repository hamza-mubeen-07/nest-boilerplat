import { AuthModule } from './auth.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { GenericExceptionFilter } from '../../../common/interceptors/generic-exception.interceptor';
import { GenericResponseInterceptor } from '../../../common/interceptors/generic-response.interceptor';
import {
  AUTH_SECRET,
  REQUEST_BODY_SIZE,
  SERVER_PORT,
  WHITE_LISTED_DOMAINS,
  MS_INTERNAL_PORT,
  NATS_URL,
  APP_NATS_QUEUE,
} from './auth.constants';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AuthModule);

  app.useGlobalFilters(new GenericExceptionFilter());
  app.useGlobalInterceptors(new GenericResponseInterceptor());
  app.use(json({ limit: REQUEST_BODY_SIZE }));
  app.use(urlencoded({ limit: REQUEST_BODY_SIZE, extended: true }));
  app.enableCors({
    origin: WHITE_LISTED_DOMAINS.split(','),
    credentials: true,
  });
  app.use(cookieParser(AUTH_SECRET));
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        url: NATS_URL,
        queue: APP_NATS_QUEUE,
        port: MS_INTERNAL_PORT,
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();

  console.log(`Auth service on port: 0.0.0.0:${SERVER_PORT}`);
  await app.listen(SERVER_PORT);
})();
