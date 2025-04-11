"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
const workedAsSchema = zod_1.z.preprocess((arg) => {
    // If arg is a string, try to parse it as JSON
    if (typeof arg === 'string') {
        try {
            return JSON.parse(arg);
        }
        catch (e) {
            return arg;
        }
    }
    return arg;
}, zod_1.z
    .array(zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().nonempty('Tag cannot be empty'),
    className: zod_1.z.string(),
}))
    .nonempty('Please add at least one skill'));
exports.projectSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    workedAs: workedAsSchema,
    status: zod_1.z.enum(['done', 'in-progress'], {
        errorMap: () => ({
            message: 'status can either be done or in progress.',
        }),
    }),
    pitch: zod_1.z.string(),
    // image: z.string().optional(),
});
