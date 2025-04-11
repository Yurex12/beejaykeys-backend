"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faqControllers_1 = require("../controllers/faqControllers");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const validation_1 = require("../middlewares/validation");
const faqSchema_1 = require("../schema/faqSchema");
const router = express_1.default.Router();
router
    .get('/', faqControllers_1.getFaqs)
    .post('/', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(faqSchema_1.faqSchema), faqControllers_1.createFaq);
router
    .get('/:id', faqControllers_1.getFaq)
    .put('/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(faqSchema_1.faqSchema), faqControllers_1.updateFaq)
    .delete('/:id', validateTokenHandler_1.validateToken, faqControllers_1.deleteFaq);
exports.default = router;
