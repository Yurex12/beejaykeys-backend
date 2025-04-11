"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewsControllers_1 = require("../controllers/viewsControllers");
const validation_1 = require("../middlewares/validation");
const viewsSchema_1 = require("../schema/viewsSchema");
const router = express_1.default.Router();
router.get('/:id', viewsControllers_1.getViews);
router.post('/:id', (0, validation_1.validateData)(viewsSchema_1.viewsSchema), viewsControllers_1.updateViews);
exports.default = router;
