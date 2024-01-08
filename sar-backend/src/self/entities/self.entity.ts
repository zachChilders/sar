import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SelfSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
});

export class Self extends createZodDto(SelfSchema) {}
