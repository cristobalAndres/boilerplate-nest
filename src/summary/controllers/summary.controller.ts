import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestOptionsDTO } from '../dto/request-options.dto';
import { SummaryReponseDTO } from '../dto/summary-response.dto';
import { SummaryService } from '../services/summary.service';

@ApiTags('Get summary')
@Controller('summary')
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
      this.logger.error(`Error getting accounts: ${error.message}`);
      throw new HttpException(
        { statusCode: 500, message: 'test message error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
