import {
  Logger,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(
          `[${ErrorInterceptor.name}: ${this.intercept.name}]: intercept error`,
          { originError: err },
        );
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: err.status || HttpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
                cause: err.cause,
                description: err.name,
              },
              err.status || HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        );
      }),
    );
  }
}
