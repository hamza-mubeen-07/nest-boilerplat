import { Injectable, HttpService } from '@nestjs/common';
import {
  COUNTRY_LIST_API_ENDPOINT,
  SINGLE_COUNTRY_API_ENDPOINT,
} from './user.constants';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  sayHello() {
    return {
      message: 'Hello user!',
      time: Date.now().toString(),
    };
  }

  async fetchCountries(): Promise<any> {
    const { data } = await this.httpService
      .get(COUNTRY_LIST_API_ENDPOINT)
      .toPromise();
    return data;
  }

  async fetchSingleCountry(): Promise<any> {
    const { data } = await this.httpService
      .get(SINGLE_COUNTRY_API_ENDPOINT)
      .toPromise();
    return data;
  }
}
