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
    AUTH0_AUDIENCE: z.string().min(1),
    AUTH0_DOMAIN: z.string().min(1),
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().url(),
  })
  .parse(process.env);
