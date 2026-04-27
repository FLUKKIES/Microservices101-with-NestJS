import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private userDatabase: any[] = [
    {
      id: 1,
      name: "Admin User",
      username: "admin",
      email: "email@email.com",
      role: "admin"
    }
  ]

  async getUserProfile(userId: string) {
    return this.userDatabase.find((user) => user.id == userId);
  }
}
