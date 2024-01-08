import { Injectable } from '@nestjs/common';
import { mapOperationToEntity } from './operation.mapper';
import { Operation as Entity } from './entities/operation.entity';
import { PrismaService } from 'src/integrations/prisma/prisma.service';

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
