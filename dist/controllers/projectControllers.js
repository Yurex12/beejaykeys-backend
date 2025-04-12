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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incremetProjectViews = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectModel_1 = __importDefault(require("../models/projectModel"));
const imagekit_1 = require("../utils/imagekit");
//@desc Get all project
//@route GET api/project
//@access public
exports.getProjects = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield projectModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ projects, message: 'Successful' });
}));
//@desc Get project
//@route GET api/project/:id
//@access public
exports.getProject = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield projectModel_1.default.findById(id);
    if (!project) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('project does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Successful.`, project });
}));
//@desc Create project
//@route POST api/project
//@access private
exports.createProject = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { workedAs } = _a, otherValues = __rest(_a, ["workedAs"]);
    if (!req.file) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('No file provided or file type is not allowed.');
    }
    const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    let imageResult;
    try {
        imageResult = yield imagekit_1.imagekit.upload({
            file: base64String,
            fileName: req.file.originalname,
            folder: '/beejakeys',
        });
    }
    catch (_b) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error('Network Error. Make sure your mobile data is on.');
    }
    const project = yield projectModel_1.default.create(Object.assign(Object.assign({}, otherValues), { 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        workedAs: JSON.parse(workedAs), image: imageResult.url, imageId: imageResult.fileId }));
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ message: 'project created succesfully.', project });
}));
//@desc update project
//@route POST api/products/:id
//@access private
exports.updateProject = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, name, pitch, status, workedAs } = req.body;
    const project = yield projectModel_1.default.findById(id);
    if (!project) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('project does not exist.');
    }
    project.name = name;
    project.description = description;
    project.status = status;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    project.workedAs = JSON.parse(workedAs);
    project.pitch = pitch;
    if (req.file) {
        // upload new image first
        // Convert to base64String and upload
        const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        let imageResult;
        try {
            imageResult = yield imagekit_1.imagekit.upload({
                file: base64String,
                fileName: req.file.originalname,
                folder: '/beejakeys',
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error('Failed to upload image. Please try again later.');
        }
        // Delete previous image
        try {
            yield imagekit_1.imagekit.deleteFile(project.imageId);
        }
        catch (error) {
            console.log(process.env.NODE_ENV === 'production'
                ? null
                : 'Image deletion failed due some issue, try deleting from your imagekit dashboard.');
        }
        project.image = imageResult.url;
        project.imageId = imageResult.fileId;
    }
    const result = yield project.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: `project updated succesfully.`, result });
}));
//@desc Delete project
//@route DELETE api/products
//@access private
exports.deleteProject = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield projectModel_1.default.findById(id);
    if (!project) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('project does not exist.');
    }
    yield project.deleteOne({ _id: id });
    res.status(200).json({ message: `project deleteted succesfully.` });
    try {
        yield imagekit_1.imagekit.deleteFile(project.imageId);
    }
    catch (_a) {
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        // throw new Error(
        //   'Image deletion failed due some issue, try deleting from your imagekit dashboard.'
        // );
        console.log(process.env.NODE_ENV === 'production'
            ? null
            : 'Image deletion failed due some issue, try deleting from your imagekit dashboard.');
    }
}));
//@desc Increment views project
//@route DELETE api/increment-views/:id
//@access public
exports.incremetProjectViews = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const project = yield projectModel_1.default.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true, timestamps: false });
    if (!project) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT);
        throw new Error('No project found.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(project);
}));
