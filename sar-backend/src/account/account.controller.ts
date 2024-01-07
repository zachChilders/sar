import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';
import { Member } from '@prisma/client';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getMembers(): Promise<Member[]> {
    return this.accountService.getHello();
  }
}
