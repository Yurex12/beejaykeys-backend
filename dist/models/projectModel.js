"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    workedAs: {
        type: [{ id: String, name: String, className: String }],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['done', 'in-progress'],
    },
    pitch: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Project', projectModel);
