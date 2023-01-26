import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class RequestOptionsDTO {
  @ApiProperty({
    type: String,
    description: 'Fecha de procesamiento cartola',
    required: true,
    example: '2023-01-31',
  })
  @IsDateString()
  @IsNotEmpty()
  processDate: Date;

  @ApiProperty({
    type: String,
    description: 'accountId del los datos a procesar',
    required: true,
    example: 'ad438cx0xayo03d',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
