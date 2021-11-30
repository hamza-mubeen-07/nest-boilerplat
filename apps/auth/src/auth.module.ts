import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { APP_NATS_QUEUE, MS_INTERNAL_PORT, NATS_URL } from './auth.constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        options: {
          url: NATS_URL,
          queue: APP_NATS_QUEUE,
          port: MS_INTERNAL_PORT,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
