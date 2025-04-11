"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectControllers_1 = require("../controllers/projectControllers");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const validation_1 = require("../middlewares/validation");
const projectSchema_1 = require("../schema/projectSchema");
const router = express_1.default.Router();
router
    .get('/', projectControllers_1.getProjects)
    .post('/', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(projectSchema_1.projectSchema), projectControllers_1.createProject);
router
    .get('/:id', projectControllers_1.getProject)
    .put('/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(projectSchema_1.projectSchema), projectControllers_1.updateProject)
    .delete('/:id', validateTokenHandler_1.validateToken, projectControllers_1.deleteProject);
router.patch('/increment-views/:id', projectControllers_1.incremetProjectViews);
exports.default = router;
