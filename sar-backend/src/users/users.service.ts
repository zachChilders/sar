import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        memberId: 1,
        email,
        password: hashedPassword,
      },
    });
  }
}
