import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';

@Module({
  imports: [],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
