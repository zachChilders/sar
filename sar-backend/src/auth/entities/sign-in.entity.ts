import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class SignIn extends createZodDto(SignInSchema) {}
