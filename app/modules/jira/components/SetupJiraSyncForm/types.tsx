import { z } from 'zod';

export const formSchema = z.object({
  point: z.string(),
  enableSync: z.boolean(),
});
export type FormSchema = z.infer<typeof formSchema>;
