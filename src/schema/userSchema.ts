import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, 'username must be more than 3 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'password must be more than 6 characters.'),
});
