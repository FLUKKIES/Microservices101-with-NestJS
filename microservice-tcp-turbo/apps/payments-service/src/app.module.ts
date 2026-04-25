import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsController } from './payments/payments.controller';

@Module({
  imports: [],
  controllers: [AppController, PaymentsController],
  providers: [AppService],
})
export class AppModule {}
