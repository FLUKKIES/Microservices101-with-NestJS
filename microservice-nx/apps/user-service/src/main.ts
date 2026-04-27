/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 8878,
      tlsOptions: {
        key: readFileSync(join(__dirname, "certs", "server.key")), 
        cert: readFileSync(join(__dirname, "certs", "server.crt")), 
        ca: readFileSync(join(__dirname, "certs", "ca.crt")), 
        requestCert: true,
        rejectUnauthorized: true,
      }
    }
  })
  await app.listen();
  Logger.log(
    `🚀 User Service is running on: http://localhost:8878`,
  );
}

bootstrap();
