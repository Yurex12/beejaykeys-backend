"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkSchema = void 0;
const zod_1 = require("zod");
exports.linkSchema = zod_1.z.object({
    url: zod_1.z.string().url({ message: 'Enter a valid url' }),
});
