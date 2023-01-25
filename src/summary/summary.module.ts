import { Logger, Module } from '@nestjs/common';
import { SummaryService } from './services/summary.service';
import { SummaryController } from './controllers/summary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { TypeormService } from '@core/typeorm/typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: TypeormService,
      inject: [EnvironmentService],
    }),
  ],
  providers: [SummaryService, Logger],
  controllers: [SummaryController],
})
export class SummaryModule {}
