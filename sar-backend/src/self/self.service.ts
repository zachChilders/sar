import { Injectable } from '@nestjs/common';
import { UpdateSelfDto } from './dto/update-self.dto';
import { PrismaService } from 'src/integrations/prisma/prisma.service';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';
import { unreachable } from 'src/platform/guards.util';
import { Self } from './entities/self.entity';

@Injectable()
export class SelfService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth0: Auth0Service,
  ) {}

  async findOne(memberId: number): Promise<Self> {
    return await this.prisma.member.findUniqueOrThrow({
      where: { id: memberId },
    });
  }

  async update(memberId: number, dto: UpdateSelfDto): Promise<void> {
    await this.prisma.$transaction(async (trx) => {
      const user = await trx.member.findUniqueOrThrow({
        where: { id: memberId },
      });
      if (!user.auth0Id) {
        throw new Error('User does not have an Auth0 ID');
      }

      if (dto.email) {
        await this.auth0.updateUser(user.auth0Id, dto.email);
      }

      await trx.member.update({
        where: { id: memberId },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          phoneHome: dto.phone,
        },
      });
    });
  }

  async resetPassword(memberId: number): Promise<void> {
    const { auth0Id } = await this.prisma.member.findUniqueOrThrow({
      where: { id: memberId },
    });

    if (!auth0Id) return unreachable("User doesn't have an Auth0 ID");

    await this.auth0.resetPassword(auth0Id);
  }
}
