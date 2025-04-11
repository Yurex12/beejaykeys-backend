"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email({ message: 'Enter a valid email address.' }),
    message: zod_1.z.string(),
});
