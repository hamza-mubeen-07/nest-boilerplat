import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// INFO: Don't remove this, will be used later
// import * as Sentry from '@sentry/minimal';

/**
 * Handles all exceptions
 */
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      // INFO: Don't remove this, will be used later
      // Sentry.captureException(exception, {
      //   extra: {
      //     url: request.url,
      //   },
      // });
      response.status(status).json({
        message:
          'An unknown error has occurred, we will be resolving it shortly.',
      });
    } else {
      response.status(status).json({
        message: exception instanceof Error ? exception.message : '',
      });
    }
  }
}
