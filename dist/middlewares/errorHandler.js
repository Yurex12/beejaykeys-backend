"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        message: message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
