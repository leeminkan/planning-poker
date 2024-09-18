import { z } from 'zod';

export const formSchema = z.object({
  jql: z.string(),
});
export type FormSchema = z.infer<typeof formSchema>;
