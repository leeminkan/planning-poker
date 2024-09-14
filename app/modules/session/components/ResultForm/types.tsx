import { z } from "zod";

export const formSchema = z.object({
  finalPoint: z.coerce.number().min(0),
});
