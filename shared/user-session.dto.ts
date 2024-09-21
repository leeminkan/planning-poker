import { z } from 'zod';

export const updateUserSessionSchema = z.object({
  name: z.string().optional(),
});
export type UpdateUserSessionDto = z.infer<typeof updateUserSessionSchema>;

export const initUserSessionSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
export type InitUserSessionDto = z.infer<typeof initUserSessionSchema>;
