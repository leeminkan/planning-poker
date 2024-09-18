import { z } from 'zod';

export const formSchema = z.object({
  host: z.string(),
  email: z.string(),
  token: z.string(),
});
export type FormSchema = z.infer<typeof formSchema>;
