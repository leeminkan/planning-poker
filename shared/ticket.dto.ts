import { z } from 'zod';

export const createTicketSchema = z.object({
  sessionId: z.string(),
  title: z.string(),
  description: z.string(),
});
export type CreateTicketDto = z.infer<typeof createTicketSchema>;

export const updateTicketSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  point: z.coerce.number().optional(),
});
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
