import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PAYMENTS_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 4004
        }
      },
      {
        name: MICROSERVICES.PRODUCT_REDIS_CLIENT,
        transport: Transport.REDIS,
        options: {
          host: "127.0.0.1",
          port: 6379
        }
      }
    ])
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule { }
