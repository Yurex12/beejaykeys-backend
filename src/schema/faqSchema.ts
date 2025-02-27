import { z } from 'zod';

export const faqSchema = z.object({
  question: z
    .string()
    .min(10, { message: 'Question must be more than 10 characters.' }),
  answer: z
    .string()
    .min(10, { message: 'Answer must be more than 10 characters.' }),
});
