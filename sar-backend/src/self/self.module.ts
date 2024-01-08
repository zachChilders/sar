import { Module } from '@nestjs/common';
import { SelfService } from './self.service';
import { SelfController } from './self.controller';
import { Auth0Service } from 'src/integrations/auth0/auth0.service';

@Module({
  controllers: [SelfController],
  providers: [Auth0Service, SelfService],
})
export class SelfModule {}
