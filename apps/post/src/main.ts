import { PostModule } from './post.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { GenericExceptionFilter } from '../../../common/interceptors/generic-exception.interceptor';
import {
  REQUEST_BODY_SIZE,
  SERVER_PORT,
  WHITE_LISTED_DOMAINS,
} from './post.constants';
import { PrismaService } from '../../../prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { GenericResponseInterceptor } from '../../../common/interceptors/generic-response.interceptor';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(PostModule);
  app.useGlobalFilters(new GenericExceptionFilter());
  app.useGlobalInterceptors(new GenericResponseInterceptor());
  app.use(json({ limit: REQUEST_BODY_SIZE }));
  app.use(urlencoded({ limit: REQUEST_BODY_SIZE, extended: true }));
  app.enableCors({
    origin: WHITE_LISTED_DOMAINS.split(','),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  console.log(`Post service on port: 0.0.0.0:${SERVER_PORT}`);
  await app.listen(SERVER_PORT);
})();
