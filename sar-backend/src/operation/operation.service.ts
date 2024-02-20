import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { mapOperationToEntity } from './operation.mapper';
import { Operation as Entity } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(private readonly prisma: PrismaService) {}

  async getOperations(): Promise<Entity[]> {
    return (
      await this.prisma.operation.findMany({
        orderBy: {
          number: 'desc',
        },
      })
    ).map(mapOperationToEntity);
  }

  async createOperation(dto: {
    number: number;
    title: string;
    start: string;
    end: string;
    notes: string;
  }): Promise<Entity> {
    return mapOperationToEntity(
      await this.prisma.operation.create({
        data: {
          number: dto.number,
          title: dto.title,
          start: dto.start,
          end: dto.end,
          notes: dto.notes,
        },
      }),
    );
  }
}
