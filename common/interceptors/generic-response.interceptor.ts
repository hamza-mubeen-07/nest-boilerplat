import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  response: T;
  error: boolean;
}

@Injectable()
export class GenericResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    if (request.url.includes('sse')) {
      return next.handle();
    } else {
      return next.handle().pipe(
        map((data) => {
          return { response: data, error: false, message: '' };
        }),
      );
    }
  }
}
