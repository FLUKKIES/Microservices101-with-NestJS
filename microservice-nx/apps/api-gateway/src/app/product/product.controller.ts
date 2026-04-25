import { PRODUCT_SERVICE_NAME, PRODUCTS_PACKAGE_NAME, ProductServiceClient } from '@myorg/types/proto/products';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('product')
export class ProductController implements OnModuleInit {

    private productService: ProductServiceClient; 

    constructor(
        @Inject(PRODUCTS_PACKAGE_NAME) private client:ClientGrpc
    ) {}

    onModuleInit() {
        this.productService = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
    }

    @Get(":id")
    findOne(@Param() params: { id: string }) {
        return this.productService.getProduct({ productId: +params.id })
    }


}
