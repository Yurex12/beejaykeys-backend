import { NextFunction, Response, Request } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error stack for debugging
  console.error(err.stack);

  const statusCode = res.statusCode || 500;

  res
    .status(statusCode)
    .json({ message: err.message || 'Internal Server Error' });
};

export default errorHandler;
