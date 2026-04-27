import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(
        @Inject("USER_SERVICE") private readonly userService: ClientProxy
    ) { }

    @UseGuards(AuthGuard)
    @Get()
    async getProfile(@Req() req: any) {
        const userId = req.user.userId;
        const result = await firstValueFrom(this.userService.send("get-user-profile", userId));
        return result;
    }
}
