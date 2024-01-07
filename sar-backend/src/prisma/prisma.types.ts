import { PrismaService } from './prisma.service';

type TransactionHandler = Parameters<PrismaService['$transaction']>[0];

export type Transaction = Parameters<TransactionHandler>[0];

export type TransactionOptions = Parameters<PrismaService['$transaction']>[1];
