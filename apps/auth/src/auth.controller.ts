import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private httpService: HttpService,
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
    console.info(`Microservice: ${message}`);
    console.info(
      `Test API response: `,
      (
        await this.testApiCall(
          `https://prod-status-backend.polinate.io/health-check/get-services`,
        )
      ).data,
    );
  }

  testApiCall(url) {
    return firstValueFrom(this.httpService.get(url)).catch(() => null);
  }
}
