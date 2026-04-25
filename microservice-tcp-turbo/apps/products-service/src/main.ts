import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const tcpMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: "127.0.0.1",
        port: 4002
      }
    }
  );

  const redisMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: "127.0.0.1",
        port: 6379
      }
    }
  )

  await Promise.all([
    tcpMicroservice.listen(),
    redisMicroservice.listen()
  ])
  console.log("Products Microservice is running on port 4002,\nListen to redis events")
}
bootstrap();
