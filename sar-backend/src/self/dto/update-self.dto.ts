import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UpdateSelfDtoSechema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  isEnabled: z.boolean().optional(),
  acceptTerms: z.boolean().optional(),
});

export class UpdateSelfDto extends createZodDto(UpdateSelfDtoSechema) {}
