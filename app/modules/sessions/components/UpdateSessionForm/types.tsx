import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export type FormSchema = z.infer<typeof formSchema>;
