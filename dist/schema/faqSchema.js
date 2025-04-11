"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqSchema = void 0;
const zod_1 = require("zod");
exports.faqSchema = zod_1.z.object({
    question: zod_1.z
        .string()
        .min(10, { message: 'Question must be more than 10 characters.' }),
    answer: zod_1.z
        .string()
        .min(10, { message: 'Answer must be more than 10 characters.' }),
});
