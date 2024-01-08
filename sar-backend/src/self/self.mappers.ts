import { Self as Entity, Self } from './entities/self.entity';
import { Member } from '@prisma/client';

export const mapSelfModelToEntity = (model: Self): Entity => ({
  id: model.id,
  email: model.email,
  firstName: model.firstName ?? undefined,
  lastName: model.lastName ?? undefined,
});
