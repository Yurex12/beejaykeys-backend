import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import Faq from '../models/faqModel';

//@desc Get all faqs
//@route GET api/faqs
//@access public

export const getFaqs = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const faqs = await Faq.find();
    res.status(StatusCodes.OK).json({ faqs, message: 'Successful' });
  }
);

//@desc Get faq
//@route GET api/faq/:id
//@access public

export const getFaq = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const faq = await Faq.findById(id);

    if (!faq) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Faq does not exist.');
    }

    res.status(StatusCodes.OK).json({ message: `Successful.`, faq });
  }
);

//@desc Create faq
//@route POST api/faq
//@access private

export const createFaq = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as FaqRequestBody;

    const faq = await Faq.create(data);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Faq created succesfully.', faq });
  }
);
//@desc update Faq
//@route POST api/faqs/:id
//@access private

export const updateFaq = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { question, answer } = req.body as FaqRequestBody;

    const faq = await Faq.findById(id);

    if (!faq) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Faq does not exist.');
    }

    faq.question = question;
    faq.answer = answer;

    const result = await faq.save();
    res
      .status(StatusCodes.OK)
      .json({ message: `Faq updated succesfully.`, result });
  }
);

//@desc Delete faq
//@route DELETE api/faqs
//@access private

export const deleteFaq = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const faq = await Faq.findById(id);

    if (!faq) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Faq does not exist.');
    }
    await Faq.deleteOne({ _id: id });
    res.status(200).json({ message: `Faq deleteted succesfully.` });
  }
);
