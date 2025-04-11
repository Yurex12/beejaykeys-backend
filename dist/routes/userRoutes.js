"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middlewares/validation");
const userSchema_1 = require("../schema/userSchema");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const router = express_1.default.Router();
router.post('/login', userController_1.loginUser);
router.get('/user/:id', validateTokenHandler_1.validateToken, userController_1.getUserData);
router.post('/register', (0, validation_1.validateData)(userSchema_1.userSchema), userController_1.registerUser);
router.post('/logout', userController_1.logoutUser);
router.patch('/update-info/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(userSchema_1.userInfoSchema), userController_1.updateUserInfo);
router.patch('/update-password/:id', validateTokenHandler_1.validateToken, (0, validation_1.validateData)(userSchema_1.userPasswordSchema), userController_1.updateUserPassword);
exports.default = router;
