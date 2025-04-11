"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.updateUserPassword = exports.updateUserInfo = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const imagekit_1 = require("../utils/imagekit");
//@desc Register a user
//@route GET api/users/register
//@access public
// Tdod: change to a private route
exports.registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, image, imageId } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
        throw new Error('Email already exist.');
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield userModel_1.default.create({
        username,
        email,
        password: hashedPassword,
        image,
        imageId,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        message: 'Registration succesful.',
        userId: newUser._id.toString(),
    });
}));
//@desc Login a user
//@route POST api/users/register
//@access public
exports.loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404);
        throw new Error('All fields are mandatory');
    }
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(403);
        throw new Error('No user was found');
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        res.status(404);
        throw new Error('Email or password is wrong.');
    }
    const accessToken = jsonwebtoken_1.default.sign({ user: { id: user._id } }, process.env.JWT_TOKEN_SECRET, { expiresIn: '30d' });
    // Store refresh token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       id: user._id,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   {
    //     expiresIn: '5m',
    //   }
    // );
    res.status(200).json({
        message: 'Login succesful.',
        user: {
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            image: user.image,
        },
        isAuthenticated: true,
    });
}));
//@desc Logout the user and destroy the cookie
//@route POST api/users/logout
//@access private
exports.logoutUser = (0, express_async_handler_1.default)((req, res, next) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
});
//@desc Update a user data
//@route POST api/users/update-info/:id
//@access private
exports.updateUserInfo = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = yield userModel_1.default.findById(id);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('project does not exist.');
    }
    user.username = username;
    user.email = email;
    console.log(req.file);
    if (req.file) {
        // Delete previous image
        try {
            yield imagekit_1.imagekit.deleteFile(user.imageId);
        }
        catch (error) {
            console.log(error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error('Something went wrong. Please try again later.');
        }
        // Convert to base64String and upload
        const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        let imageResult;
        try {
            imageResult = yield imagekit_1.imagekit.upload({
                file: base64String,
                fileName: req.file.originalname,
            });
        }
        catch (error) {
            console.log(error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error('Failed to upload image. Please try again later.');
        }
        user.image = imageResult.url;
        user.imageId = imageResult.fileId;
    }
    const result = yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `Profile updated succesfully.`,
        user: {
            userId: result._id.toString(),
            email: result.email,
            image: result.image,
            username: result.username,
        },
    });
}));
//@desc Update a user data
//@route POST api/users/update-password/:id
//@access private
exports.updateUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = yield userModel_1.default.findById(id);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('user does not exist.');
    }
    const passwordMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!passwordMatch) {
        res.status(404);
        throw new Error('Old Password is wrong.');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    user.password = newHashedPassword;
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `Password updated succesfully.`,
    });
}));
//@desc Update a user data
//@route POST api/users/:id
//@access private
exports.getUserData = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userModel_1.default.findById(id);
    if (!user) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
        throw new Error('User Does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `Successfull`,
        user: {
            userId: user._id.toString(),
            email: user.email,
            image: user.image,
            username: user.username,
        },
        isAuthenticated: true,
    });
}));
