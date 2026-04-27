import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  login(credentials: { username: string, password: string }) {
    const user: any = { username: "admin", password: "password" };
    if (user.username == credentials.username && user.password == credentials.password) {
      const payload = {
        sub: 1,
        username: user.username,
        role: "admin"
      }
      const token = this.jwtService.sign(payload);
      return { token };
    }
    throw new UnauthorizedException("Invalid credentials")
  }

  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch {
      return { valid: false, userId: null, role: null }
    }
  }
}
