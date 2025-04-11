"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsSchema = void 0;
const zod_1 = require("zod");
exports.viewsSchema = zod_1.z.object({
    ipAddress: zod_1.z.string(),
});
