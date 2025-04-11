"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const generateAccessToken = (userId: string) => {
//   return jwt.sign(
//     { user: { id: userId } },
//     process.env.JWT_TOKEN_SECRET as string,
//     {
//       expiresIn: '15m',
//     }
//   );
// };
const generateAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ user: { id: userId } }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};
exports.generateAccessToken = generateAccessToken;
