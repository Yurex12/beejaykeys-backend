"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testimonialModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        enum: ['red', 'yellow', 'gray'],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Testimonial', testimonialModel);
