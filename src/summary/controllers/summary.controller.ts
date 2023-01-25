import { ErrorInterceptor, SuccessInterceptor } from '@core/interceptors';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestOptionsDTO } from '../dto/request-options.dto';
import { SummaryReponseDTO } from '../dto/summary-response.dto';
import { SummaryService } from '../services/summary.service';

@ApiTags('Get summary')
@Controller('summary')
@UseInterceptors(ErrorInterceptor, SuccessInterceptor)
export class SummaryController {
  constructor(
    private summaryService: SummaryService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() body: RequestOptionsDTO): Promise<SummaryReponseDTO> {
    const summary = await this.summaryService.getSummary(body);
    if (summary instanceof Array) return summary[0];
    return summary;
  }
}
