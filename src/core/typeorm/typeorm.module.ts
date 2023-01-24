import { Module } from '@nestjs/common';
import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [EnvironmentModule],
  providers: [EnvironmentService, ConfigService],
})
export class TypeormModule {}
