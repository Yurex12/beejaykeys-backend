import { z } from 'zod';

export const messageSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Enter a valid email address.' }),
  message: z.string(),
});

export type TmessageSchema = z.infer<typeof messageSchema>;
