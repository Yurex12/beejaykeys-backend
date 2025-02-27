import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import Project from '../models/projectModel';
import { TprojectSchema } from '../schema/projectSchema';

//@desc Get all products
//@route GET api/products
//@access public

export const getProjects = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await Project.find();
    res.status(StatusCodes.OK).json({ projects, message: 'Successful' });
  }
);

//@desc Get project
//@route GET api/project/:id
//@access public

export const getProject = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const project = await Project.findById(id);

    if (!project) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('project does not exist.');
    }

    res.status(StatusCodes.OK).json({ message: `Successful.`, project });
  }
);

//@desc Create project
//@route POST api/project
//@access private

export const createProject = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as TprojectSchema;

    const projectExists = await Project.findOne({ name: data.name });

    if (projectExists) {
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
      throw new Error(`Project with the name ${data.name} already exist.`);
    }

    const project = await Project.create(data);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'project created succesfully.', project });
  }
);

//@desc update project
//@route POST api/products/:id
//@access private

export const updateProject = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;
    const { description, imageUrl, name, pitch, status, workedAs } =
      req.body as TprojectSchema;

    const project = await Project.findById(id);

    if (!project) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('project does not exist.');
    }

    const projectExists = await Project.findOne({ name });

    if (projectExists) {
      res.status(StatusCodes.METHOD_NOT_ALLOWED);
      throw new Error(`Project with the name ${name} already exist.`);
    }

    project.name = name;
    project.description = description;
    project.status = status;
    project.imageUrl = imageUrl;
    project.workedAs = workedAs;
    project.pitch = pitch;

    const result = await project.save();
    res
      .status(StatusCodes.OK)
      .json({ message: `project updated succesfully.`, result });
  }
);

//@desc Delete project
//@route DELETE api/products
//@access private

export const deleteProject = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const project = await Project.findById(id);

    if (!project) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('project does not exist.');
    }
    await project.deleteOne({ _id: id });
    res.status(200).json({ message: `project deleteted succesfully.` });
  }
);
