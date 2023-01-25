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
import { ApiTags } from '@nestjs/swagger';
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
