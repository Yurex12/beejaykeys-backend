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
exports.updateService = exports.getService = exports.getServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const serviceModel_1 = __importDefault(require("../models/serviceModel"));
//@desc Get all Service
//@route GET api/services
//@access public
exports.getServices = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield serviceModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ services, message: 'Successful' });
}));
//@desc Get Service
//@route GET api/services/:id
//@access public
exports.getService = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const service = yield serviceModel_1.default.findById(id);
    if (!service) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Service does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Successful.`, service });
}));
//@desc update Service
//@route PUT api/services/:id
//@access private
exports.updateService = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, roles } = req.body;
    const service = yield serviceModel_1.default.findById(id);
    if (!service) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Service does not exist.');
    }
    service.description = description;
    service.roles = roles;
    const result = yield service.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: `Service updated succesfully.`, result });
}));
