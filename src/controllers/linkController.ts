import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';

import Link from '../models/linkModel';

//@desc Get all Links
//@route GET api/links
//@access public

export const getLinks = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const links = await Link.find();
    res.status(StatusCodes.OK).json({ links, message: 'Successful' });
  }
);

//@desc Get Link
//@route GET api/links/:name
//@access public

export const getLink = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const link = await Link.findById(id);

    if (!link) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Link does not exist.');
    }

    res.status(StatusCodes.OK).json({ message: `Successful.`, link });
  }
);

//@desc update Link
//@route PUT api/links/:name
//@access private

export const updateLink = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { url } = req.body as LinkRequestBody;

    const link = await Link.findById(id);

    if (!link) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Link does not exist.');
    }

    link.url = url;

    const result = await link.save();
    res
      .status(StatusCodes.OK)
      .json({ message: `Link updated succesfully.`, data: result });
  }
);
