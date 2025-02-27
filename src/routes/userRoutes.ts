import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';
import { validateData } from '../middlewares/validation';
import { userSchema } from '../schema/userSchema';

const router = express.Router();

router.post('/login', loginUser);

router.post('/register', validateData(userSchema), registerUser);

export default router;
