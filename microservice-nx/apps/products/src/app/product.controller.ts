import { Controller } from '@nestjs/common';
import { ProductRequest, ProductResponse, ProductServiceController, ProductServiceControllerMethods } from '@myorg/types/proto/products';
import { Observable } from 'rxjs';

@Controller('product')
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
    getProduct(request: ProductRequest): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
        return {
            productId: request.productId,
            name: "Laptop",
            price: 1000
        }
    }
}
