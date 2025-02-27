import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

//@desc Register a user
//@route GET api/users/register
//@access public

// Tdod: change to a private route
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body as UserRequestBody;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('Email already exist.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(StatusCodes.CREATED).json({
      message: 'Registration succesful.',
      userId: newUser._id.toString(),
    });
  }
);

//@desc Login a user
//@route POST api/users/register
//@access public

export const loginUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as Partial<UserRequestBody>;

    if (!email || !password) {
      res.status(404);
      throw new Error('All fields are mandatory');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(403);
      throw new Error('No user was found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(404);
      throw new Error('Email or password is wrong.');
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '1hr',
      }
    );

    res.status(200).json({
      message: 'Login succesful.',
      userId: user._id.toString(),
      accessToken,
    });
  }
);
