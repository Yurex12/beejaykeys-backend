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
exports.deleteTestimonial = exports.updateTestimonial = exports.createTestimonial = exports.getTestimonial = exports.getTestimonials = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const testimonialModel_1 = __importDefault(require("../models/testimonialModel"));
const helpers_1 = require("../utils/helpers");
//@desc Get all Testimonails
//@route GET api/testimonials
//@access public
exports.getTestimonials = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonials = yield testimonialModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ testimonials, messsage: 'Successful' });
}));
//@desc Get testimonial
//@route GET api/testminials/:id
//@access public
exports.getTestimonial = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const testimonial = yield testimonialModel_1.default.findById(id);
    if (!testimonial) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Testimonial does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Successful.`, testimonial });
}));
//@desc Create testimonial
//@route POST api/testimonial
//@access private
exports.createTestimonial = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, review } = req.body;
    const testimonial = yield testimonialModel_1.default.create({
        name,
        review,
        color: (0, helpers_1.getRandomColor)(),
    });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ message: 'Testimonial created succesfully.', data: testimonial });
}));
//@desc update testimonial
//@route POST api/testimonial/:id
//@access private
exports.updateTestimonial = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, review } = req.body;
    const testimonial = yield testimonialModel_1.default.findById(id);
    if (!testimonial) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Testimonial does not exist.');
    }
    testimonial.name = name;
    testimonial.review = review;
    const result = yield testimonial.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ messsage: `Testimonial updated succesfully.`, data: result });
}));
//@desc Delete testimonial
//@route DELETE api/testimonial
//@access private
exports.deleteTestimonial = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const testimonial = yield testimonialModel_1.default.findById(id);
    if (!testimonial) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Testimonial does not exist.');
    }
    yield testimonialModel_1.default.deleteOne({ _id: id });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ messsage: `Testimonial deleteted succesfully.` });
}));
