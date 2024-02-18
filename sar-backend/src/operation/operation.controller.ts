import { Controller, Get, UseGuards } from '@nestjs/common';
import { OperationService } from './operation.service';
import { Operation as Entity } from './entities/operation.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  getOperations(): Promise<Entity[]> {
    return this.operationService.getOperations();
  }
}
