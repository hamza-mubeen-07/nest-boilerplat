import { Get, Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  sayHello() {
    return this.appService.sayHello();
  }

  @Get('countries')
  async fetchCountries(): Promise<any> {
    return await this.appService.fetchCountries();
  }

  @Get('api_call')
  async make_api_call(): Promise<any> {
    return await this.appService.fetchSingleCountry();
  }
}
