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
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      // INFO: Don't remove this, will be used later
      // Sentry.captureException(exception, {
      //   extra: {
      //     url: request.url,
      //   },
      // });
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
      response.status(status).json({
        response: null,
        error: true,
        message:
          'An unknown error has occurred, we will be resolving it shortly.',
      });
    } else {
      response.status(status).json({
        response: null,
        error: true,
        message:
          exception instanceof Error
            ? exception.message
            : 'Unknown client error!',
      });
    }
  }
}
