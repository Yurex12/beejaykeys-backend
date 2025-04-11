"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceModel = new mongoose_1.Schema({
    skill: {
        type: String,
        required: true,
        enum: [
            'ambassadorship-&-influence',
            'project-marketing',
            'community-management',
        ],
    },
    description: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Service', serviceModel);
