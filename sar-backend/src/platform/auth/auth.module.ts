import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from './auth0.strategy';
import { Auth0Module } from 'src/integrations/auth0/auth0.module';

@Global()
@Module({
  imports: [Auth0Module, PassportModule],
  providers: [Auth0Strategy],
})
export class AuthModule {}
