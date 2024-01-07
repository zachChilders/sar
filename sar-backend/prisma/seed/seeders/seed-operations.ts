import { faker } from '@faker-js/faker';
import { prisma } from '../common';

type Params = {
  number: number;
};

export const seedOperation = (params: Params) =>
  prisma.operation.create({
    data: {
      number: params.number,
      sequenceNumber: faker.number.int({ max: 100 }),
      start: faker.date.past(),
      end: faker.date.past(),
      title: faker.lorem.sentence(),
      notes: faker.lorem.paragraph(),
    },
  });
