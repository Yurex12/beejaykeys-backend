"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = validateToken;
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error('Token not found');
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decodedToken.user;
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error('Token has expired.');
    }
}
