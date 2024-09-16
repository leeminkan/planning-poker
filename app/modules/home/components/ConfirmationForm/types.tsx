import { z } from 'zod';

export const formSchema = z.object({
  name: z.string(),
  sessionId: z.string().min(1, { message: 'Session ID is required!' }),
});
