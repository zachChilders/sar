import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const OperationSchema = z.object({
  id: z.number().int(),
  number: z.number().int(),
  sequenceNumber: z.number().int(),
  start: z.date(),
  end: z.date(),
  title: z.string(),
  notes: z.string(),
});

export class Operation extends createZodDto(OperationSchema) {}
