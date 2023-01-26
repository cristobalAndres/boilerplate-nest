import { ApiResponseProperty } from '@nestjs/swagger';

export class SummaryReponseDTO {
  @ApiResponseProperty({
    type: String,
    example: 'ad438cx0xayo03d',
  })
  id: string;
  @ApiResponseProperty({
    type: String,
    example: 't3',
  })
  category: string;
  @ApiResponseProperty({
    type: String,
    example: '99999999-0',
  })
  nationalId: string;
  @ApiResponseProperty({
    type: String,
    example: 'fu39kdñoa8jf9j',
  })
  ownerType: string;
  @ApiResponseProperty({
    type: Number,
    example: 1500,
  })
  firstBalance: number;
  @ApiResponseProperty({
    type: Number,
    example: 4000,
  })
  lastBalance: number;
  @ApiResponseProperty({
    type: Number,
    example: 2500,
  })
  totalDeposits: number;
  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  totalWithdraws: number;
  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  totalPayments: number;
  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  totalRefunds: number;
}
