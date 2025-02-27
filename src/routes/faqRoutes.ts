import express from 'express';

import {
  createFaq,
  deleteFaq,
  getFaq,
  getFaqs,
  updateFaq,
} from '../controllers/faqControllers';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { faqSchema } from '../schema/faqSchema';

const router = express.Router();

router
  .get('/', getFaqs)
  .post('/', validateToken, validateData(faqSchema), createFaq);

router
  .get('/:id', getFaq)
  .put('/:id', validateToken, validateData(faqSchema), updateFaq)
  .delete('/:id', validateToken, deleteFaq);

export default router;
