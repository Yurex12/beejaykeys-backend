import express from 'express';

import { validateData } from '../middlewares/validation';
import { serviceSchema } from '../schema/serviceSchema';

import { validateToken } from '../middlewares/validateTokenHandler';
import {
  getService,
  getServices,
  updateService,
} from '../controllers/serviceController';

const router = express.Router();

router.get('/', getServices);

router.get('/:id', getService);

router.put('/:id', validateToken, validateData(serviceSchema), updateService);

export default router;
