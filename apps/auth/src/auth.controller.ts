import {
  Controller,
  Get,
  Inject,
  MessageEvent,
  Sse,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { EventPattern, ClientProxy } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable, interval, map } from 'rxjs';

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

  /**
   * Hit this api to test microservice
   */
  @Get('test_ms')
  createReferral() {
    this.client.emit<{ message: string }>('test_ms', {
      message: 'Events fired!',
    });
    return { message: 'This text is also sent to microservice event.' };
  }

  /**
   * This function receives microservice event and shows sent data as well as result of a test http request.
   * @param message
   */
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

  /**
   * Example page with SSR.
   */
  @Get('ssr_example')
  root(@Res() res: Response) {
    return res.render('admin/page-one', {
      message: 'SSR, SSE and WS example',
    });
  }

  /**
   * Our SSR app listen for server responses using this path i.e. "auth/sse"
   */
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { time: new Date().toString() } } as MessageEvent)),
    );
  }
}
