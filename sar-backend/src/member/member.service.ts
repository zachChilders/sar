import { Injectable } from '@nestjs/common';
import { Member as Entity } from './entities/member.entity';
import { mapMemberToEntity } from './member.mapper';
import { PrismaService } from 'src/integrations/prisma/prisma.service';
@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  getMembers = async (): Promise<Entity[]> => {
    return (await this.prisma.member.findMany()).map(mapMemberToEntity);
  };
}
