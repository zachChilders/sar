import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
});

export type User = z.infer<typeof UserSchema>;
