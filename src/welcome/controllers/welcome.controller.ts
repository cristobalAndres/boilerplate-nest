import { HttpExceptionFilter } from '@core/filters';
import { SuccessInterceptor } from '@core/interceptors';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { WelcomeService } from '../services/welcome.service';

@ApiTags('Welcome')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller()
export class WelcomeController {
  constructor(
    private welcomeService: WelcomeService,
    private readonly logger: Logger,
  ) {}

  @ApiOkResponse({
    schema: {
      example: {
        envs: {
          NODE_ENV: 'development',
          ENABLE_SWAGGER: true,
          DB_HOST: '130.211.192.142',
          DB_PORT: 3306,
          DB_USER: 'root',
          DB_PASSWORD: 'testcloudrun01',
          DB_NAME: 'testcloud',
          DB_SOCKET_PATH: '/cloudsql/to-do-list-f325b:us-central1:testcloudrun',
        },
        data: [
          {
            id: 1,
            userId: '11111',
            createdAt: '11111',
            updatedAt: '11111',
          },
        ],
        statusCode: HttpStatus.OK,
      },
    },
  })
  @Get('welcome')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.welcomeService.findAll();
    const envs = process.env;
    const returnData = {
      envs,
      data,
    };
    this.logger.log(
      `[${WelcomeController.name}: ${this.findAll.name}] get data`,
      { returnData },
    );
    return returnData;
  }
}
