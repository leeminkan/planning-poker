import { z } from 'zod';

export const updateUserSessionSchema = z.object({
  name: z.string().optional(),
});
export type UpdateUserSessionDto = z.infer<typeof updateUserSessionSchema>;
