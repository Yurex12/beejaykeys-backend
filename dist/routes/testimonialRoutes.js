"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const testimonialSchema_1 = require("../schema/testimonialSchema");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const testimonialController_1 = require("../controllers/testimonialController");
const router = express_1.default.Router();
router
    .get('/', testimonialController_1.getTestimonials)
    .post('/', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(testimonialSchema_1.testimonialSchema), testimonialController_1.createTestimonial);
router
    .get('/:id', testimonialController_1.getTestimonial)
    .put('/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(testimonialSchema_1.testimonialSchema), testimonialController_1.updateTestimonial)
    .delete('/:id', validateTokenHandler_1.validateToken, testimonialController_1.deleteTestimonial);
exports.default = router;
