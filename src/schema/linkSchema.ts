import { z } from 'zod';

export const linkSchema = z.object({
  url: z.string().url({ message: 'Enter a valid url' }),
});
