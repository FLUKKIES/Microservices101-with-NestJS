import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    @MessagePattern('users.findOne')
    findOne(id: number) {
        return {
            id: 1,
            username: "username1"
        }
    }
}
