import express from 'express';

import { validateData } from '../middlewares/validation';
import { testimonialSchema } from '../schema/testimonialSchema';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonial,
  getTestimonials,
  updateTestimonial,
} from '../controllers/testimonialController';

const router = express.Router();

router
  .get('/', getTestimonials)
  .post('/', validateToken, validateData(testimonialSchema), createTestimonial);

router
  .get('/:id', getTestimonial)
  .put(
    '/:id',
    validateToken,
    validateData(testimonialSchema),
    updateTestimonial
  )
  .delete('/:id', validateToken, deleteTestimonial);

export default router;
