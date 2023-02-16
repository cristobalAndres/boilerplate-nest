import { Logger, Module } from '@nestjs/common';
import { WelcomeService } from './services/database/welcome.service';
import { WelcomeController } from './controllers/welcome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { TypeormService } from '@core/typeorm/typeorm.service';
import { Access } from '../core/entities/access/access.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: TypeormService,
      inject: [EnvironmentService],
    }),
    TypeOrmModule.forFeature([Access]),
  ],
  providers: [WelcomeService, Logger],
  controllers: [WelcomeController],
})
export class SummaryModule {}
