import { z } from 'zod';

export const ClaimsSchema = z.object({
  sub: z.string(),
});
