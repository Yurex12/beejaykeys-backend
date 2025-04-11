import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('Something went wrong. kindly refresh this page');
  }

  try {
    const decodedToken: any = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    );
    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Something went wrong. kindly refresh this page');
  }
}
