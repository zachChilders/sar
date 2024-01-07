import { Operation } from '@prisma/client';
import { Operation as Entity } from './entities/operation.entity';

export const mapOperationToEntity = (operation: Operation): Entity => {
  return {
    id: operation.id,
    number: operation.number,
    sequenceNumber: operation.sequenceNumber,
    start: operation.start,
    end: operation.end,
    title: operation.title,
    notes: operation.notes,
  };
};
