import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const MemberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export class Member extends createZodDto(MemberSchema) {}
