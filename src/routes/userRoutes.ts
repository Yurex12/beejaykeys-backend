import express from 'express';
import {
  getUserData,
  loginUser,
  logoutUser,
  registerUser,
  updateUserInfo,
  updateUserPassword,
} from '../controllers/userController';
import { validateData } from '../middlewares/validation';
import {
  userInfoSchema,
  userLoginSchema,
  userPasswordSchema,
  userSchema,
} from '../schema/userSchema';
import { validateToken } from '../middlewares/validateTokenHandler';

const router = express.Router();

router.post('/login', validateData(userLoginSchema), loginUser);

router.get('/user-data', validateToken, getUserData);

router.post('/register', validateData(userSchema), registerUser);

router.post('/logout', logoutUser);

router.patch(
  '/update-info',
  validateToken,
  validateData(userInfoSchema),
  updateUserInfo,
);

router.patch(
  '/update-password',
  validateToken,
  validateData(userPasswordSchema),
  updateUserPassword,
);

export default router;
