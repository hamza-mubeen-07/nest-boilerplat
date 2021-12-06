import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('NATS_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  sayHello() {
    return this.authService.sayHello();
  }

  @Get('test_ms')
  createReferral() {
    this.client.emit<{ message: string }>('test_ms', {
      message: 'Events fired!',
    });
    return { message: 'This text is also sent to microservice event.' };
  }

  @EventPattern('test_ms')
  async linkReferral({ message }): Promise<void> {
    console.log(`Microservice: ${message}`);
  }
}
