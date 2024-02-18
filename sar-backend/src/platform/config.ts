import * as dotenv from 'dotenv';
import { z } from 'zod';
import { environment } from './environment';

if (environment === 'development') {
  dotenv.config({ path: '.env.local' });
  dotenv.config({ path: '.env' });
}

export const config = z
  .object({
    PORT: z.coerce.number().default(8080),
    JWT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().url(),
    PRISMA_LOG_LEVELS: z
      .string()
      .optional()
      .transform((str) => str?.split(','))
      .pipe(z.array(z.enum(['info', 'query', 'warn', 'error'])).optional()),
  })
  .transform((obj) => ({
    ...obj,
  }))
  .parse(process.env);
