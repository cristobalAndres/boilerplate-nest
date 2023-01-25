import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class RequestOptionsDTO {
  @IsDateString()
  @IsNotEmpty()
  processDate: Date;
  @IsString()
  @IsNotEmpty()
  userId: string;
}
