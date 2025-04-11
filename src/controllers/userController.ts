import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import { imagekit } from '../utils/imagekit';

//@desc Register a user
//@route GET api/users/register
//@access public

// Tdod: change to a private route
export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, image, imageId } =
      req.body as UserRequestBody;

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
      image,
      imageId,
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
      { user: { id: user._id } },
      process.env.JWT_TOKEN_SECRET as string,
      { expiresIn: '30d' }
    );

    // Store refresh token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // const accessToken = jwt.sign(
    //   {
    //     user: {
    //       id: user._id,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   {
    //     expiresIn: '5m',
    //   }
    // );

    res.status(200).json({
      message: 'Login succesful.',
      user: {
        userId: user._id.toString(),
        username: user.username,
        email: user.email,
        image: user.image,
      },
      isAuthenticated: true,
    });
  }
);

//@desc Logout the user and destroy the cookie
//@route POST api/users/logout
//@access private

export const logoutUser = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  }
);

//@desc Update a user data
//@route POST api/users/update-info/:id
//@access private

export const updateUserInfo = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { username, email } = req.body as UserRequestBody;

    const user = await User.findById(id);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('project does not exist.');
    }

    user.username = username;
    user.email = email;

    console.log(req.file);

    if (req.file) {
      // Delete previous image
      try {
        await imagekit.deleteFile(user.imageId);
      } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error('Something went wrong. Please try again later.');
      }
      // Convert to base64String and upload
      const base64String = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString('base64')}`;

      let imageResult;
      try {
        imageResult = await imagekit.upload({
          file: base64String,
          fileName: req.file.originalname,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error('Failed to upload image. Please try again later.');
      }
      user.image = imageResult.url;
      user.imageId = imageResult.fileId;
    }

    const result = await user.save();
    res.status(StatusCodes.OK).json({
      message: `Profile updated succesfully.`,
      user: {
        userId: result._id.toString(),
        email: result.email,
        image: result.image,
        username: result.username,
      },
    });
  }
);

//@desc Update a user data
//@route POST api/users/update-password/:id
//@access private

export const updateUserPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { oldPassword, newPassword } = req.body as UserPasswordRequestBody;

    const user = await User.findById(id);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('user does not exist.');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      res.status(404);
      throw new Error('Old Password is wrong.');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;

    await user.save();

    res.status(StatusCodes.OK).json({
      message: `Password updated succesfully.`,
    });
  }
);

//@desc Update a user data
//@route POST api/users/:id
//@access private

export const getUserData = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const user = await User.findById(id);

    if (!user) {
      res.status(StatusCodes.FORBIDDEN);
      throw new Error('User Does not exist.');
    }

    res.status(StatusCodes.OK).json({
      message: `Successfull`,
      user: {
        userId: user._id.toString(),
        email: user.email,
        image: user.image,
        username: user.username,
      },
      isAuthenticated: true,
    });
  }
);
