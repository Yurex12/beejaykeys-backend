import { NextFunction, Response, Request } from 'express';
import { NO_CONTENT, StatusCodes } from 'http-status-codes';
import expressAsyncHandler from 'express-async-handler';
import Project from '../models/projectModel';
import { TprojectSchema } from '../schema/projectSchema';
import { imagekit } from '../utils/imagekit';

//@desc Get all project
//@route GET api/project
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
    const { workedAs, ...otherValues } = req.body as TprojectSchema;

    if (!req.file) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('No file provided or file type is not allowed.');
    }

    const base64String = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString('base64')}`;

    let imageResult;

    try {
      imageResult = await imagekit.upload({
        file: base64String,
        fileName: req.file.originalname,
        folder: '/beejakeys',
      });
    } catch {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error('Network Error. Make sure your mobile data is on.');
    }

    const project = await Project.create({
      ...otherValues,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      workedAs: JSON.parse(workedAs),
      image: imageResult.url,
      imageId: imageResult.fileId,
    });
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
    const { description, name, pitch, status, workedAs } =
      req.body as TprojectSchema;

    const project = await Project.findById(id);

    if (!project) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('project does not exist.');
    }

    project.name = name;
    project.description = description;
    project.status = status;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    project.workedAs = JSON.parse(workedAs);
    project.pitch = pitch;

    if (req.file) {
      // Delete previous image
      try {
        await imagekit.deleteFile(project.imageId);
      } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error('Something went wrong. Please try again later.');
      }
      // Convert to base64String and upload
      const base64String = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString('base64')}`;

      let imageResult;
      try {
        imageResult = await imagekit.upload({
          file: base64String,
          fileName: req.file.originalname,
          folder: '/beejakeys',
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        throw new Error('Failed to upload image. Please try again later.');
      }
      project.image = imageResult.url;
      project.imageId = imageResult.fileId;
    }

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

    try {
      await imagekit.deleteFile(project.imageId);
    } catch {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      throw new Error('Failed to delete Project. Please try again later.');
    }

    await project.deleteOne({ _id: id });
    res.status(200).json({ message: `project deleteted succesfully.` });
  }
);

//@desc Increment views project
//@route DELETE api/increment-views/:id
//@access public

export const incremetProjectViews = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as RequestParams;

    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true, timestamps: false }
    );

    if (!project) {
      res.status(StatusCodes.NO_CONTENT);
      throw new Error('No project found.');
    }

    res.status(StatusCodes.OK).json(project);
  }
);
