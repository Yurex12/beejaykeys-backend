"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    Errordetail: {
                        message: issue.message,
                        path: issue.path[0],
                    },
                }));
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ error: 'Invalid data', details: errorMessages });
            }
            else {
                res
                    .status(http_status_codes_1.StatusCodes.FORBIDDEN)
                    .json({ error: 'Internal Server Error' });
            }
        }
    };
}
