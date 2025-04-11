import express from 'express';

import {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
} from '../controllers/messagesContollers';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { messageSchema } from '../schema/message';

const router = express.Router();

router
  .get('/', validateToken, getMessages)
  .post('/', validateData(messageSchema), createMessage);

router
  .get('/:id', validateToken, getMessage)
  .delete('/:id', validateToken, deleteMessage);

export default router;
