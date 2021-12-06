import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  sayHello() {
    return {
      message: 'Hello user!',
      time: Date.now().toString(),
    };
  }

  /**
   * Example cron function of 1 minute
   * See "https://crontab.cronhub.io"
   */
  @Cron('* * * * *')
  private async checkServiceHealth(): Promise<void> {
    console.info('Test cron is running every minute.');
  }
}
