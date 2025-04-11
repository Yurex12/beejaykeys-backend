"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialSchema = void 0;
const zod_1 = require("zod");
exports.testimonialSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long.' }),
    review: zod_1.z.string().min(10, 'Review must be at least 10 characters long.'),
});
