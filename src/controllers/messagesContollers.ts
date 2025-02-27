import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import Message from '../models/messageModel';
import { TmessageSchema } from '../schema/message';

//@desc Get all messages
//@route GET api/messages
//@access public

export const getMessages = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const messages = await Message.find();
    res.status(StatusCodes.OK).json({ messages, message: 'Successful' });
  }
);

//@desc Get message
//@route GET api/message/:id
//@access public

export const getMessage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const message = await Message.findById(id);

    if (!message) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Message does not exist.');
    }

    res.status(StatusCodes.OK).json({ message });
  }
);

//@desc Create message
//@route POST api/message
//@access private

export const createMessage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as TmessageSchema;

    const message = await Message.create(data);
    res.status(StatusCodes.CREATED).json({ message });
  }
);
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

export const deleteMessage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const message = await Message.findById(id);

    if (!message) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Message does not exist.');
    }
    await Message.deleteOne({ _id: id });
    res.status(200).json({ message: `Message deleteted succesfully.` });
  }
);
