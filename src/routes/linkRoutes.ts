import express from 'express';

import { validateData } from '../middlewares/validation';
import { linkSchema } from '../schema/linkSchema';

import { validateToken } from '../middlewares/validateTokenHandler';
import { getLink, getLinks, updateLink } from '../controllers/linkController';

const router = express.Router();

router.get('/', getLinks);

router.get('/:id', getLink);

router.put('/:id', validateToken, validateData(linkSchema), updateLink);

export default router;
