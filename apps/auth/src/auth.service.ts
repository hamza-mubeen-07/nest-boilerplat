import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  sayHello() {
    return {
      message: 'Hello user!',
      time: Date.now().toString(),
    };
  }
}
