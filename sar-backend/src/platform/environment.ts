import { z } from 'zod';

export const schema = z.enum(['development', 'production']);

export type Environment = z.infer<typeof schema>;

export const environment: Environment = schema.parse(
  process.env['NODE_ENV'] ?? 'development',
);

export const isDevelopment = environment === 'development';

const baseUrls: Record<Environment, string> = {
  development: 'http://localhost:3000',
  production: 'https://app.datumsource.us',
} as const;

export const frontendUrl = baseUrls[environment];
// The frontend and backend urls are different locally, so expose a separate value
// for if we need to hand construct the URL like in downloads
export const backendUrl = isDevelopment ? 'http://localhost:8080' : frontendUrl;
