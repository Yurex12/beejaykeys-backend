"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesContollers_1 = require("../controllers/messagesContollers");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const validation_1 = require("../middlewares/validation");
const message_1 = require("../schema/message");
const router = express_1.default.Router();
router
    .get('/', validateTokenHandler_1.validateToken, messagesContollers_1.getMessages)
    .post('/', (0, validation_1.validateData)(message_1.messageSchema), messagesContollers_1.createMessage);
router
    .get('/:id', validateTokenHandler_1.validateToken, messagesContollers_1.getMessage)
    .delete('/:id', validateTokenHandler_1.validateToken, messagesContollers_1.deleteMessage);
exports.default = router;
