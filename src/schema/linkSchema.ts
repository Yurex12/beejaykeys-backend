import { z } from 'zod';

export const linkSchema = z.object({
  name: z.enum(['x', 'instagram', 'telegram'], {
    errorMap: () => ({ message: 'Enter either instagram, x, or telegram' }),
  }),
  url: z.string().url({ message: 'Enter a valid url' }),
});
