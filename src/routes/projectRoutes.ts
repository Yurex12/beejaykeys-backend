import express from 'express';

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers/projectControllers';
import { validateToken } from '../middlewares/validateTokenHandler';
import { validateData } from '../middlewares/validation';
import { projectSchema } from '../schema/projectSchema';

const router = express.Router();

router
  .get('/', getProjects)
  .post('/', validateToken, validateData(projectSchema), createProject);

router
  .get('/:id', getProject)
  .put('/:id', validateToken, validateData(projectSchema), updateProject)
  .delete('/:id', validateToken, deleteProject);

export default router;
