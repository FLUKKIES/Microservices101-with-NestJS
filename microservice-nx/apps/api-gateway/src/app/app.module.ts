import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_PACKAGE_NAME } from '@myorg/types/proto/products';
import { join } from 'path';
import { ProductController } from './product/product.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
        },
      },
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"]
          }
        }
      },
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 8877
        }
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 8878
        }
      }
    ]),
  ],
  controllers: [AppController, ProductController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*') // สั่งให้จับทุก HTTP Request ที่เข้ามาที่ API Gateway
  }
}
