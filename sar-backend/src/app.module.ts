import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { OperationModule } from './operation/operation.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      exclude: ['/sar-backend/*', '/.*'],
    }),
    MemberModule,
    OperationModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
