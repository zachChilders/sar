import { Controller, Get, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member as Entity } from './entities/member.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getMembers(): Promise<Entity[]> {
    return this.memberService.getMembers();
  }
}
