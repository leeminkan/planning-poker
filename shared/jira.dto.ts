import { z } from 'zod';

export const setupApiKeySchema = z.object({
  userId: z.string(),
  host: z.string(),
  email: z.string(),
  token: z.string(),
});
export type SetupApiKeyDto = z.infer<typeof setupApiKeySchema>;

export const queryIssueSchema = z.object({
  userId: z.string(),
  jql: z.string(),
});
export type QueryIssueDto = z.infer<typeof queryIssueSchema>;
