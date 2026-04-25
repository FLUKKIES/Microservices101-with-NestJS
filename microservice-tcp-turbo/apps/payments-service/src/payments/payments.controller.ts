import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
    @MessagePattern('payments.create')
    create(order: any) {
        console.log({
            message: "Payments Created"
        })
        return {
            message: "Payment Created from Order",
            order
        }
    }
}
