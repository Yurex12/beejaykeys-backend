"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const linkSchema_1 = require("../schema/linkSchema");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const linkController_1 = require("../controllers/linkController");
const router = express_1.default.Router();
router.get('/', linkController_1.getLinks);
router.get('/:id', linkController_1.getLink);
router.put('/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(linkSchema_1.linkSchema), linkController_1.updateLink);
exports.default = router;
