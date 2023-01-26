import { HttpExeptionFilter } from '@core/filters';
import { SuccessInterceptor } from '@core/interceptors';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestOptionsDTO } from '../dto/request-options.dto';
import { SummaryReponseDTO } from '../dto/summary-response.dto';
import { SummaryService } from '../services/summary.service';

@ApiTags('Get summary')
@Controller('summary')
@UseInterceptors(SuccessInterceptor)
@UseFilters(new HttpExeptionFilter())
export class SummaryController {
  constructor(
    private summaryService: SummaryService,
    private readonly logger: Logger,
  ) {}

  @ApiOkResponse({
    schema: {
      example: {
        statusCode: HttpStatus.OK,
        data: {
          id: 'ad438cx0xayo03d',
          category: 't3',
          nationalId: '99999999-0',
          ownerType: 'fu39kdñoa8jf9j',
          firstBalance: 1500,
          lastBalance: 4000,
          totalDeposits: 2500,
          totalWithdraws: 0,
          totalPayments: 0,
          totalRefunds: 0,
        },
      },
    },
  })
  @ApiInternalServerErrorResponse()
  @Post()
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() body: RequestOptionsDTO): Promise<SummaryReponseDTO> {
    try {
      const summary = await this.summaryService.getSummary(body);
      if (summary instanceof Array) return summary[0];
      return summary;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
