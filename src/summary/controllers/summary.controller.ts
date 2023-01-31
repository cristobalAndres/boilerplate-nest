import { HttpExceptionFilter } from '@core/filters';
import { SuccessInterceptor } from '@core/interceptors';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
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
@Controller('product-processing')
@UseInterceptors(SuccessInterceptor)
@UseFilters(new HttpExceptionFilter())
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
  @Get('request')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: RequestOptionsDTO): Promise<SummaryReponseDTO> {
    try {
      this.logger.log(
        `[${SummaryController.name}: ${this.findAll.name}] init with query`,
        {
          query,
        },
      );
      let summary = null;
      const hasMovements = await this.summaryService.hasMovements(query);
      this.logger.log(
        `[${SummaryController.name}: ${this.findAll.name}] account has movements: ${hasMovements}`,
        { hasMovements },
      );
      if (hasMovements) {
        summary = await this.summaryService.getSummary(query);
        this.logger.log(
          `[${SummaryController.name}: ${this.findAll.name}] get summary`,
          { summary },
        );
      } else {
        summary = await this.summaryService.getLastMovement(query);
        this.logger.log(
          `[${SummaryController.name}: ${this.findAll.name}] get last movement`,
          { summary },
        );
      }
      if (summary instanceof Array) return summary[0];
      return summary;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
