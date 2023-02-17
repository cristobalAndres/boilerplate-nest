import { Logger, Module } from '@nestjs/common';
import { WelcomeService } from './services/database/access.repository.spec';
import { WelcomeController } from './controllers/welcome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule, EnvironmentService } from '@core/environment';
import { TypeormService } from '@core/typeorm/typeorm.service';
import { Access } from '../core/entities/access/access.entity';
// import { FirebaseService } from '../core/firebase/firebase.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: TypeormService,
      inject: [EnvironmentService],
    }),
    TypeOrmModule.forFeature([Access]),
  ],
  providers: [
    WelcomeService,
    Logger,
    // FirebaseService
  ],
  controllers: [WelcomeController],
})
export class SummaryModule {}
