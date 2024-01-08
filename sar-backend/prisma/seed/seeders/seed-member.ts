import { faker } from '@faker-js/faker';
import { coinflip, prisma } from '../common';

type Params = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export const seedMember = (params: Params) =>
  prisma.member.create({
    data: {
      auth0Id: faker.string.uuid(),
      email: params.email ?? faker.internet.email(),
      firstName: params.firstName ?? faker.person.firstName(),
      lastName: params.lastName ?? faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipcode: faker.location.zipCode(),
      phoneHome: faker.phone.number(),
      phoneCell: faker.phone.number(),
      phoneWork: faker.phone.number(),
      ham: coinflip(
        () =>
          `K${faker.string.alpha(1).toUpperCase()}7${faker.string
            .alpha(3)
            .toUpperCase()}`,
      ),
      status: 'ACTIVE',
    },
  });
