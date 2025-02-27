import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import Testimonial from '../models/testimonialModel';
import { getRandomColor } from '../utils/helpers';

//@desc Get all Testimonails
//@route GET api/testimonials
//@access public

export const getTestimonials = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const testimonials = await Testimonial.find();
    res.status(StatusCodes.OK).json({ testimonials, messsage: 'Successful' });
  }
);

//@desc Get testimonial
//@route GET api/testminials/:id
//@access public

export const getTestimonial = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Testimonial does not exist.');
    }

    res.status(StatusCodes.OK).json({ message: `Successful.`, testimonial });
  }
);

//@desc Create testimonial
//@route POST api/testimonial
//@access private

export const createTestimonial = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, review } = req.body as TestimonialRequestBody;

    const testimonial = await Testimonial.create({
      name,
      review,
      color: getRandomColor(),
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Testimonial created succesfully.', data: testimonial });
  }
);
//@desc update testimonial
//@route POST api/testimonial/:id
//@access private

export const updateTestimonial = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { name, review } = req.body as TestimonialRequestBody;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Testimonial does not exist.');
    }

    testimonial.name = name;
    testimonial.review = review;

    const result = await testimonial.save();
    res
      .status(StatusCodes.OK)
      .json({ messsage: `Testimonial updated succesfully.`, data: result });
  }
);

//@desc Delete testimonial
//@route DELETE api/testimonial
//@access private

export const deleteTestimonial = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Testimonial does not exist.');
    }
    await Testimonial.deleteOne({ _id: id });
    res
      .status(StatusCodes.OK)
      .json({ messsage: `Testimonial deleteted succesfully.` });
  }
);
