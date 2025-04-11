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
exports.updateLink = exports.getLink = exports.getLinks = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const linkModel_1 = __importDefault(require("../models/linkModel"));
//@desc Get all Links
//@route GET api/links
//@access public
exports.getLinks = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const links = yield linkModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ links, message: 'Successful' });
}));
//@desc Get Link
//@route GET api/links/:name
//@access public
exports.getLink = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const link = yield linkModel_1.default.findById(id);
    if (!link) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Link does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Successful.`, link });
}));
//@desc update Link
//@route PUT api/links/:name
//@access private
exports.updateLink = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { url } = req.body;
    const link = yield linkModel_1.default.findById(id);
    if (!link) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Link does not exist.');
    }
    link.url = url;
    const result = yield link.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: `Link updated succesfully.`, data: result });
}));
