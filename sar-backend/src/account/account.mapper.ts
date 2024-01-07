import { Member } from '@prisma/client';
import { Member as Entity } from './entities/member.entity';

export const mapMemberToEntity = (member: Member): Entity => {
  return {
    name: member.name,
    email: member.email,
  };
};
