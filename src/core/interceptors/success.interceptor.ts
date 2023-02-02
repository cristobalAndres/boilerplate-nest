import { SuccessResponseDto } from '@core/dto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `Success response path ${context.getArgByIndex(0).path}`,
            { data },
          ),
        ),
      )
      .pipe(
        map(
          (data) =>
            ({
              data,
              statusCode: context.getArgByIndex(1).statusCode,
            } as SuccessResponseDto),
        ),
      );
  }
}
