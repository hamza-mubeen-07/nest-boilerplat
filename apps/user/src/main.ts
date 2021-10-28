import { UserModule } from './user.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { GlobalExceptionsFilter } from '../../../common/interceptors/global.interceptor';
import {
  ORIGIN_SITE,
  ORIGIN_DASHBOARD,
  REQUEST_BODY_SIZE,
  SERVER_PORT,
} from './user.constants';
import { PrismaService } from '../../../prisma/prisma.service';

// INFO: Don't remove, will be used later
// import * as hbs from 'hbs';
// import { join } from 'path';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(UserModule);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.use(json({ limit: REQUEST_BODY_SIZE }));
  app.use(urlencoded({ limit: REQUEST_BODY_SIZE, extended: true }));
  app.enableCors({
    origin: [ORIGIN_SITE, ORIGIN_DASHBOARD],
    credentials: true,
  });

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // INFO: Don't remove, will be used later
  // hbs.registerPartials(join(__dirname, '..', 'templates'));
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  console.log(`User service on port: 0.0.0.0:${SERVER_PORT}`);
  await app.listen(SERVER_PORT);
})();
