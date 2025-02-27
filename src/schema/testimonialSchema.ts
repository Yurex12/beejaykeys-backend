import { z } from 'zod';

export const testimonialSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' }),
  review: z.string().min(10, 'Review must be at least 10 characters long.'),
});
