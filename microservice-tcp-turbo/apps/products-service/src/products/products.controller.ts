import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    @MessagePattern('products.findOne')
    findOne(id: number) {
        return { id, name: "Laptop", price: 1000 }
    }

    @EventPattern("orders.created")
    async updateStock(order: {id: number, productId: number}) {
        console.log("Checking stock for the product: ", order.productId);

        console.log("Stock Updated");
    }
}
