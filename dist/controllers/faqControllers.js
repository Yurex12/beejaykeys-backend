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
exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaq = exports.getFaqs = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const faqModel_1 = __importDefault(require("../models/faqModel"));
//@desc Get all faqs
//@route GET api/faqs
//@access public
exports.getFaqs = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const faqs = yield faqModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ faqs, message: 'Successful' });
}));
//@desc Get faq
//@route GET api/faq/:id
//@access public
exports.getFaq = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const faq = yield faqModel_1.default.findById(id);
    if (!faq) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Faq does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Successful.`, faq });
}));
//@desc Create faq
//@route POST api/faq
//@access private
exports.createFaq = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const faq = yield faqModel_1.default.create(data);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ message: 'Faq created succesfully.', faq });
}));
//@desc update Faq
//@route POST api/faqs/:id
//@access private
exports.updateFaq = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { question, answer } = req.body;
    const faq = yield faqModel_1.default.findById(id);
    if (!faq) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Faq does not exist.');
    }
    faq.question = question;
    faq.answer = answer;
    const result = yield faq.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: `Faq updated succesfully.`, result });
}));
//@desc Delete faq
//@route DELETE api/faqs
//@access private
exports.deleteFaq = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const faq = yield faqModel_1.default.findById(id);
    if (!faq) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Faq does not exist.');
    }
    yield faqModel_1.default.deleteOne({ _id: id });
    res.status(200).json({ message: `Faq deleteted succesfully.` });
}));
