import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

faker.seed(867_5309);

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

export const coinflip = <T>(fn: () => T) =>
  faker.helpers.maybe(fn, { probability: 0.5 });

export const daysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export const prisma = new PrismaClient();
