import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject("AUTH_SERVICE") private readonly authClient: ClientProxy) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const authHeader = req.header('authorization');
    if (!authHeader) throw new UnauthorizedException("No token provided");
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException("No token provided");

    const result = await firstValueFrom(this.authClient.send('auth-validate', token));
    if (!result.valid) throw new UnauthorizedException("Invalid token");

    req.user = { userId: result.userId, role: result.role };

    return true;
  }
}
