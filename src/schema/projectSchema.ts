import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  workedAs: z.string(),
  imageUrl: z.string(),
  status: z.enum(['done', 'in-progress'], {
    errorMap: () => ({
      message: 'status can either be done or in progress.',
    }),
  }),
  pitch: z.string(),
});

export type TprojectSchema = z.infer<typeof projectSchema>;
