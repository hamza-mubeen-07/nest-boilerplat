import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  console.log(
    'Auth service is running on Port: 0.0.0.0:' + process.env.AUTH_PORT,
  );
  await app.listen(process.env.AUTH_PORT);
}
bootstrap();
