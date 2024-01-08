import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { OperationModule } from './operation/operation.module';
import { PrismaModule } from './integrations/prisma/prisma.module';
import { SelfModule } from './self/self.module';
import { AuthModule } from './platform/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MemberModule,
    OperationModule,
    PrismaModule,
    SelfModule,
  ],
})
export class AppModule {}
