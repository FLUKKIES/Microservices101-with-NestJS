import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject("AUTH_SERVICE") private readonly authService: ClientProxy
    ) { }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        return await firstValueFrom(this.authService.send("auth-login", body));
    }
}
