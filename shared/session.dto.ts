import { z } from 'zod';

export const updateSessionSchema = z.object({
  name: z.string().optional(),
});
export type UpdateSessionDto = z.infer<typeof updateSessionSchema>;
