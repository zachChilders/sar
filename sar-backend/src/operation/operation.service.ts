import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapOperationToEntity } from './operation.mapper';
import { Operation as Entity } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(private readonly prisma: PrismaService) {}

  getOperations = async (): Promise<Entity[]> => {
    return (
      await this.prisma.operation.findMany({
        orderBy: {
          number: 'desc',
        },
      })
    ).map(mapOperationToEntity);
  };
}
