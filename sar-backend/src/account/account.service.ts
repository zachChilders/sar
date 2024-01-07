import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Member as Entity } from './entities/member.entity';
import { mapMemberToEntity } from './account.mapper';
@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  getMembers = async (): Promise<Entity[]> => {
    return (await this.prisma.member.findMany()).map(mapMemberToEntity);
  };
}
