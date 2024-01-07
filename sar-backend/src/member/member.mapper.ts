import { Member } from '@prisma/client';
import { Member as Entity } from './entities/member.entity';

export const mapMemberToEntity = (member: Member): Entity => {
  return {
    firstName: member.firstName,
    lastName: member.lastName,
    ham: member.ham,
    address: member.address,
    city: member.city,
    state: member.state,
    zipCode: member.zipcode,
    phoneHome: member.phoneHome,
    phoneCell: member.phoneCell,
    phoneWork: member.phoneWork,

    email: member.email,
  };
};
