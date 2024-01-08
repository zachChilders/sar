import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Transaction, TransactionOptions } from './prisma.types';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  $extendTransaction<T>(
    trx: Transaction | null | undefined,
    callback: (trx: Transaction) => Promise<T>,
    options?: TransactionOptions,
  ): Promise<T> {
    if (trx) {
      return callback(trx);
    } else {
      return this.$transaction(callback, options);
    }
  }
}
