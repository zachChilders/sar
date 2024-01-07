import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AccountModule, PrismaModule],
})
export class AppModule {}
