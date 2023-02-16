import { Module } from '@nestjs/common';
import { SummaryModule } from './welcome';

@Module({
  imports: [SummaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
