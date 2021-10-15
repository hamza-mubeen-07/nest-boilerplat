import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let server: { close: (arg0: (err: any) => void) => void };

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  server = await app.listen(process.env.PORT);
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  console.log(
    'User service is running on Port: 0.0.0.0:' + process.env.USERS_PORT,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Handle process kill signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

function shutdown() {
  server.close((err) => {
    if (err) {
      console.error(
        'An error occurred while closing the server. Forecefullly shutting down',
      );
      console.error(err);
      process.exit(1);
    }
    console.log('Http server closed.');
    process.exit(0);
  });
}

bootstrap();
