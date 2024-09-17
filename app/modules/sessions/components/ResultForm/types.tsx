import { z } from 'zod';

export const formSchema = z.object({
  point: z.coerce.number().min(0),
});
