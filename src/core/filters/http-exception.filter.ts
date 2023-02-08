import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const description = exception.name;
    const cause = exception.cause || exception;
    const res = {
      path: request.url,
      message,
      description,
      cause,
    };
    this.logger.error(`HttpException response path ${res.path}`, {
      res,
    });
    response.status(status).json(res);
  }
}
