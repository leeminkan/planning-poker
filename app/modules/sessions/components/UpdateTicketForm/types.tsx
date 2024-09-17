import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});
export type FormSchema = z.infer<typeof formSchema>;
