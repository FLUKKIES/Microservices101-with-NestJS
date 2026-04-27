import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("auth-login")
  login(@Payload() credentials: {username: string, password: string}) {
    return this.appService.login(credentials);
  }

  @MessagePattern("auth-validate")
  validateToken(@Payload() token: string) {
    return this.appService.validateToken(token);
  }
}
