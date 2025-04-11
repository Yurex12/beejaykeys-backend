import { z } from 'zod';

const workedAsSchema = z.preprocess(
  (arg) => {
    // If arg is a string, try to parse it as JSON
    if (typeof arg === 'string') {
      try {
        return JSON.parse(arg);
      } catch (e) {
        return arg;
      }
    }
    return arg;
  },
  z
    .array(
      z.object({
        id: z.string(),
        name: z.string().nonempty('Tag cannot be empty'),
        className: z.string(),
      })
    )
    .nonempty('Please add at least one skill')
);

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  workedAs: workedAsSchema,
  status: z.enum(['done', 'in-progress'], {
    errorMap: () => ({
      message: 'status can either be done or in progress.',
    }),
  }),
  pitch: z.string(),
  // image: z.string().optional(),
});

export type TprojectSchema = z.infer<typeof projectSchema>;
