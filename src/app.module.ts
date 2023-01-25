import { Module } from '@nestjs/common';
import { SummaryModule } from './summary';

@Module({
  imports: [SummaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
