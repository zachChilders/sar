import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { Member as Entity } from './entities/member.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getMembers(): Promise<Entity[]> {
    return this.accountService.getMembers();
  }
}
