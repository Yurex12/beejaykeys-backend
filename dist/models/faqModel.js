"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const faqModel = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        unique: [true, 'Question already exists.'],
    },
    answer: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Faq', faqModel);
