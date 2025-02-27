import { z } from 'zod';

export const serviceSchema = z.object({
  // skill: z.enum(
  //   ['ambassadorship-&-influence', 'project-marketing', 'community-management'],
  //   {
  //     errorMap: () => ({ message: 'Data was passed in a wrong format.' }),
  //   }
  // ),
  description: z
    .string()
    .min(10, { message: 'Descrition must be at least 10 characters.' }),
  roles: z.string(),
});

export type TserviceSchema = z.infer<typeof serviceSchema>;
