import { Body, Controller, Get, UseGuards, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Self } from './entities/self.entity';
import { SelfService } from './self.service';
import { UpdateSelfDto } from './dto/update-self.dto';
import { mapSelfModelToEntity } from './self.mappers';
import { AuthGuard } from 'src/platform/auth/auth.guard';
import { UserContext } from 'src/platform/auth/user.decorator';
import { User } from 'src/platform/auth/user';

@ApiTags(Self.name)
@Controller('.internal/self')
@UseGuards(AuthGuard)
export class SelfController {
  public constructor(private readonly service: SelfService) {}

  @Get()
  public async findOne(@UserContext() user: User): Promise<Self> {
    const model = await this.service.findOne(user.id);

    return mapSelfModelToEntity(model);
  }

  @Patch()
  async update(
    @UserContext() user: User,
    @Body() dto: UpdateSelfDto,
  ): Promise<void> {
    await this.service.update(user.id, dto);
  }

  @Post('reset-password')
  async resetPassword(@UserContext() user: User): Promise<void> {
    await this.service.resetPassword(user.id);
  }
}
