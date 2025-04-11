"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceSchema = void 0;
const zod_1 = require("zod");
exports.serviceSchema = zod_1.z.object({
    // skill: z.enum(
    //   ['ambassadorship-&-influence', 'project-marketing', 'community-management'],
    //   {
    //     errorMap: () => ({ message: 'Data was passed in a wrong format.' }),
    //   }
    // ),
    description: zod_1.z
        .string()
        .min(10, { message: 'Descrition must be at least 10 characters.' }),
    roles: zod_1.z.string(),
});
