"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const serviceSchema_1 = require("../schema/serviceSchema");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const serviceController_1 = require("../controllers/serviceController");
const router = express_1.default.Router();
router.get('/', serviceController_1.getServices);
router.get('/:id', serviceController_1.getService);
router.put('/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(serviceSchema_1.serviceSchema), serviceController_1.updateService);
exports.default = router;
