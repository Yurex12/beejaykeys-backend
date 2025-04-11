"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPasswordSchema = exports.userInfoSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'username must be more than 3 characters.'),
    email: zod_1.z.string().email('Invalid email address.'),
    password: zod_1.z.string().min(6, 'password must be more than 6 characters.'),
});
exports.userInfoSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'username must be more than 3 characters.'),
    email: zod_1.z.string().email('Invalid email address.'),
});
exports.userPasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(6, 'password must be more than 6 characters.'),
    newPassword: zod_1.z.string().min(6, 'password must be more than 6 characters.'),
});
