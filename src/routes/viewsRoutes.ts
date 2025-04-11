import express from 'express';
import { getViews, updateViews } from '../controllers/viewsControllers';
import { validateData } from '../middlewares/validation';
import { viewsSchema } from '../schema/viewsSchema';

const router = express.Router();

router.get('/:id', getViews);

router.post('/:id', validateData(viewsSchema), updateViews);

export default router;
