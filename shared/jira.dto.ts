import { z } from 'zod';

export const setupApiKeySchema = z.object({
  sessionId: z.string(),
  host: z.string(),
  email: z.string(),
  token: z.string(),
});
export type SetupApiKeyDto = z.infer<typeof setupApiKeySchema>;

export const setupSyncSchema = z.object({
  sessionId: z.string(),
  enableSync: z.boolean(),
  mappingFields: z.record(z.string(), z.string()),
});
export type SetupSyncDto = z.infer<typeof setupSyncSchema>;

export const queryIssueSchema = z.object({
  sessionId: z.string(),
  jql: z.string(),
});
export type QueryIssueDto = z.infer<typeof queryIssueSchema>;
