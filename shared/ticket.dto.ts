import { z } from 'zod';

export const createTicketSchema = z
  .object({
    sessionId: z.string(),
    title: z.string(),
    description: z.string(),
    jiraId: z.string().optional(),
    jiraIssueId: z.string().optional(),
  })
  .refine(
    (data) => {
      // If jiraId exists, jiraIssueId must also exist
      if (data.jiraId && !data.jiraIssueId) {
        return false;
      }
      return true;
    },
    {
      message: 'jiraIssueId is required when jiraId is present',
      path: ['jiraIssueId'],
    },
  );
export type CreateTicketDto = z.infer<typeof createTicketSchema>;

export const updateTicketSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  point: z.coerce.number().optional(),
});
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
