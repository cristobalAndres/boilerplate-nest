/* eslint-disable @typescript-eslint/ban-types */
import { ApiResponseProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiResponseProperty()
  data: any;
  @ApiResponseProperty({
    type: Number,
  })
  statusCode: number;
}
