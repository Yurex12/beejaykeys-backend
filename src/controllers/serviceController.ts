import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';

import Service from '../models/serviceModel';
import { TserviceSchema } from '../schema/serviceSchema';

//@desc Get all Service
//@route GET api/services
//@access public

export const getServices = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const services = await Service.find();
    res.status(StatusCodes.OK).json({ services, message: 'Successful' });
  }
);

//@desc Get Service
//@route GET api/services/:id
//@access public

export const getService = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const service = await Service.findById(id);

    if (!service) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Service does not exist.');
    }

    res.status(StatusCodes.OK).json({ message: `Successful.`, service });
  }
);

//@desc update Service
//@route PUT api/services/:id
//@access private

export const updateService = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { description, roles } = req.body as TserviceSchema;

    const service = await Service.findById(id);

    if (!service) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Service does not exist.');
    }

    service.description = description;
    service.roles = roles;

    const result = await service.save();
    res
      .status(StatusCodes.OK)
      .json({ message: `Service updated succesfully.`, result });
  }
);
