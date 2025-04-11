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
exports.deleteMessage = exports.createMessage = exports.getMessage = exports.getMessages = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
//@desc Get all messages
//@route GET api/messages
//@access public
exports.getMessages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageModel_1.default.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ messages, message: 'Successful' });
}));
//@desc Get message
//@route GET api/message/:id
//@access public
exports.getMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield messageModel_1.default.findById(id);
    if (!message) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Message does not exist.');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message });
}));
//@desc Create message
//@route POST api/message
//@access private
exports.createMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const message = yield messageModel_1.default.create(data);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ message });
}));
//@desc update Message
//@route POST api/messages/:id
//@access private
// export const updateMessage = expressAsyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params as RequestParams;
//     const { name, email, message: messageText } = req.body as TmessageSchema;
//     const message = await Message.findById(id);
//     if (!message) {
//       res.status(StatusCodes.NOT_FOUND);
//       throw new Error('Message does not exist.');
//     }
//     message.name = name;
//     message.email = email;
//     message.message = messageText;
//     const result = await message.save();
//     res
//       .status(StatusCodes.OK)
//       .json({ message: `Message updated succesfully.`, result });
//   }
// );
//@desc Delete message
//@route DELETE api/messages/:id
//@access private
exports.deleteMessage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield messageModel_1.default.findById(id);
    if (!message) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
        throw new Error('Message does not exist.');
    }
    yield messageModel_1.default.deleteOne({ _id: id });
    res.status(200).json({ message: `Message deleteted succesfully.` });
}));
