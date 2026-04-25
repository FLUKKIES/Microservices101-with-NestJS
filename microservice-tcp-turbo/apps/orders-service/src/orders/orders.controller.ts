import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MICROSERVICES } from '../constants';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject("PAYMENTS_SERVICE") private paymentsService: ClientProxy,
        @Inject(MICROSERVICES.PRODUCT_REDIS_CLIENT) private productRedisClient: ClientProxy
    ) {}

    @MessagePattern('orders.create')
    async createOrder(order:any) {
        console.log({
            message: "Order received on the Order Microservice",
            order
        });

        const paymentResponse = await firstValueFrom(this.paymentsService.send("payments.create", order));

        console.log("Response from Payment Service", paymentResponse);

        this.productRedisClient.emit("orders.created", order);

        // return { message: "Order Created", order , paymentResponse};
        return this.productRedisClient.send("products.findOne", 12)
    }
}
