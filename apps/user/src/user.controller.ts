import { Get, Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  sayHello() {
    return this.userService.sayHello();
  }

  @Get('countries')
  async fetchCountries(): Promise<any> {
    return await this.userService.fetchCountries();
  }

  @Get('api_call')
  async make_api_call(): Promise<any> {
    return await this.userService.fetchSingleCountry();
  }
}
