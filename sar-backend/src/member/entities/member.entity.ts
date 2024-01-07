import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MemberSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  ham: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  phoneHome: z.string(),
  phoneCell: z.string(),
  phoneWork: z.string(),
  email: z.string().email(),
});

export class Member extends createZodDto(MemberSchema) {}
