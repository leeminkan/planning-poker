import { z } from 'zod';

export const formSchema = z.object({
  pointField: z.string(),
  enableSync: z.boolean(),
});
export type FormSchema = z.infer<typeof formSchema>;
