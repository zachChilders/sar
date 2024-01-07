import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { OperationModule } from './operation/operation.module';

@Module({
  imports: [MemberModule, OperationModule, PrismaModule],
})
export class AppModule {}
