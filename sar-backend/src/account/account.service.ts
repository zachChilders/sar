import { Member } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/integrations/prisma/prisma.service';
@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): Promise<Member[]> {
    return this.prisma.member.findMany();
  }
}
