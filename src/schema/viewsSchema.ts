import { z } from 'zod';

export const viewsSchema = z.object({
  ipAddress: z.string(),
});
