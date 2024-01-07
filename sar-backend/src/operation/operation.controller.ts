import { Controller, Get } from '@nestjs/common';
import { OperationService } from './operation.service';
import { Operation as Entity } from './entities/operation.entity';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  getOperations(): Promise<Entity[]> {
    return this.operationService.getOperations();
  }
}
