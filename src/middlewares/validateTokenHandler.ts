import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error('No token was found.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(404);
    throw new Error('Token Verification failed.');
  }
}
